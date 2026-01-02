export interface AppResponseObject<T> {
    statusCode: number;
    message: string;
    data: object;
}