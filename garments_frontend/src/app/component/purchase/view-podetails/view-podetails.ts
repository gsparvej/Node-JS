import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PurchaseModel } from '../../../model/po.model';
import { PoService } from '../../../service/purchase/po-service';

@Component({
  selector: 'app-view-podetails',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './view-podetails.html',
  styleUrls: ['./view-podetails.css'], // fixed
})
export class ViewPODetails implements OnInit {

  id!: number;
  po!: PurchaseModel;

  constructor(
    private poService: PoService,
    private ar: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Get the PO ID from the route
    this.id = this.ar.snapshot.params['id'];
    this.viewFullPO();
  }

  viewFullPO(): void {
    this.poService.viewPODetails(this.id).subscribe({
      next: (data) => {
        // Backend returns a single object, assign directly
        this.po = data;
        this.cdr.markForCheck();
        console.log("Full Order:", this.po);
      },
      error: (error) => {
        console.error('Error fetching PO:', error);
      }
    });
  }

}
