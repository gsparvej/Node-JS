import { BomStyle } from "./bomStyle.model";
import { Uom } from "./uom.model";

export interface Bom {

    id: number;
    serial: number;
    material: string;
    unit: string;
    quantity: number;
    unit_price: number;
    total_cost: number;
    uom: Uom;
    bom: BomStyle;

}