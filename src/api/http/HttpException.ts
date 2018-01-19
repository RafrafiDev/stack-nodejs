import { HttpError } from 'routing-controllers';
import {HttpCodes} from './HttpCodes';

export class HttpException extends HttpError {
    public status;
    public data;
    constructor(code: number, data: any[] = [], status: string = 'error') {

        super(+code.toString().substring(0, 3), HttpCodes.statusText[code]);

        this.status = status;
        this.data = data;
    }
}
