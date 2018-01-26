import {JsonController, HttpCode, Get, Post, Put, Param, Delete, Body, QueryParam, Authorized, CurrentUser} from 'routing-controllers';
import { NoteService } from '../services/NoteService';
import { HttpCodes, HttpResponse } from '../../http';
import { Note } from '../../models/Note';
import { NoteUpdate } from '../../models/NoteUpdate';
import { User } from '../../models/User';
import { UserService } from '../../user/services/UserService';
import { HttpException } from '../../http/HttpException';

@Authorized()
@JsonController('/notes')
export class NoteController {

    constructor(
        private noteService: NoteService,
        private userService: UserService
    ) { }

    @Get()
    public async find( @CurrentUser() user: User, @QueryParam('author') authorId?: string): Promise<HttpResponse> {
        let notes: any;
        if (authorId) {
            const author = await this.userService.findOneById(authorId);
            if (!author) {
                throw new HttpException(HttpCodes.INVALID_AUTHOR_ID);
            }
            notes = await this.noteService.loadNotes(user, authorId);
        } else {
            notes = await this.noteService.loadNotes(user);
        }
        return new HttpResponse({notes});
    }

    @Get('/:id')
    public async one( @Param('id') id: string): Promise<HttpResponse> {
        const note = await this.noteService.findOneById(id);
        return new HttpResponse({note});
    }

    @Post()
    public async create( @Body() note: Note, @CurrentUser() user: User): Promise<HttpResponse> {
        const newNote = await this.noteService.create(note, user);
        return new HttpResponse({note: newNote});
    }


    @HttpCode(HttpCodes.HTTP_NO_CONTENT)
    @Put('/:id')
    public async update( @Param('id') id: string, @Body() noteUpdate: NoteUpdate): Promise<HttpResponse> {
        await this.noteService.update(id, noteUpdate);
        return new HttpResponse(undefined, HttpCodes.HTTP_NO_CONTENT);
    }


    @HttpCode(HttpCodes.HTTP_NO_CONTENT)
    @Delete('/:id')
    public async delete( @Param('id') id: string): Promise<HttpResponse> {
        await this.noteService.delete(id);
        return new HttpResponse(undefined, HttpCodes.HTTP_NO_CONTENT);
    }
}
