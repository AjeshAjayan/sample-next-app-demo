import { ServerResponse } from "../../models/server-response";
import { ValidationMessage } from "../../models/validation-message.type";

export default function generateResponse<T>(
    validationMessage: string | string[] | ValidationMessage[] | undefined,
    status: number,
    message: string,
    result: T
): ServerResponse<T> {
    return {
        validationMessage,
        status,
        message,
        result
    }
}
