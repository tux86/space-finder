import {JSONError} from "./Validator";
import {randomUUID} from "crypto";

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
