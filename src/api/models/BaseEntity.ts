import { ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import {ObjectID} from 'mongodb';

export abstract class BaseEntity {

    @CreateDateColumn({ name: 'createdAt' })
    public createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    public updatedAt: Date;

    @ObjectIdColumn({nullable: false})
    protected _id: ObjectID;

    @Expose()
    get id(): string {
        return (this._id) ? this._id.toString() : '';
    }

    set id(id: string) {
        this._id = new ObjectID(id);
    }
}
