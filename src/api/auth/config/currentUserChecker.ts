import { Connection } from 'typeorm';
import { Action } from 'routing-controllers';
import { User } from '../../models/User';
import { Logger } from '../../../core/Logger';
import { TokenInfo } from '../../models/TokenInfo';

export function currentUserChecker(connection: Connection): (action: Action) => Promise<User | undefined> {
    const log = new Logger(__filename);

    return async function innerCurrentUserChecker(action: Action): Promise<User | undefined> {
        // here you can use request/response objects from action
        // you need to provide a user object that will be injected in controller actions
        const tokeninfo: TokenInfo = action.request.tokeninfo;
        const em = connection.createEntityManager();
        const user = await em.findOne<User>(User, {
            where: {
                username: tokeninfo.username,
            },
        });
        if (user) {
            log.info('Current user is ', user.toString());
        } else {
            log.info('Current user is undefined');
        }

        return user;
    };
}

