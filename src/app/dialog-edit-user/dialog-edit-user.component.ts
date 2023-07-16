import { Component, inject } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  firestore: Firestore = inject(Firestore);
loading = false;
userId: string;
  user: User;
  birthDate: Date;
constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>){}


saveUserDetails(){
  const collDocRef = doc(this.firestore, 'users', this.userId);
  return setDoc(collDocRef, this.user.toJSON()).then(()=>{
    this.loading= false;
    this.dialogRef.close();
  });
}
}
