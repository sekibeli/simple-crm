import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  userId = '';
  user: User = new User;
  constructor(private route: ActivatedRoute, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log('id', this.userId);
      this.getUser(this.userId);
    });



  }

  getUser(id) {
    const collRef = collection(this.firestore, 'users');
    const collData = doc(collRef, id);


    onSnapshot(collData, (user) => {
      if (user.exists()) {
        // console.log(`Dokumentdaten: ${JSON.stringify(user.data())}`);
        // console.log(user.data(), user.id);
        this.user = new User(user.data());
        console.log(this.user);
      } else {
        console.log('User nicht vorhanden!');
      }
    });
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON()); // Eine Kopie des Users wird zum bearbeiten erstellt, sodass er auch wieder verworfen werden kann. Wird nur "this.user" genommen, dann wird das orginale Objekt verändert.
  }
  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
  }
}
