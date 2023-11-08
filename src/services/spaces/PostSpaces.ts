import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {PutCommand} from "@aws-sdk/lib-dynamodb";
import {validateAsSpaceEntry} from "../../shared/Validator";
import {createRandomId, parseJSON} from "../../shared/Utils";

export async function postSpaces(event: APIGatewayProxyEvent, docClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    const item = parseJSON(event.body)
    const randomId =  createRandomId()
    item.id = randomId

    validateAsSpaceEntry(item)

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