import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BomStyleService } from '../../../service/merchandiser/bom-style-service';

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
export class ViewBomStyle implements OnInit {

  bom: any;

  constructor(
    private bomStyleService: BomStyleService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.loadAllBomStyle();
  }

  loadAllBomStyle() {
    this.bom = this.bomStyleService.getBomstyleList();
  }
  
   bomDetails(styleCode: string) {
    // Navigate to BOM details page with styleCode as route param
    this.router.navigate(['viewBom', styleCode]);
  }

}
