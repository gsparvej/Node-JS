import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BuyerService } from '../../../service/merchandiser/buyer-service';

@Component({
  selector: 'app-view-buyer',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './view-buyer.html',
  styleUrl: './view-buyer.css',
})
export class ViewBuyer implements OnInit{

  buyer: any;

  constructor(
    private buyerService: BuyerService,
    private cdr : ChangeDetectorRef,
    private router: Router
  ) {}
  ngOnInit(): void {
   this.loadAllBuyer();
  }



  loadAllBuyer(){
    this.buyer = this.buyerService.getAllBuyer();
  }

  
}
