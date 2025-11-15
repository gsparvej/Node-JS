import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StockOutModel } from '../../../model/stockOut.model';
import { Item } from '../../../model/item.model';
import { InventoryService } from '../../../service/purchase/inventory-service';
import { ItemService } from '../../../service/purchase/item-service';
import { StockService } from '../../../service/purchase/stock-service';

@Component({
  selector: 'app-stock-out',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './stock-out.html',
  styleUrl: './stock-out.css',
})
export class StockOut implements OnInit {

  stock: StockOutModel = {
    id: 0,
    outDate: new Date(),
    quantity: 0,
    item: { id: 0, category_name: '', unit: '' }
  };

  stockOut: StockOutModel[] = [];
  items: Item[] = [];
  message = '';

  constructor(
    private inventoryService: InventoryService,
    private itemService: ItemService,
    private cdr: ChangeDetectorRef,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.loadAllItems();
    this.loadAllStockOut();
  }



  loadAllItems(): void {
    this.itemService.getAllItem().subscribe({
      next: (result) => {
        this.items = result || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading Items:', err);
        alert('Failed to load Items data');
      }
    });
  }

  loadAllStockOut(): void {
    this.stockService.getAllStockOut().subscribe({
      next: (result) => {
        this.stockOut = result || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading Stock In:', err);
        alert('Failed to load Stock In data');
      }
    });
  }

  removeStock(): void {
    if (this.stock.item.id > 0 && this.stock.quantity > 0) {
      const payload = {
        quantity: this.stock.quantity,
        items: { id: this.stock.item.id }
      };
      this.inventoryService.removeStock(payload).subscribe({
        next: (res: any) => {
          this.message = typeof res === 'string' ? res : res.message || 'Stock added successfully!';
          this.stock.quantity = 0;
          this.stock.item.id = 0;
          this.loadAllStockOut();
        },
        error: (err) => {
          this.message = err.error?.message || 'Failed to add stock.';
        }
      });
    } else {
      this.message = 'Please select an item and enter a quantity.';
    }
  }

}
