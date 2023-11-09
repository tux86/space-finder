import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {ScanCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb";
import {DynamoDBDocumentClient, GetCommand} from "@aws-sdk/lib-dynamodb";

export async function updateSpace(event: APIGatewayProxyEvent, docClient: DynamoDBDocumentClient): Promise<APIGatewayProxyResult> {


    if (event.queryStringParameters && 'id' in event.queryStringParameters && event.body) {
        const spaceId = event.queryStringParameters.id;
        const parsedBody = JSON.parse(event.body)
        const requestBodyKey = Object.keys(parsedBody)[0]
        const requestBodyValue = parsedBody[requestBodyKey]


        const updateResult = await docClient.send(new UpdateCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                id: spaceId
            },
            UpdateExpression: 'SET #zzNew = :new',
            ExpressionAttributeValues: {
                ':new' : requestBodyValue
            },
            ExpressionAttributeNames: {
                '#zzNew': requestBodyKey
            },
            ReturnValues: "UPDATED_NEW"
        }))

        return {
            statusCode: 200,
            body: JSON.stringify(updateResult.Attributes)
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify('Please provide right args !')
    }





}