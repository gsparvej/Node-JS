import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BomStyle } from '../../../model/bomStyle.model';
import { Uom } from '../../../model/uom.model';
import { BomService } from '../../../service/merchandiser/bom-service';
import { Router, RouterModule } from '@angular/router';
import { BomStyleService } from '../../../service/merchandiser/bom-style-service';
import { UomService } from '../../../service/merchandiser/uom-service';
import { Bom } from '../../../model/bom.model';

@Component({
  selector: 'app-add-bom',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './add-bom.html',
  styleUrl: './add-bom.css',
})
export class AddBom implements OnInit {


  serial!: number;
  material!: string;
  unit!: string;
  quantity!: number;
  unit_price!: number;
  total_cost!: number;

  bomStyle: BomStyle[] = [];
  uom: Uom[] = [];

  formGroup!: FormGroup;


  constructor(
    private bomService: BomService,
    private bomStyleService: BomStyleService,
    private uomService: UomService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }



  ngOnInit(): void {
    // ✅ Setup form with nested groups
    this.formGroup = this.formBuilder.group({
      serial: [''],
      material: [''],
      unit: [''],
      quantity: [''],
      unit_price: [''],
      total_cost: [''],
      uom: this.formBuilder.group({
        id: ['']
      }),
      bomStyle: this.formBuilder.group({
        id: ['']
      })
    });


    this.loadBomStyle();
    this.loadUom();

    // ✅ Watch for changes in selected BOM id
    this.formGroup.get('bomStyle')?.get('id')?.valueChanges.subscribe(id => {
      const selectedBom = this.bomStyle.find(b => b.id === id);
      if (selectedBom) {
        console.log('Selected BOM:', selectedBom);
      }
    });

    // ✅ Watch for changes in selected UOM id
    this.formGroup.get('uom')?.get('id')?.valueChanges.subscribe(id => {
      const selectedUom = this.uom.find(u => u.id === id);
      if (selectedUom) {
        console.log('Selected UOM:', selectedUom);
      }
    });

  }


  loadBomStyle(): void {
    this.bomStyleService.getBomstyleList().subscribe({
      next: (bomStyle) => {
        this.bomStyle = bomStyle;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadUom(): void {
    this.uomService.getAllUOM().subscribe({
      next: (s) => {
        this.uom = s;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  saveBom(): void {
    // ✅ Directly use form value
    const bom: Bom = this.formGroup.value;

    this.bomService.saveBOM(bom).subscribe({
      next: (bomview) => {
        console.log(bomview, 'Bom Successfully !');
        this.loadBomStyle();
        this.loadUom();
        this.formGroup.reset();
        this.router.navigate(['/viewBomStyle']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  totalCostingPerRow(): void {
    const quantity = this.formGroup.get('quantity')?.value || 0;
    const unit_price = this.formGroup.get('unit_price')?.value || 0;
    const totalCost = quantity * unit_price;

    this.total_cost = totalCost;

    // 🔧 Save it in the form control as well
    this.formGroup.get('total_cost')?.setValue(totalCost);
    this.cdr.detectChanges();
  }

  onFocusLost() {
    this.totalCostingPerRow();
  }

}
