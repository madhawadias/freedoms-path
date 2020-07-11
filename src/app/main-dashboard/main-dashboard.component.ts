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
  public completedMissions: any = [];

  constructor() { }

  ngOnInit(): void {
    this.getTeams()
    // setInterval(this.getTeams(), 5000)
  }

  getTeams(){
    let self = this;

    firebase.database().ref('/teams/').on('value', function(snapshot) {
      self.teamsData = snapshot.val();
      let teamRanksLocal: any = [];
      // self.teamsData1 = snapshot.val();
      console.log(snapshot.val())
      for(let i = 0; i < self.teamsData.length; i++){
        let teamObj = {
          teamId: i,
          teamPoints: self.teamsData[i].points
        }
        teamRanksLocal.push(teamObj)
        let missionsCompleted: any = []
        for(let j = 0; j < self.teamsData[i].missions.length; j++){

          if(self.teamsData[i].missions[j].endTime != 0){
            missionsCompleted.push(self.teamsData[i].missions[j].name)

          // if(self.teamsData[i].missions[j].startTime != 0){
          //   if(self.teamsData[i].missions[j].name == 'Air CMC'){
          //     let timeLeftSeconds: number = 0;
          //     let missionTime: number = 1800;
          //
          //     let timeInString = self.teamsData[i].missions[j].startTime
          //     let splitted = timeInString.split(":")
          //     let minutes: number = + splitted[0]
          //     let seconds: number = + splitted[1] + minutes*60
          //     console.log("Seconds: ", seconds)
          //
          //   }
          // }
          }
        }
        self.teamsData[i].completed = missionsCompleted


      }
      teamRanksLocal.sort((a, b) => (a.teamPoints > b.teamPoints) ? -1 : 1)
      console.log("Team Ranks: " ,teamRanksLocal)
      for(let i = 0; i < teamRanksLocal.length; i++){
        self.teamsData[teamRanksLocal[i].teamId].rank = i+1

      }
      self.teamsData.sort((a,b) => (a.rank > b.rank) ? 1 : -1)
      self.teamRanks = teamRanksLocal
      console.log("Rank Added", self.teamsData)
    });
  }


}
