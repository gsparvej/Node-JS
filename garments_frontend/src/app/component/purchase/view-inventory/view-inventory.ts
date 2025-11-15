import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryService } from '../../../service/purchase/inventory-service';
import { Router } from '@angular/router';
import { InventoryModel } from '../../../model/inventory.model';

@Component({
  selector: 'app-view-inventory',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './view-inventory.html',
  styleUrl: './view-inventory.css',
})
export class ViewInventory implements OnInit {


  inven: InventoryModel[] = [];

  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.loadInventories();
  }

  loadInventories(): void {
    this.inventoryService.getAllInventory().subscribe({
      next: (data) => {
        this.inven = data;
        this.cdr.markForCheck();
        console.log("Inventory:", data);
      },
      error: (err) => {
        console.error("Error Loading Inventories", err);
      }
    });
  }

}
