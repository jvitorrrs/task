import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { elementAt, findIndex } from 'rxjs';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { ElementDialogComponent, Resultados } from 'src/app/shared/element-dialog/element-dialog.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

 export const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  check = new Boolean
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog,
    public confirmDelete: ConfirmDeleteComponent,
    @Inject(ElementDialogComponent) public elementDialog: ElementDialogComponent,
    @Inject(Resultados) public results: Resultados) {}

  ngOnInit(): void {
  }  

  openDialog(element: PeriodicElement | null): void{
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px'}); 
      this.results.answer = false;        
  this.results.nome = '';
  this.results.weight = new Number;
  this.results.symbol = ''; 
    dialogRef.afterClosed().subscribe(result=>{
      this.table.renderRows();
    })  
  
}

editElement(element: PeriodicElement):void {
  this.results.answer = true;
  this.results.position = element!.position;
  this.results.nome = element!.name;
  this.results.weight = element!.weight;
  this.results.symbol = element!.symbol;  
  const dialogRef = this.dialog.open(ElementDialogComponent, {
    width: '250px'});
    dialogRef.afterClosed().subscribe(result=>{
      this.table.renderRows();
      this.results.answer = false;
  this.elementDialog.fName.setValue('');
  this.elementDialog.fWeight.setValue(new Number);
  this.elementDialog.fSymbol.setValue('');  
  this.results.position = 0;      
  this.results.nome = '';
  this.results.weight = new Number;
  this.results.symbol = ''; 
    })    
}

deleteElement(element: PeriodicElement){
    const dialogRef = this.dialog.open(ConfirmDeleteComponent); 
    dialogRef.afterClosed().subscribe(result=>{
      var a = window.sessionStorage.getItem('1');
      if(a!==null){
        this.confirmDeleteElement(element)
      }
      this.table.renderRows()
    }) 
}

 confirmDeleteElement(element: PeriodicElement){
  this.dataSource = this.dataSource.filter(p=>p.position !== element.position);  
  this.dataSource.forEach(function(elemento,index,array){
    elemento.position = index + 1
  })
  this.table.renderRows()
  }
}
