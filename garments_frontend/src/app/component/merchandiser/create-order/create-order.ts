import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BomStyle } from '../../../model/bomStyle.model';
import { Buyer } from '../../../model/buyer.model';
import { OrderService } from '../../../service/merchandiser/order-service';
import { BomStyleService } from '../../../service/merchandiser/bom-style-service';
import { BuyerService } from '../../../service/merchandiser/buyer-service';
import { Order } from '../../../model/order.model';

@Component({
  selector: 'app-create-order',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './create-order.html',
  styleUrl: './create-order.css',
})
export class CreateOrder implements OnInit {


  orderDate!: Date;
  deliveryDate!: Date;

  shortSmallSize!: number;
  shortSPrice!: number;
  shortMediumSize!: number;
  shortMPrice!: number;
  shortLargeSize!: number;
  shortLPrice!: number;
  shortXLSize!: number;
  shortXLPrice!: number;

  fullSmallSize!: number;
  fullSPrice!: number;
  fullMediumSize!: number;
  fullMPrice!: number;
  fullLargeSize!: number;
  fullLPrice!: number;
  fullXLSize!: number;
  fullXLPrice!: number;

  subTotal!: number;
  vat!: number;
  paidAmount!: number;
  dueAmount!: number;
  total!: number;
  remarks!: string;
  orderStatus!: string;


  bomstyle: BomStyle[] = [];
  buyer: Buyer[] = [];

  selectedBuyerAddress: string = '';

  formGroup!: FormGroup;

  constructor(
    private orderService: OrderService,
    private bomStyleService: BomStyleService,
    private buyerService: BuyerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) { }


  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      orderDate: ['', Validators.required],
      deliveryDate: ['', Validators.required],

      shortSmallSize: [''],
      shortSPrice: [''],
      shortMediumSize: [''],
      shortMPrice: [''],
      shortLargeSize: [''],
      shortLPrice: [''],
      shortXLSize: [''],
      shortXLPrice: [''],


      fullSmallSize: [''],
      fullSPrice: [''],
      fullMediumSize: [''],
      fullMPrice: [''],
      fullLargeSize: [''],
      fullLPrice: [''],
      fullXLSize: [''],
      fullXLPrice: [''],

      subTotal: [''],
      vat: [''],
      paidAmount: [''],
      dueAmount: [''],
      total: [''],
      remarks: [''],
      orderStatus: [''],

      bomstyle: this.formBuilder.group({
        id: ['', Validators.required]
      }),
      buyer: this.formBuilder.group({
        id: ['', Validators.required],
        address: ['', Validators.required]
      })
    });

    //  Subscribe for Style Code Changes
    this.formGroup.get('bomstyle')?.get('id')?.valueChanges.subscribe(id => {
      const selectedDescription = this.bomstyle.find(b => b.id === id);
      if (selectedDescription) {
        console.log('Selected BOM:', selectedDescription);
      }
    });

    this.formGroup.get('buyer')?.get('id')?.valueChanges.subscribe(id => {
      const selectedBuyer = this.buyer.find(b => b.id === +id); // convert id to number
      if (selectedBuyer) {
        this.selectedBuyerAddress = selectedBuyer.address;
        console.log('Selected buyer:', selectedBuyer);
      } else {
        this.selectedBuyerAddress = '';
      }
    });







    this.loadStyle();
    this.loadBuyer();
  }



  loadStyle(): void {
    this.bomStyleService.getBomstyleList().subscribe({
      next: (styleList) => {
        this.bomstyle = styleList;
        this.cdr.detectChanges();

      },
      error: (err) => {
        console.log(err);
      }
    });
  }




  subTotalCalculation(): void {

    this.shortSmallSize = this.formGroup.value.shortSmallSize;
    this.shortSPrice = this.formGroup.value.shortSPrice;
    this.shortMediumSize = this.formGroup.value.shortMediumSize;
    this.shortMPrice = this.formGroup.value.shortMPrice;
    this.shortLargeSize = this.formGroup.value.shortLargeSize;
    this.shortLPrice = this.formGroup.value.shortLPrice;
    this.shortXLSize = this.formGroup.value.shortXLSize;
    this.shortXLPrice = this.formGroup.value.shortXLPrice;

    this.fullSmallSize = this.formGroup.value.fullSmallSize;
    this.fullSPrice = this.formGroup.value.fullSPrice;
    this.fullMediumSize = this.formGroup.value.fullMediumSize;
    this.fullMPrice = this.formGroup.value.fullMPrice;
    this.fullLargeSize = this.formGroup.value.fullLargeSize;
    this.fullLPrice = this.formGroup.value.fullLPrice;
    this.fullXLSize = this.formGroup.value.fullXLSize;
    this.fullXLPrice = this.formGroup.value.fullXLPrice;



    this.subTotal = (this.shortSmallSize * this.shortSPrice) +
      (this.shortMediumSize * this.shortMPrice) +
      (this.shortLargeSize * this.shortLPrice) +
      (this.shortXLSize * this.shortXLPrice) +
      (this.fullSmallSize * this.fullSPrice) +
      (this.fullMediumSize * this.fullMPrice) +
      (this.fullLargeSize * this.fullLPrice) +
      (this.fullXLSize * this.fullXLPrice);


  }
  dueAmountCalculation() {

    this.shortSmallSize = this.formGroup.value.shortSmallSize;
    this.shortSPrice = this.formGroup.value.shortSPrice;
    this.shortMediumSize = this.formGroup.value.shortMediumSize;
    this.shortMPrice = this.formGroup.value.shortMPrice;
    this.shortLargeSize = this.formGroup.value.shortLargeSize;
    this.shortLPrice = this.formGroup.value.shortLPrice;
    this.shortXLSize = this.formGroup.value.shortXLSize;
    this.shortXLPrice = this.formGroup.value.shortXLPrice;

    this.fullSmallSize = this.formGroup.value.fullSmallSize;
    this.fullSPrice = this.formGroup.value.fullSPrice;
    this.fullMediumSize = this.formGroup.value.fullMediumSize;
    this.fullMPrice = this.formGroup.value.fullMPrice;
    this.fullLargeSize = this.formGroup.value.fullLargeSize;
    this.fullLPrice = this.formGroup.value.fullLPrice;
    this.fullXLSize = this.formGroup.value.fullXLSize;
    this.fullXLPrice = this.formGroup.value.fullXLPrice;



    this.subTotal = (this.shortSmallSize * this.shortSPrice) +
      (this.shortMediumSize * this.shortMPrice) +
      (this.shortLargeSize * this.shortLPrice) +
      (this.shortXLSize * this.shortXLPrice) +
      (this.fullSmallSize * this.fullSPrice) +
      (this.fullMediumSize * this.fullMPrice) +
      (this.fullLargeSize * this.fullLPrice) +
      (this.fullXLSize * this.fullXLPrice);

    this.vat = this.formGroup.value.vat;
    this.paidAmount = this.formGroup.value.paidAmount;

    this.dueAmount = this.subTotal + (this.vat / 100) - this.paidAmount;
  }

  totalCalculations() {
    this.shortSmallSize = this.formGroup.value.shortSmallSize;
    this.shortSPrice = this.formGroup.value.shortSPrice;
    this.shortMediumSize = this.formGroup.value.shortMediumSize;
    this.shortMPrice = this.formGroup.value.shortMPrice;
    this.shortLargeSize = this.formGroup.value.shortLargeSize;
    this.shortLPrice = this.formGroup.value.shortLPrice;
    this.shortXLSize = this.formGroup.value.shortXLSize;
    this.shortXLPrice = this.formGroup.value.shortXLPrice;

    this.fullSmallSize = this.formGroup.value.fullSmallSize;
    this.fullSPrice = this.formGroup.value.fullSPrice;
    this.fullMediumSize = this.formGroup.value.fullMediumSize;
    this.fullMPrice = this.formGroup.value.fullMPrice;
    this.fullLargeSize = this.formGroup.value.fullLargeSize;
    this.fullLPrice = this.formGroup.value.fullLPrice;
    this.fullXLSize = this.formGroup.value.fullXLSize;
    this.fullXLPrice = this.formGroup.value.fullXLPrice;



    this.subTotal = (this.shortSmallSize * this.shortSPrice) +
      (this.shortMediumSize * this.shortMPrice) +
      (this.shortLargeSize * this.shortLPrice) +
      (this.shortXLSize * this.shortXLPrice) +
      (this.fullSmallSize * this.fullSPrice) +
      (this.fullMediumSize * this.fullMPrice) +
      (this.fullLargeSize * this.fullLPrice) +
      (this.fullXLSize * this.fullXLPrice);
    this.vat = this.formGroup.value.vat;
    this.total = this.subTotal + this.vat;
  }


  onFocusLost() {
    this.dueAmountCalculation();
    this.totalCalculations();
  }



  loadBuyer(): void {
    this.buyerService.getAllBuyer().subscribe({
      next: (bu) => {
        this.buyer = bu;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }




  addOrder(): void {
    const order: Order = this.formGroup.value; // ✅ use formGroup, not formBuilder

    this.orderService.saveOrder(order).subscribe({
      next: (or) => {
        console.log(or, 'ordered Successfully !');
        this.loadBuyer();
        this.loadStyle();
        this.formGroup.reset();
        this.router.navigate(['/viewHalfOrder']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }




  // ✅ Helper methods to fix dynamic control names
  getShortPriceControl(size: string): string {
    switch (size) {
      case 'Small': return 'shortSPrice';
      case 'Medium': return 'shortMPrice';
      case 'Large': return 'shortLPrice';
      case 'XL': return 'shortXLPrice';
      default: return '';
    }
  }

  getFullPriceControl(size: string): string {
    switch (size) {
      case 'Small': return 'fullSPrice';
      case 'Medium': return 'fullMPrice';
      case 'Large': return 'fullLPrice';
      case 'XL': return 'fullXLPrice';
      default: return '';
    }
  }


}
