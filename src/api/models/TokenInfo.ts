import {User} from './User';

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
