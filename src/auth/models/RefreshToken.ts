import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import * as crypto from 'crypto';


@Entity()
export class RefreshToken {

    @ObjectIdColumn()
    protected _id: ObjectID;

    @IsNotEmpty()
    @Column({ name: 'token' })
    protected _token: string;

    @IsNotEmpty()
    @Column({ name: 'username' })
    protected _username: string;

    @IsNotEmpty()
    @Column({ name: 'valid' })
    protected _valid: Date;

    get id(): ObjectID {
        return this._id;
    }

    set id(value: ObjectID) {
        this._id = value;
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        if ('' === value) {
            this._token = crypto.pseudoRandomBytes(64).toString('hex');
        } else {
            this._token = value;
        }
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get valid(): Date {
        return this._valid;
    }

    set valid(value: Date) {
        this._valid = value;
    }

    public isValid(): boolean {
        return (this._valid.valueOf() >= (new Date()).valueOf());
    }

    public toString(): string {
        return `(${this._token})`;
    }
}
