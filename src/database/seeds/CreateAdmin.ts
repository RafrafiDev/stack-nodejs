import { SeedsInterface, FactoryInterface } from '../../lib/seeds';
import { User } from '../../api/models/User';

export class CreateAdmin implements SeedsInterface {

    public async seed(factory: FactoryInterface): Promise<User> {
        const em = factory.getConnection().getMongoRepository(User);

        const user = new User();
        user.firstName = 'admin';
        user.lastName = 'admin';
        user.email = 'service@fondative.com';
        user.password = '12345678';

        return await em.save(user);
    }

}
