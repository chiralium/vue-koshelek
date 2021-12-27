import {TAnyKeyVal} from "@/types";

export interface IModel<T, A = any> {
    fromJson: ({...args}: A) => T;
}

type TSerialize<T> = {
    schema: T,
    json: string,
}

export class Serialize<T extends IModel<T>, K> {
    schema: T;
    model: any;
    json: string;

    constructor({schema, json}: TSerialize<T>) {
        this.schema = schema;
        this.json = json;
        this.model = schema
            .fromJson({});
    }

    private createModel = (): void => {
        let jsonObject: TAnyKeyVal;

        try {
            jsonObject = JSON.parse(this.json);

            if (Array.isArray(jsonObject)) {
                this.model = jsonObject.map(jsonItem => {
                    return this.schema
                        .fromJson({...jsonItem});
                });

                return;
            }

            this.model = this.schema
                .fromJson({...jsonObject});
        } catch (e) {
            console.error(e);
        }
    }

    public getModel = (): K => {
        this.createModel();

        return this.model as K;
    }
}