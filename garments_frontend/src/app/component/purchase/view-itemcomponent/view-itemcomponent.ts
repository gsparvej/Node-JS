import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../../../service/purchase/item-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-itemcomponent',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './view-itemcomponent.html',
  styleUrl: './view-itemcomponent.css',
})
export class ViewItemcomponent implements OnInit {

  item!: any;

  constructor(
    private itemService: ItemService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.loadAllItem();
  }

  loadAllItem() {
    this.item = this.itemService.getAllItem();


  }

}
