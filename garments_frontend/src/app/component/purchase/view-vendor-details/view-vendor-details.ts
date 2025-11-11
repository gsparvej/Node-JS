import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Vendor } from '../../../model/vendor.model';
import { VendorService } from '../../../service/purchase/vendor-service';

@Component({
  selector: 'app-view-vendor-details',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './view-vendor-details.html',
  styleUrl: './view-vendor-details.css',
})
export class ViewVendorDetails implements OnInit {

  id!: number;
  vendor!: Vendor;

  constructor(
    private vendorService: VendorService,
    private ar: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }



  ngOnInit(): void {
    this.id = this.ar.snapshot.params['id'];
    this.viewVendorDetails();
  }

  viewVendorDetails(): void {
    this.vendorService.getVendorById(this.id).subscribe({

      next: (data) => {
        this.vendor = data;
        this.cdr.markForCheck();
        console.log("Vendor Details : ", this.vendor);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
