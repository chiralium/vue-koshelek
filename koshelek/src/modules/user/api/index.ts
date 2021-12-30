import {BaseApi} from "@/api";
import {User} from "@/modules/user/models";
import {Serialize} from "@/api/serialize";


const limit = 2;
export default class UserApi extends BaseApi {
    constructor() {
        super('https://randomuser.me/');
    }

    public getUserList = async (): Promise<Array<User>> => {
        const response = await this.getRequest(
            'api',
            {
                'results': limit + '',
            },
        );

        return new Serialize<User, Array<User>>({
            converter: User.fromJson,
            json: response,
            root: 'results',
        }).getModel();
    }
}