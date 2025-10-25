import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorService } from '../../../service/purchase/vendor-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-vendor',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './view-vendor.html',
  styleUrl: './view-vendor.css',
})
export class ViewVendor implements OnInit{


  
  vendor!: any;

  constructor(
    private vs: VendorService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadAllVendor();
  }

  loadAllVendor(){
this.vendor = this.vs.getAllVendor();


  }

   getVendorById(id:string): void{
      this.router.navigate(['/viewVendorPro',id]); 
  }
}
