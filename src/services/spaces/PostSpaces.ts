import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {v4} from "uuid";
import {PutCommand} from "@aws-sdk/lib-dynamodb";

export async function postSpaces(event: APIGatewayProxyEvent, docClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    const randomId = v4()
    const item = JSON.parse(event.body)

    item.id = randomId

    const result = await docClient.send(new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: item
    }))

    console.log(result)

    return {
        statusCode: 201,
        body: JSON.stringify({id: randomId})
    }

}