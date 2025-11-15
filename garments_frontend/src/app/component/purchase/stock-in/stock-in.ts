import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Item } from '../../../model/item.model';
import { StockInModel } from '../../../model/stockIn.model';
import { InventoryService } from '../../../service/purchase/inventory-service';
import { ItemService } from '../../../service/purchase/item-service';
import { StockService } from '../../../service/purchase/stock-service';

@Component({
  selector: 'app-stock-in',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './stock-in.html',
  styleUrls: ['./stock-in.css'],
})
export class StockIn implements OnInit {

  stock: StockInModel = {
    id: 0,
    receivedDate: new Date(),
    quantity: 0,
    item: { id: 0, category_name: '', unit: '' }
  };

  stockIn: StockInModel[] = [];
  items: Item[] = [];
  message = '';

  constructor(
    private inventoryService: InventoryService,
    private itemService: ItemService,
    private cdr: ChangeDetectorRef,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    this.loadAllItems();
    this.loadAllStockIn();
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

  loadAllStockIn(): void {
    this.stockService.getAllStockIn().subscribe({
      next: (result) => {
        this.stockIn = result || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading Stock In:', err);
        alert('Failed to load Stock In data');
      }
    });
  }

  addStock(): void {
    if (this.stock.item.id > 0 && this.stock.quantity > 0) {
      const payload = {
        quantity: this.stock.quantity,
        items: { id: this.stock.item.id }
      };
      this.inventoryService.addStock(payload).subscribe({
        next: (res: any) => {
          this.message = typeof res === 'string' ? res : res.message || 'Stock added successfully!';
          this.stock.quantity = 0;
          this.stock.item.id = 0;
          this.loadAllStockIn();
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
