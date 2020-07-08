import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  logout(){
    let routerOne = this.router;
    sessionStorage.clear()
    console.log(sessionStorage)
    routerOne.navigate(["login"])

  }

  logIn(){
    let routerOne = this.router;
    // sessionStorage.clear()
    // console.log(sessionStorage)
    routerOne.navigate(["login"])

  }

  isLoggedIn(){
    if(sessionStorage.length<=0){
      return true
    }else{
      return false
    }
  }

}
