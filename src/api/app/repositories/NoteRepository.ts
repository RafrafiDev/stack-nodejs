import { EntityRepository, MongoRepository } from 'typeorm';
import { Note } from '../../models/Note';
import { User } from '../../models/User';
import { ObjectID } from 'mongodb';

@EntityRepository(Note)
export class NoteRepository extends MongoRepository<Note>  {

    /**
     * @param {User} user
     * @param {User} author
     * @returns {Promise<Note[]>}
     */
    public findNotes(user: User, author?: string): Promise<Note[]|undefined> {
        if (!author) {
            return this.find({
                where: {$or: [{shared: true}, {authorId: new ObjectID(user.id)}]},
            });
        } else {
            return this.find({
                where: {
                    $or: [
                        {$and: [
                            {authorId: new ObjectID(author)},
                            {authorId: new ObjectID(user.id)},
                        ]},
                        {$and: [
                            {shared: true},
                            {authorId: new ObjectID(user.id)},
                            ],
                        }],
                },
            });
        }
    }
}
