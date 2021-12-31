type THistoryItem = 'ADDING' | 'REMOVING';

type THistoryItemA<T> = {
    datetime: string;
    type: THistoryItem;
    item: T;
}

export class HistoryItem<T> {
    datetime: string;
    type: THistoryItem;
    item: T;

    constructor({datetime, type, item}: THistoryItemA<T>) {
        this.datetime = datetime;
        this.type = type;
        this.item = item;
    }
}