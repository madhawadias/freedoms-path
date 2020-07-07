import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.sass']
})
export class MainDashboardComponent implements OnInit {
  public teamsData: any = [];
  public teamRanks: any = [];

  constructor() { }

  ngOnInit(): void {
    this.getTeams()
    // setInterval(this.getTeams(), 5000)
  }

  getTeams(){
    let self = this;
    firebase.database().ref('/teams/').once('value').then(function(snapshot) {
      self.teamsData = snapshot.val();
      // self.teamsData1 = snapshot.val();
      console.log(snapshot.val())
      for(let i = 0; i < self.teamsData.length; i++){
        let teamObj = {
          teamId: i,
          teamPoints: self.teamsData[i].points
        }
        self.teamRanks.push(teamObj)

      }
      self.teamRanks.sort((a, b) => (a.teamPoints > b.teamPoints) ? -1 : 1)
      console.log("Team Ranks: " ,self.teamRanks)
      for(let i = 0; i < self.teamRanks.length; i++){
        self.teamsData[self.teamRanks[i].teamId].rank = i+1

      }
      self.teamsData.sort((a,b) => (a.rank > b.rank) ? 1 : -1)
      console.log("Rank Added", self.teamsData)
    });
  }

}
