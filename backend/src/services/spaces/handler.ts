import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {postSpaces} from "./PostSpaces";
import {getSpaces} from "./GetSpaces";
import {DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";
import {updateSpace} from "./UpdateSpace";
import {deleteSpace} from "./DeleteSpace";
import {JSONError, MissingFieldError} from "../shared/Validator";
import {addCorsHeader} from "../shared/Utils";

const ddbClient = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(ddbClient)

async function handler(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> {

    let response : APIGatewayProxyResult

    try {
        switch (event.httpMethod) {
            case 'GET':
                response = await getSpaces(event, docClient)
                break
            case 'POST':
                response = await postSpaces(event, docClient)
                break
            case 'PUT':
                response = await updateSpace(event, docClient)
                break
            case 'DELETE':
                response = await deleteSpace(event, docClient)
                break
            default:
                break;
        }

        addCorsHeader(response)
        return response
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
}

export {handler}
