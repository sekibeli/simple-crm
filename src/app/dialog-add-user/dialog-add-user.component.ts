import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  loading = false;
  firestore: Firestore = inject(Firestore);
  user = new User;
  birthDate;


  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {}
  

  saveUser() {
    this.user.birthDate = this.birthDate?.getTime();
    console.log('Current user is: ', this.user);
    this.loading= true;
    const coll = collection(this.firestore, 'users');
    addDoc(coll, this.user.toJSON())
      .then((result: any) => {
        this.loading = false;
        console.log('Adding user finished', result);
        this.dialogRef.close();

      })
  }


}
