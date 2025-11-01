import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UomService } from '../../../service/merchandiser/uom-service';

@Component({
  selector: 'app-view-uom',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './view-uom.html',
  styleUrl: './view-uom.css',
})
export class ViewUOM implements OnInit{

  uom: any;

   constructor(
    private uomService: UomService,
    private cdr : ChangeDetectorRef,
    private router: Router
  ) {}





  ngOnInit(): void {
    this.loadAllUOM();
  }

  loadAllUOM()  {
    this.uom = this.uomService.getAllUOM();
  }

}
