import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import {IsEmail, IsNotEmpty} from 'class-validator';


@Entity()
export class User {

    @ObjectIdColumn()
    public id: ObjectID;

    @IsNotEmpty()
    @Column({ name: 'first_name' })
    public firstName: string;

    @IsNotEmpty()
    @Column({ name: 'last_name' })
    public lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @Column()
    public email: string;

    @IsNotEmpty()
    @Column()
    public password: string;

    public toString(): string {
        return `${this.firstName} ${this.lastName} (${this.email})`;
    }

}
