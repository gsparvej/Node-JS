import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchaseModel } from '../../../model/po.model';
import { PoService } from '../../../service/purchase/po-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-half-po',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './view-half-po.html',
  styleUrl: './view-half-po.css',
})
export class ViewHalfPO implements OnInit{


  po: PurchaseModel[] = [];

  constructor(
    private poService: PoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.loadAllPOs();
  }

  loadAllPOs(): void {
   
      po: this.poService.getAllPO().subscribe({
      next: (result) => {
        this.po = result;     

        console.log('po:', this.po);
        this.cdr.detectChanges();


        // ⚠️ Don't navigate here unless needed
        // this.router.navigate(['/viewHalfOrder']);
      },
      error: (err) => {
        console.error('Error loading data:', err);
        alert('Failed to load POs data');
      }
    });
  }

  getPOById(id: number): void {
    this.router.navigate(['/viewPODetails', id]);
  }

}
