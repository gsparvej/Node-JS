import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Order } from '../../../model/order.model';
import { OrderService } from '../../../service/merchandiser/order-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-half-order',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './view-half-order.html',
  styleUrl: './view-half-order.css',
})
export class ViewHalfOrder implements OnInit {

  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    console.log("++++++++++" +this.orders)
    this.loadAllOrders();
  }



  loadAllOrders(): void {

    orders: this.orderService.getAllOrderList().subscribe({
      next: (result) => {
        this.orders = result;

        console.log('Orders:', this.orders);
        this.cdr.detectChanges();


        // ⚠️ Don't navigate here unless needed
        // this.router.navigate(['/viewHalfOrder']);
      },
      error: (err) => {
        console.error('Error loading data:', err);
        alert('Failed to load orders ');
      }
    });
  }


  getOrderById(id: number): void {
    this.router.navigate(['/fullOrderView', id]);
  }

}
