import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { NoteRepository } from '../repositories/NoteRepository';
import { Note } from '../../models/Note';
import { NoteUpdate } from '../../models/NoteUpdate';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Converter } from '../../../helpers/Converter';
import { User } from '../../models/User';
import { classToPlain } from 'class-transformer';
import { HttpException, HttpCodes } from '../../http';

@Service()
export class NoteService {

    constructor(
        @OrmRepository() private noteRepository: NoteRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public loadNotes(user: User, author?: string): Promise<Note[]|undefined> {
        this.log.info('Load notes');
        if (author) {
            return this.noteRepository.findNotes(user, author);
        } else {
            return this.noteRepository.findNotes(user);
        }
    }

    public findOneBy(filter: any): Promise<Note | undefined> {
        this.log.info('Find one note');
        return this.noteRepository.findOne(filter);
    }

    public findOneById(id: any): Promise<Note | undefined> {
        this.log.info('Find one note');
        return this.noteRepository.findOneById(id);
    }

    public create(note: Note, user: User): Promise<Note> {
        this.log.info('Create a new note');
        note.authorId = user.id;
        note.authorName = user.username;
        return this.noteRepository.save(note);
    }

    public async update(id: any, noteUpdate: NoteUpdate): Promise<any> {
        this.log.info('Update a note');
        if (!await this.findOneById(id)) {
            throw new HttpException(HttpCodes.NOTE_NOT_FOUND);
        }

        return this.noteRepository.findOneAndUpdate(
            {_id: Converter.toObjectId(id)},
            {$set: classToPlain(noteUpdate)}
        );
    }

    public delete(id: any): Promise<any> {
        this.log.info('Delete a note');
        return this.noteRepository.findOneAndDelete(
            {_id: Converter.toObjectId(id)}
            );
    }
}
