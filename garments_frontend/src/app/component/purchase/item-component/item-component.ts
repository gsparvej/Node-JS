import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../../../service/purchase/item-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Item } from '../../../model/item.model';

@Component({
  selector: 'app-item-component',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './item-component.html',
  styleUrl: './item-component.css',
})
export class ItemComponent implements OnInit{

formItem! : FormGroup;


 constructor(
    private itemService: ItemService,
    private router: Router,
    private formBuilder: FormBuilder, 
  ){}


  ngOnInit(): void {
     this.formItem = this.formBuilder.group({

       
       category_name :[''],
       unit :['']


    });
  }




  
  addItem(): void {
          const item : Item = {...this.formItem.value};
          this.itemService.saveItem(item).subscribe({
        
            next: (res) => {
        
              console.log(res,'Added Succesfully');
              this.formItem.reset();
              this.router.navigate(['/viewItem']);
        
            },
            error: (err) => {
              console.log(err,'Data Not Saved ! Please Check Console')
        
            }
        
        
        
          });
        
        
        
          }

}
