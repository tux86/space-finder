import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {ListBucketsCommand, S3Client} from "@aws-sdk/client-s3";

const s3Client = new S3Client({})
async function handler(event: APIGatewayProxyEvent, context: Context) {

    const command = new ListBucketsCommand({})
    const listBucketsResult = (await s3Client.send(command)).Buckets

    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(`Hello from lambda, here are your buckets: ${JSON.stringify(listBucketsResult)}` )
    }

    return response
}

export {handler}
