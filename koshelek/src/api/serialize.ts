import {TAnyKeyVal} from "@/types";

type TSerialize<T> = {
    converter: ({...args}) => T,
    json: string,
    root?: string,
}

export class Serialize<T, K> {
    model: any;
    json: string;
    root?: string;
    converter: ({...args}) => T;

    constructor({converter, json, root}: TSerialize<T>) {
        this.converter = converter;
        this.json = json;
        this.root = root;
        this.model = converter({});
    }

    private createModel = (): void => {
        let jsonObject;

        try {
            jsonObject = JSON.parse(this.json);

            if (this.root) {
                jsonObject = jsonObject[this.root];
            }

            if (Array.isArray(jsonObject)) {
                this.model = jsonObject.map(jsonItem => {
                    return this.converter({...jsonItem});
                });

                return;
            }

            this.model = this.converter({...jsonObject});
        } catch (e) {
            console.error(e);
        }
    }

    public getModel = (): K => {
        this.createModel();

        return this.model as K;
    }
}