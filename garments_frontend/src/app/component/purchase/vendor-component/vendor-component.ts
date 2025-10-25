import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorService } from '../../../service/purchase/vendor-service';
import { Router } from '@angular/router';
import { Vendor } from '../../../model/vendor.model';

@Component({
  selector: 'app-vendor-component',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './vendor-component.html',
  styleUrl: './vendor-component.css',
})
export class VendorComponent implements OnInit{


  formVendor!: FormGroup;

   constructor(
    private vs: VendorService,
    private router: Router,
    private formBuilder: FormBuilder, 
  ){}
  ngOnInit(): void {
     this.formVendor = this.formBuilder.group({

       comapny_name :[''],
       contact_person :[''],
       email :[''],
       phone :[''],
       address :[''],
       vat :[''],


    });
  }


  addVendor(): void {
        const vendor : Vendor = {...this.formVendor.value};
        this.vs.saveVendor(vendor).subscribe({
      
          next: (res) => {
      
            console.log(res,'Added Succesfully');
            this.formVendor.reset();
            this.router.navigate(['/viewAllVendor']);
      
          },
          error: (err) => {
            console.log(err,'Data Not Saved ! Please Check Console')
      
          }
      
      
      
        });
      
      
      
        }

}
