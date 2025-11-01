import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UomService } from '../../../service/merchandiser/uom-service';

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




}
