import { Component, OnInit,ViewChild, Inject} from '@angular/core';
import { PeriodicElement, ELEMENT_DATA, HomeComponent } from 'src/app/views/home/home.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { fn } from 'jquery';


export class Resultados{
  position = 0;
  nome = new String;
  weight = new Number;
  symbol = new String;
  answer = false;
}

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})


export class ElementDialogComponent { 
  constructor(
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement,
    public results : Resultados,
  ) {}
    fName = this.results.answer === false? new FormControl('',[Validators.required]): new FormControl(this.results.nome,[Validators.required]);
    fWeight = this.results.answer === false? new FormControl(null, [Validators.required]): new FormControl(this.results.weight, [Validators.required]);
    fSymbol = this.results.answer === false? new FormControl('', [Validators.required]): new FormControl(this.results.symbol, [Validators.required]);
    form = new FormGroup({});
  element!: PeriodicElement;
  
 
  ngOnInit(): void {
    
  }
  
  
  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(element: any): void{
    var a = ELEMENT_DATA.map(p=>p.position)
    var b = a[a.length - 1] + 1
    var finalData = {
      position: b,
      name: this.getName(),
      weight: this.getWeight(),
      symbol: this.getSymbol()
    }

    var newData = {
      position: this.results.position,
      name: this.getName(),
      weight: this.getWeight(),
      symbol: this.getSymbol()
    } 

    var e = ELEMENT_DATA.map(p=>p.name).includes(finalData.name);

    if(finalData.name !== null && finalData.weight !== null && finalData.symbol !== null && finalData !== undefined){      
      if(ELEMENT_DATA.find(p=>p.position === newData.position)){
        const index = ELEMENT_DATA.findIndex(p=>p.position === newData.position)
        ELEMENT_DATA[index] = newData;      
        this.dialogRef.close();
      }      
      if(e===false){
      ELEMENT_DATA.push(finalData);      
      this.dialogRef.close();
      }
      if(e===true){
        alert('Elemento já existe!')
      }
    }
  }

  getName (){
    return this.fName.value as unknown as string;
  }

  getWeight(){
    return this.fWeight.value as unknown as number;
  }

  getSymbol(){
    return this.fSymbol.value as unknown as string;
  }

}
