import {ObjectID} from 'mongodb';

export class Converter {
    public static toObjectId(id: string): ObjectID {
        return new ObjectID(id);
    }
}
