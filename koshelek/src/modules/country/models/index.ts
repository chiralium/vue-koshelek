import {IModel} from "@/api/serialize";

class CountryNameModel {
    common?: string;
    official?: string;

    constructor({common, official}: {common?: string, official?: string}) {
        this.common = common;
        this.official = official;
    }

}

type TCountryModelArg = {
    name?: CountryNameModel,
    capital?: string,
    region?: string,
    languages?: Array<{[key: string]: string}>,
    continents?: Array<string>,
}

export class CountryModel implements IModel<CountryModel, TCountryModelArg> {
    name?: CountryNameModel;
    capital?: string;
    region?: string;
    languages?: Array<{[key: string]: string}>;
    continents?: Array<string>;

    constructor({...args}: TCountryModelArg) {
        this.name = new CountryNameModel({...args.name});
        this.capital = args.capital;
        this.region = args.region;
        this.languages = args.languages;
        this.continents = args.continents;
    }

    fromJson({...args}: TCountryModelArg): CountryModel {
        return new CountryModel({...args});
    }
}