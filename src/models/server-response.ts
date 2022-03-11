import { ValidationMessage } from "./validation-message.type";

export type ServerResponse<T> = {
    validationMessage?: string | string[] | ValidationMessage[] | undefined,
    status?: number,
    message?: string,
    result?: T
};
