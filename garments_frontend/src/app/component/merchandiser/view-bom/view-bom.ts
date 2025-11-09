import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Bom } from '../../../model/bom.model';
import { BomService } from '../../../service/merchandiser/bom-service';

@Component({
  selector: 'app-view-bom',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './view-bom.html',
  styleUrl: './view-bom.css',
})
export class ViewBom implements OnInit {



  styleCode: string = '';
  boms: Bom[] = [];


  constructor(
    private bomService: BomService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ar: ActivatedRoute
  ) { }


  ngOnInit(): void {
    console.log("**********************************")
    // Get styleCode from route param
    this.styleCode = this.ar.snapshot.paramMap.get('styleCode') || '';
    console.log(this.styleCode + "+++++++++++++++++++++++++");

    if (this.styleCode) {
      this.bomService.viewBOMByStyleCode(this.styleCode).subscribe({
        next: (data) => {
          this.boms = data;
          console.log(data);
          this.cdr.markForCheck(); // optional if using OnPush
        },
        error: (err) => console.error(err)
      });
    }
  }


}
