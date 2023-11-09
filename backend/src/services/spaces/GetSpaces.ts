import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {ScanCommand} from "@aws-sdk/lib-dynamodb";
import {DynamoDBDocumentClient, GetCommand} from "@aws-sdk/lib-dynamodb";

export async function getSpaces(event: APIGatewayProxyEvent, docClient: DynamoDBDocumentClient): Promise<APIGatewayProxyResult> {


    if (event.queryStringParameters) {
        if ('id' in event.queryStringParameters) {

            const spaceId = event.queryStringParameters['id']
            const getItemResponse = await docClient.send(new GetCommand({
                TableName: process.env.TABLE_NAME,
                Key: { id: spaceId }
            }))

            if (!getItemResponse.Item) {
                return {
                    statusCode: 404,
                    body: `Space with id ${spaceId} not found!`
                }
            }

            return {
                statusCode: 200,
                body: JSON.stringify(getItemResponse.Item)
            }

        } else {

            return {
                statusCode: 400,
                body: JSON.stringify('Id required!')
            }
        }
    }


    const result = await docClient.send(new ScanCommand({
        TableName: process.env.TABLE_NAME
    }))

    console.log(result.Items)

    return {
        statusCode: 201,
        body: JSON.stringify(result.Items)
    }

}