import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, onSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  userId = '';
  user: User = new User ;
  constructor(private route: ActivatedRoute) {

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
          this.user = new User (user.data());
          console.log(this.user);
      } else {
          console.log('User nicht vorhanden!');
      }
  });
         }
}
