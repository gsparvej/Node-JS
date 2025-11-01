import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BuyerService } from '../../../service/merchandiser/buyer-service';
import { Buyer } from '../../../model/buyer.model';

@Component({
  selector: 'app-add-buyer',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './add-buyer.html',
  styleUrl: './add-buyer.css',
})
export class AddBuyer implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private buyerService: BuyerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({

      name: [''],
      country: [''],
      contactPerson: [''],
      phone: [''],
      email: [''],
      address: [''],
      website: [''],

    });
  }


  addBuyer(): void {
    const buyer: Buyer = { ...this.formGroup.value };
    this.buyerService.saveBuyer(buyer).subscribe({
      next: (res) => {
        console.log(res, 'Buyer Added Succesfully! ');
        this.formGroup.reset();
        this.router.navigate(['/viewAllBuyer']);
      },
      error: (err) => {
        console.log(err, ' Data not saved! Please check console');
      }
    });
  }



}
