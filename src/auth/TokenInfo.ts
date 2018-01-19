import {User} from '../api/models/User';

export class TokenInfo {
    public username: string;
    public roles: string[];

    constructor(user: User) {
        this.username = user.username;
        this.roles = user.roles;
    }

    public toPlainObj(): any {
        return Object.assign({}, this);
    }
}
