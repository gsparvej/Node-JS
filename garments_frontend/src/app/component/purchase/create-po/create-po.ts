import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PoService } from '../../../service/purchase/po-service';
import { ItemService } from '../../../service/purchase/item-service';
import { VendorService } from '../../../service/purchase/vendor-service';
import { Router, RouterModule } from '@angular/router';
import { PurchaseModel } from '../../../model/po.model';

@Component({
  selector: 'app-create-po',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './create-po.html',
  styleUrl: './create-po.css',
})
export class CreatePO implements OnInit {


  formPO!: FormGroup;

  po_number!: string;
  quantity!: number;
  rate!: number;
  total!: number;

  // ✅ These should be arrays, not single objects
  item: any[] = [];
  vendor: any[] = [];

  selectedPhone: string = '';
  selectedItemUnit: string = '';

  constructor(
    private poService: PoService,
    private itemService: ItemService,
    private vendorService: VendorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
   this.formPO = this.formBuilder.group({
  po_number: ['', Validators.required],
  poDate: ['', Validators.required],
  deliveryDate: ['', Validators.required],
  quantity: [null, [Validators.required, Validators.min(1)]],
  rate: [null, [Validators.required, Validators.min(1)]],
  tax: [0, [Validators.required, Validators.min(0)]],
  subTotal: [{ value: null, disabled: true }],
  total: [{ value: null, disabled: true }],
  termsAndCondition: [''],

  vendor: this.formBuilder.group({
    id: ['', Validators.required],
    phone: [''],
  }),

  item: this.formBuilder.group({
    id: ['', Validators.required],
    unit: [''],
  }),
});


    this.loadCategoryName();
    this.loadVendor();

    // Vendor change
    this.formPO.get('vendor.id')?.valueChanges.subscribe((id: number) => {
      const selected = this.vendor.find(ven => ven.id === +id);
      this.formPO.patchValue({
        vendor: {
          phone: selected?.phone ?? ''
        }
      });
      this.selectedPhone = selected?.phone ?? '';
      console.log('Selected Vendor:', selected);
    });

    // Item change
    this.formPO.get('item.id')?.valueChanges.subscribe((id: number) => {
      const selected = this.item.find(i => i.id === +id);
      this.selectedItemUnit = selected?.unit ?? '';
      console.log('Selected Item:', selected);
    });
  }

  addPO(): void {
    if (this.formPO.invalid) {
      console.log('Form Invalid');
      return;
    }

    const po: PurchaseModel = this.formPO.getRawValue();
    console.log('Submitting PO:', po);

    this.poService.savePO(po).subscribe({
      next: savedPO => {
        console.log('PO saved:', savedPO);
        this.formPO.reset();
        this.router.navigate(['']);
      },
      error: err => console.error(err)
    });
  }

  loadVendor(): void {
    this.vendorService.getAllVendor().subscribe({
      next: vendor => {
        this.vendor = vendor;
        this.cdr.detectChanges();
      },
      error: err => console.error(err)
    });
  }

  loadCategoryName(): void {
    this.itemService.getAllItem().subscribe({
      next: data => {
        this.item = data;
        this.cdr.detectChanges();
      },
      error: err => console.error(err)
    });
  }



    calculateTotalPrice(): void {
    const qty = this.formPO.get('quantity')?.value || 0;
    const rate = this.formPO.get('rate')?.value || 0;
    const subtotal = qty * rate;
    this.formPO.get('subTotal')?.setValue(subtotal);
    const tax = this.formPO.get('tax')?.value || 0;
    const total = subtotal + (subtotal * (tax / 100))
    this.formPO.get('total')?.setValue(total);
  }

}
