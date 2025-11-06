import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Order } from '../../../model/order.model';
import { OrderService } from '../../../service/merchandiser/order-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-full-order',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './view-full-order.html',
  styleUrl: './view-full-order.css',
})
export class ViewFullOrder implements OnInit {

  id!: number;
  order!: Order;


  constructor(
    private orderService: OrderService,
    private ar: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.id = this.ar.snapshot.params['id'];
     console.log("++++++++++++++++++++++++++"+ this.id);
    this.viewFullOrder();
  }


  viewFullOrder(): void {
    this.orderService.viewOrderDetails(this.id).subscribe({
      next: (data) => {
        // Backend returns a single object, assign directly
        this.order = data;
        this.cdr.markForCheck();
        console.log("Full Order:", this.order);
      },
      error: (error) => {
        console.error('Error fetching Order:', error);
      }
    });
  }


  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-warning';
      case 'confirmed':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  }




}
