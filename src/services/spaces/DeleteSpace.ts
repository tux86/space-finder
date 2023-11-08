import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {DeleteCommand, ScanCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb";
import {DynamoDBDocumentClient, GetCommand} from "@aws-sdk/lib-dynamodb";

export async function deleteSpace(event: APIGatewayProxyEvent, docClient: DynamoDBDocumentClient): Promise<APIGatewayProxyResult> {


    if (event.queryStringParameters && 'id' in event.queryStringParameters) {
        const spaceId = event.queryStringParameters.id;
        await docClient.send(new DeleteCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                id: spaceId
            },
        }))

        return {
            statusCode: 204,
            body: ''
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify('Please provide right args !')
    }





}