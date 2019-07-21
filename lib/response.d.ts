/**
 * class represents the response of a service action which typically results in a boolean type response
 */
export declare class Response {
    static ACTION_OK: string;
    static ACTION_FAIL: string;
    dateTime: Date | undefined;
    actionName: string | undefined;
    status: string | undefined;
    errorCode: string | undefined;
    errorMessage: string | undefined;
    data: any;
}
