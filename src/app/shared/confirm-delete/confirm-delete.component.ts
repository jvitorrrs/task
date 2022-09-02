import { Component, OnInit, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {MatDialog, MatDialogContainer, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomeComponent } from 'src/app/views/home/home.component';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    ) { }

  ngOnInit(): void {
  }

  confirmDelete(){
    this.dialogRef.close();    
    window.sessionStorage.setItem('1','true');
  }

  cancelDelete(){
    this.dialogRef.close()
    window.sessionStorage.removeItem('1')
  }

}
