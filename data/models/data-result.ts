export interface IDataResult<DataType> {
    success: boolean;
    code: number;
    message?: string;
    data?: DataType;
}
