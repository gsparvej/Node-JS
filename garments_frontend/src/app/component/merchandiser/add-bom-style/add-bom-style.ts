import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BomStyleService } from '../../../service/merchandiser/bom-style-service';
import { Router } from '@angular/router';
import { BomStyle } from '../../../model/bomStyle.model';

@Component({
  selector: 'app-add-bom-style',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './add-bom-style.html',
  styleUrl: './add-bom-style.css',
})
export class AddBomStyle implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private bomStyleService: BomStyleService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }




  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      styleCode: [''],
      styleType: [''],
      description: ['']
    });
  }

  addBomStyle(): void {
    const bomStyle: BomStyle = { ...this.formGroup.value };
    this.bomStyleService.saveBomStyle(bomStyle).subscribe({
      next: (res) => {
        console.log(res, 'BomStyle Saved Succesfully!');
        this.formGroup.reset();
        this.router.navigate(['/viewBomStyle']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
