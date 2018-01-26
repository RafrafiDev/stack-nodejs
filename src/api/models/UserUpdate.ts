import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserUpdate {

    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string;

}
