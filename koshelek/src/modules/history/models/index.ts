type THistoryItem = 'ADDING_TO_FAVORITES' | 'REMOVING_FROM_FAVORITES';

type THistoryItemA<T> = {
    datetime: Date;
    type: THistoryItem;
    item: T;
}

export class HistoryItem<T> {
    datetime: Date;
    type: THistoryItem;
    item: T;

    constructor({datetime, type, item}: THistoryItemA<T>) {
        this.datetime = datetime;
        this.type = type;
        this.item = item;
    }
}