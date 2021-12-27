import {BaseApi} from "@/api";
import {CountryModel} from "@/modules/country/models";
import {Serialize} from "@/api/serialize";

export class CountryApi extends BaseApi {
    constructor() {
        super();
    }

    public getCountryList = async (): Promise<Array<CountryModel>> => {
        const response: string = await this.getRequest('all');

        return new Serialize<CountryModel, Array<CountryModel>>({
            schema: new CountryModel({}),
            json: response,
        }).getModel();
    }
}