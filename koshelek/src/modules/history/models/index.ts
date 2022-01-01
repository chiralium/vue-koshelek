type THistoryItem = 'ADDING_TO_FAVORITES' | 'REMOVING_FROM_FAVORITES';

type THistoryItemA<T> = {
    datetime: Date;
    type: THistoryItem;
    item: T;
}

export class History<T> {
    datetime: Date;
    type: THistoryItem;
    item: T;

    constructor({datetime, type, item}: THistoryItemA<T>) {
        this.datetime = datetime;
        this.type = type;
        this.item = item;
    }
}