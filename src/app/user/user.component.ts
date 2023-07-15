import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
user = new User;
allUsers = [];

  constructor(public dialog: MatDialog){

  }
  ngOnInit(): void {
    const collRef = collection(this.firestore, 'users');
    collectionData(collRef, {idField: 'id'}).subscribe(user => {
      console.log(user);
      this.allUsers = user;
      console.log(this.allUsers);
      
    })
  }


  openDialog(){
    this.dialog.open(DialogAddUserComponent);
  }

}


