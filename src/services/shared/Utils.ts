import {JSONError} from "./Validator";
import {randomUUID} from "crypto";
import {APIGatewayProxyEvent} from "aws-lambda";

export function parseJSON(arg: string) {
    try {
        return JSON.parse(arg)
    } catch (error) {
        throw new JSONError()
    }
}

export function createRandomId() {
    return randomUUID()
}


export function hasAdminGroup(event: APIGatewayProxyEvent) {
    const groups = event.requestContext.authorizer?.claims['cognito:groups'];
    if (groups) {
        return (groups as string).includes('admins')
    }
    return false
}