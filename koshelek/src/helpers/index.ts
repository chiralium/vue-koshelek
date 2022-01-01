import {TObjectValues} from "@/types";

export class Searchable {
    excludeFieldList: Array<string>;
    occurrencesKeysList: Array<string>;

    constructor(excludeFields: Array<string>) {
        this.excludeFieldList = [...excludeFields, 'excludeFieldList', 'occurrencesKeysList'];
        this.occurrencesKeysList = [];
    }

    public getValues<T>(object: T): Array<TObjectValues> {
        return Object.entries(object)
            .filter(([key]) => {
                return !this.excludeFieldList.includes(key)
            }).reduce((valuesList, [key, value]) => {
                if (typeof value === 'object') {
                    return [
                        ...valuesList,
                        ...this.getValues<typeof value>(value)
                    ]
                }

                return [...valuesList, {[key]: value}];
            }, [] as Array<TObjectValues>);
    }

    public findOccurrences<T>(object: T, query: string): void {
        this.occurrencesKeysList.splice(0, this.occurrencesKeysList.length);
        if (query === '') {
            return;
        }

        const objectValues: Array<TObjectValues> = this.getValues<T>(object);
        objectValues.forEach(objectItem => {
            const [[key, value]] = Object.entries(objectItem);
            const normalizedValue = ('' + value).toLocaleLowerCase();
            const normalizedQuery = query.toLocaleLowerCase();

            if (normalizedValue.indexOf(normalizedQuery) !== -1) {
                this.occurrencesKeysList.push(key);
            }
        });
    }
}