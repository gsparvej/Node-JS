export interface PurchaseModel {
  id: number;
  po_number: string;
  quantity: number;
  rate: number;
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
