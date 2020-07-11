import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import {Router} from "@angular/router";
import { AuthenticationService } from  '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public managerData: any = [];

  //constructor(private  authService:  AuthenticationService) { }
  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.createManager()
  }

  login(username,password){
    this.getManagers();
    let routerOne = this.router;

    // let routerOne = this.router
    console.log(username,password)
    firebase.database().ref('/managers/').orderByChild("username").equalTo(username).on('value',function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        console.log("Username : "+childSnapshot.val().username + " Pass : "+ childSnapshot.val().password )
        if (childSnapshot.val().username==username && childSnapshot.val().password==password){
          console.log("Login Successful")
          sessionStorage.setItem('managerId',childSnapshot.key)
          console.log(sessionStorage)
          routerOne.navigate(["manager-dashboard"])
        }
        if(childSnapshot.val().username==username && childSnapshot.val().password!=password){
          console.log("Username Exists, Wrong password")
        }
        // else {
        //   console.log("Invalid Username")
        // }
      })
    });

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
    firebase.database().ref('managers/18').set({
      name: "Yomal",
      username: "CM-18",
      password: "cm18"

    });
  }

}
