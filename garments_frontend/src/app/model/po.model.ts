export interface PurchaseModel {
  id: number;
  po_number: string;
  poDate: Date;
  tax: number;
  deliveryDate: Date;
  termsAndCondition: string;
  quantity: number;
  rate: number;
  subTotal: number;
  total: number;
  item: {
    id: number;
    category_name?: string;
    unit?: string;
  };
  vendor: {
    id: number;
    comapny_name?: string;
    contact_person?: string;
    phone?: string;
    address?: string;
  };
}
