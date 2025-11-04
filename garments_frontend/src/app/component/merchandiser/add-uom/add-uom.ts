import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UomService } from '../../../service/merchandiser/uom-service';
import { Uom } from '../../../model/uom.model';

@Component({
  selector: 'app-add-uom',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './add-uom.html',
  styleUrl: './add-uom.css',
})
export class AddUOM implements OnInit {

  body!: number;
  sleeve!: number;
  pocket!: number;
  wastage!: number;
  shrinkage!: number;
  baseFabric!: number;

  formGroup!: FormGroup;

  constructor(
    private uomService: UomService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({

      productName: [''],
      size: [''],
      body: [''],
      sleeve: [''],
      pocket: [''],
      wastage: [''],
      shrinkage: [''],
      baseFabric: ['']
    });
  }


  addUOM(): void {
    this.totalConsumption();

    const uom: Uom = {
      ...this.formGroup.value,
      result: this.baseFabric
    };

    this.uomService.saveUOM(uom).subscribe({
      next: (uom) => {
        console.log('UOM Added Succesfully!', uom);
        this.formGroup.reset();
        this.router.navigate(['/viewUom']);
      },
      error: (err) => {
        console.log(err);
      }
    });



  }

  
  totalConsumption(): void {
    this.body = this.formGroup.value.body;
    this.sleeve = this.formGroup.value.sleeve;
    this.pocket = this.formGroup.value.pocket;
    this.wastage = this.formGroup.value.wastage;
    this.shrinkage = this.formGroup.value.shrinkage;


    this.baseFabric = (this.body + this.pocket + this.sleeve) +
      ((this.body + this.pocket + this.sleeve) * ((this.wastage + this.shrinkage) / 100))
  }

  onFocusLost() {
    this.totalConsumption();
  }


}
