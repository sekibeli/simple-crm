import { Component, inject } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
firestore: Firestore = inject(Firestore);
  user: User;
  userId: string;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>){}

  saveAddress(){
    this.loading = true;
    const collDocRef = doc(this.firestore, 'users', this.userId);
    return setDoc(collDocRef, this.user.toJSON()).then(()=>{
      this.loading = false;
      this.dialogRef.close();
    });
  }

}
