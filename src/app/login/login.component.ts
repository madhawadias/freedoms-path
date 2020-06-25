import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { AuthenticationService } from  '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public managerData: any = [];

  //constructor(private  authService:  AuthenticationService) { }
  constructor() { }

  ngOnInit(): void {

  }

  getManagers(){
    let self = this;
    firebase.database().ref('/managers/').once('value').then(function(snapshot) {
      self.managerData = snapshot.val();
      // self.teamsData1 = snapshot.val();
      console.log(snapshot.val())
    });
  }

  createManager(){
    firebase.database().ref('managers/0').set({
      name: "Keheliya Amarasinghe",
      username: "keheliyaa",
      password: "teena",
      team: [0,1],

    });
  }

}
