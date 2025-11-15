import { Item } from "./item.model";

export class StockOutModel {
    id!: number;
    quantity!: number;
    outDate!: Date;

    item!: Item;
}