import { Entity, Column } from 'typeorm';
import { ObjectID } from 'mongodb';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { Expose } from 'class-transformer';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Note extends BaseEntity {

    @Expose()
    @Column({ name: 'authorName' })
    public authorName: string;

    @Column({ name: 'authorId' })
    private _authorId: ObjectID;

    @IsNotEmpty()
    @IsString()
    @Column({ name: 'title' })
    private _title: string;

    @IsNotEmpty()
    @IsString()
    @Column({ name: 'body' })
    private _body: string;

    @IsBoolean()
    @Column({ name: 'shared' })
    private _shared: boolean;

    @Expose()
    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    @Expose()
    get body(): string {
        return this._body;
    }

    set body(value: string) {
        this._body = value;
    }

    @Expose()
    get shared(): boolean {
        return this._shared;
    }

    set shared(value: boolean) {
        this._shared = value;
    }

    @Expose()
    get authorId(): string {
        return (this._authorId) ? this._authorId.toString() : '';
    }

    set authorId(id: string) {
        this._authorId = new ObjectID(id);
    }
}
