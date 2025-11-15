import { Item } from "./item.model";

export interface StockInModel {
    id: number;
    receivedDate: Date;
    quantity: number;
    item: Item;
}