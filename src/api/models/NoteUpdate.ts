import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { Expose } from 'class-transformer';

export class NoteUpdate {

    @IsNotEmpty()
    @IsString()
    @Expose({ name: 'title' })
    public title: string;

    @IsNotEmpty()
    @IsString()
    @Expose({ name: 'body' })
    public body: string;

    @IsBoolean()
    @Expose({ name: 'shared' })
    public shared: boolean;

}
