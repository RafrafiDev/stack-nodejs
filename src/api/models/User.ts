import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import {IsEmail, IsNotEmpty} from 'class-validator';
import {Expose} from 'class-transformer';
import {isArray, isNullOrUndefined} from 'util';

@Entity()
export class User {

    private static readonly ROLE_AUTHOR: string = 'ROLE_AUTHOR';
    private static readonly ROLE_SUPER_ADMIN: string = 'ROLE_SUPER_ADMIN';

    @ObjectIdColumn()
    private _id: ObjectID | string;

    @IsNotEmpty()
    @Column({ name: 'username' })
    private _username: string;

    @IsNotEmpty()
    @Column({ name: 'first_name' })
    private _firstName: string;

    @IsNotEmpty()
    @Column({ name: 'last_name' })
    private _lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @Column({ name: 'email' })
    private _email: string;

    @Column({ name: 'enabled' })
    private _enabled: boolean;

    @IsNotEmpty()
    @Column({ name: 'password' })
    private _password: string;

    @Column({ name: 'roles' })
    private _roles: string[] = [];

    @Column({ name: 'created_date' })
    private _createdDate: Date;

    @Expose()
    get id(): ObjectID|string {
        if (!isNullOrUndefined(this._id)) {
            return this._id.toString();
        }
        return '';
    }

    set id(id: ObjectID|string) {
        this._id = id;
    }

    @Expose()
    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    @Expose()
    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    @Expose()
    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    @Expose()
    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    @Expose()
    get roles(): string[] {
        // merge with groups roles
        return this._roles;
    }

    set roles(roles: string[]) {
        if (isArray(roles) && roles.length > 0) {
            for (const role of roles) {
                this.addRole(role);
            }
        }
    }

    @Expose()
    get createdDate(): Date {
        return this._createdDate;
    }

    set createdDate(value: Date) {
        this._createdDate = value;
    }

    @Expose()
    get enabled(): boolean {
        return this._enabled;
    }

    set enabled(value: boolean) {
        this._enabled = value;
    }

    constructor() {
        this.createdDate = new Date();
        this.addRole(User.ROLE_AUTHOR);
        this.enabled = true;
    }

    public toString(): string {
        return `${this.firstName} ${this.lastName} (${this.email})`;
    }

    public addRole(role: string): void {
        if (this._roles.indexOf(role) === -1) {
            this._roles.push(role);
        }
    }

    public hasRole(role: string): boolean {
        return this._roles.indexOf(role) !== -1;
    }

    public isSuperAdmin(): boolean {
        return this.hasRole(User.ROLE_SUPER_ADMIN);
    }

    public removeRole(role: string): void {
        const key = this._roles.indexOf(role);
        if (key !== -1) {
            this._roles.slice(key, 1);
        }
    }
}
