import {HttpCodes} from './HttpCodes';
import {classToPlain} from 'class-transformer';

export class HttpResponse {
    public static readonly STATUS_SUCCESS = 'success';
    public static readonly STATUS_WARNING = 'warning';
    //
    constructor(public data: any = undefined, public code: number = HttpCodes.HTTP_OK, public message: string|undefined = undefined,
                public status: string = HttpResponse.STATUS_SUCCESS) {
        this.code = +code.toString().substring(0, 3);
        this.data = classToPlain(data, {excludePrefixes: ['_']});
    }
}
