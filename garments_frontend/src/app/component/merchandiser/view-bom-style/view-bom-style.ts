import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-bom-style',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './view-bom-style.html',
  styleUrl: './view-bom-style.css',
})
export class ViewBomStyle implements OnInit{

  bom: any;

  constructor(
    
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
