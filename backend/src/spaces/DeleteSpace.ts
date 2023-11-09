import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {DeleteCommand, ScanCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb";
import {DynamoDBDocumentClient, GetCommand} from "@aws-sdk/lib-dynamodb";
import {hasAdminGroup} from "../shared/Utils";

export async function deleteSpace(event: APIGatewayProxyEvent, docClient: DynamoDBDocumentClient): Promise<APIGatewayProxyResult> {

    if (!hasAdminGroup(event)) {
        return {
            statusCode: 401,
            body: JSON.stringify('Not Authorized !')
        }
    }

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