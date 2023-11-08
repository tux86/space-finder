import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {postSpaces} from "./PostSpaces";
import {getSpaces} from "./GetSpaces";
import {DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";
import {updateSpace} from "./UpdateSpace";
import {deleteSpace} from "./DeleteSpace";
import {JSONError, MissingFieldError} from "../../shared/Validator";

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
            case 'PUT':
                return await updateSpace(event, docClient)
            case 'DELETE':
                return await deleteSpace(event, docClient)
            default:
                break;
        }
    } catch (error) {
        console.error(error)
        if (error instanceof  MissingFieldError) {
            return {
                statusCode: 400,
                body: error.message
            }
        }
        if (error instanceof  JSONError) {
            return {
                statusCode: 400,
                body: error.message
            }
        }
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
