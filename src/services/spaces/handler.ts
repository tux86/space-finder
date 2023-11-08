import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {postSpaces} from "./PostSpaces";
import {getSpaces} from "./GetSpaces";
import {DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";


const ddbClient = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(ddbClient)

async function handler(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> {

    let message: string

    try {
        switch (event.httpMethod) {
            case 'GET':
                return await getSpaces(event, docClient)
            case 'POST':
                return await postSpaces(event, docClient)
            default:
                break;
        }
    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }
    }


    return {
        statusCode: 200,
        body: JSON.stringify(message)
    }
}

export {handler}
