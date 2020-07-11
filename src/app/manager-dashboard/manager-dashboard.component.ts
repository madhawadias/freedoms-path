import { Component, OnInit } from '@angular/core'
import * as firebase from "firebase";
import {ActivatedRoute, Router} from "@angular/router";
import { timer } from 'rxjs';
import {MainDashboardComponent} from "../main-dashboard/main-dashboard.component";
import {split} from "ts-node";

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.sass']
})
export class ManagerDashboardComponent implements OnInit {
  public teamsData: any = [];
  public outputData: any = [];
  public id: any = [];
  public teamRanks: any = [];
  timeLeft: number = 60;
  interval;
  subscribeTimer: any;


  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // let mainDashboardObject = new MainDashboardComponent()
    this.getTeam(sessionStorage.getItem("managerId"))
    // this.getTeams()
    // mainDashboardObject.ngOnInit()
    // this.getTeamPoints(0)
    // this.updateQuestions(this.teamId,this.missionId,this.taskId,this.score)
    // this.createTeam()
    // this.createArray()
    // console.log(this.teamsData)
  }

  createTeam(){
    let numValue: number = 14
    let teamValue = numValue + 1
    let team: string = teamValue.toString()
    let num: string = numValue.toString()
    firebase.database().ref('teams/'+num).set({
      name: "Team "+team,
      managerId: 9,
      questions: 0,
      hints: 0,
      points: 0,
      mission: "",
      missions: [
        {
          name: "First Light",
          startTime: 0,
          endTime: 0,
          timeLeft: 0,
          timeBonus: 0,
          task: [
            {
              questions: 0,
              hints: 0,
              name: "task1",
              taskBonus: 0,
            },
            {
              questions: 0,
              hints: 0,
              name: "task2",
              taskBonus: 0,
            },
            {
              questions: 0,
              hints: 0,
              name: "task3",
              taskBonus: 0,
            }
          ]
        },
        {
          name: "Air CMC",
          startTime: 0,
          endTime: 0,
          timeLeft: 0,
          timeBonus: 0,
          task: [
            {
              questions: 0,
              hints: 0,
              name: "task1",
              taskBonus: 0,
            },
            {
              questions: 0,
              hints: 0,
              name: "task2",
              taskBonus: 0,
            },
            {
              questions: 0,
              hints: 0,
              name: "task3",
              taskBonus: 0,
            }
          ]
        },
        {
          name: "Corn Maze",
          startTime: 0,
          endTime: 0,
          timeLeft: 0,
          timeBonus: 0,
          task: [
            {
              questions: 0,
              hints: 0,
              name: "task1",
              taskBonus: 0,
            },
            {
              questions: 0,
              hints: 0,
              name: "task2",
              taskBonus: 0,
            },
            {
              questions: 0,
              hints: 0,
              name: "task3",
              taskBonus: 0,
            }
          ]
        },
        {
          name: "Portions Master",
          startTime: 0,
          endTime: 0,
          timeLeft: 0,
          timeBonus: 0,
          task: [
            {
              questions: 0,
              hints: 0,
              name: "task1",
              taskBonus: 0,
            },
            {
              questions: 0,
              hints: 0,
              name: "task2",
              taskBonus: 0,
            },
            {
              questions: 0,
              hints: 0,
              name: "task3",
              taskBonus: 0,
            }
          ]
        },
        {
          name: "Explorer",
          startTime: 0,
          endTime: 0,
          timeLeft: 0,
          timeBonus: 0,
          task: [
            {
              questions: 0,
              hints: 0,
              name: "task1",
              taskBonus: 0,
            },
            {
              questions: 0,
              hints: 0,
              name: "task2",
              taskBonus: 0,
            },
            {
              questions: 0,
              hints: 0,
              name: "task3",
              taskBonus: 0,
            }
          ]
        },
        {
          name: "Last Stand",
          startTime: 0,
          endTime: 0,
          timeLeft: 0,
          timeBonus: 0,
          timeDif: 0,
          points: 0,
          task: [
            {
              questions: 0,
              hints: 0,
              name: "task1",
              taskBonus: 0,
            },
            {
              questions: 0,
              hints: 0,
              name: "task2",
              taskBonus: 0,
            },
            {
              questions: 0,
              hints: 0,
              name: "task3",
              taskBonus: 0,
            }
          ]
        }

      ]
    });
  }

  getTeam(managerId){
    let self = this;
    let routerOne = this.router;
    if(sessionStorage.length == 0){
      routerOne.navigate(["login"])
    }else{
      // let managerIdValue: number = +managerId
      // console.log("managerId : " + managerIdValue)
      let managerIdNum: number = +managerId
      firebase.database().ref('/teams/').orderByChild('managerId').equalTo(managerIdNum).on('value', function(snapshot) {
        self.teamsData = snapshot.val();
        // self.teamsData1 = snapshot.val();
        console.log("GetTeam : ",snapshot.val())
        // for(let i = 0; i < self.teamsData.length; i++){
        //   let teamObj = {
        //     teamId: i,
        //     teamPoints: self.teamsData[i].points
        //   }
        //   self.teamRanks.push(teamObj)
        // }
        // self.teamRanks.sort((a, b) => (a.teamPoints > b.teamPoints) ? -1 : 1)
        // console.log("Team Ranks: " ,self.teamRanks)
        // for(let i = 0; i < self.teamRanks.length; i++){
        //   self.teamsData[self.teamRanks[i].teamId].rank = i+1
        //
        // }
        // console.log("Rank Added", self.teamsData)

      });
    }

  }

  updatePoints(teamId){
    let self = this;
    let points : number = 0;
    let scoreValue : number = 0;
    let managerId = sessionStorage.getItem("managerId")
    let managerIdNum: number = +managerId
    firebase.database().ref('/teams/').orderByChild('managerId').equalTo(managerIdNum).once('value').then( function(snapshot) {
    // firebase.database().ref('/teams/').once('value').then(function(snapshot) {
      self.teamsData = snapshot.val();
    }).then(() => {
      //for (let i=0; i<this.teamsData.length; i++){
      let i : number = +teamId
        if (i == teamId){
          // points = this.teamsData[i].points
          let firstLightPoints = this.teamsData[i].missions[0].task[0].questions

          let airCMCTimeBonus = this.teamsData[i].missions[1].timeBonus
          let airCMCTask0Bonus = this.teamsData[i].missions[1].task[0].taskBonus
          let airCMCTask0points = this.teamsData[i].missions[1].task[0].questions*2000
          let airCMCTask0Hints = this.teamsData[i].missions[1].task[0].hints*500
          let airCMCTask1Bonus = this.teamsData[i].missions[1].task[1].taskBonus
          let airCMCTask1points = this.teamsData[i].missions[1].task[1].questions*2000
          let airCMCTask1Hints = this.teamsData[i].missions[1].task[1].hints*500
          let airCMCTask2Bonus = this.teamsData[i].missions[1].task[2].taskBonus
          let airCMCTask2points = this.teamsData[i].missions[1].task[2].questions*2000
          let airCMCTask2Hints = this.teamsData[i].missions[1].task[2].hints*500

          let cornMazeTimeBonus = this.teamsData[i].missions[2].timeBonus
          let cornMazeTask0Bonus = this.teamsData[i].missions[2].task[0].taskBonus
          let cornMazeTask0Points = this.teamsData[i].missions[2].task[0].questions*200
          let cornMazeTask1Bonus = this.teamsData[i].missions[2].task[1].taskBonus
          let cornMazeTask1Points = this.teamsData[i].missions[2].task[1].questions*200
          let cornMazeTask2Bonus = this.teamsData[i].missions[2].task[2].taskBonus
          let cornMazeTask2Points = this.teamsData[i].missions[2].task[2].questions*200

          let portionsMasterTimeBonus = this.teamsData[i].missions[3].timeBonus
          let portionsMasterTask0Bonus = this.teamsData[i].missions[3].task[0].taskBonus
          let portionsMasterTask0Points = this.teamsData[i].missions[3].task[0].questions*1000
          let portionsMasterTask0Hints = this.teamsData[i].missions[3].task[0].hints*250
          let portionsMasterTask1Bonus = this.teamsData[i].missions[3].task[1].taskBonus
          let portionsMasterTask1Points = this.teamsData[i].missions[3].task[1].questions*1000
          let portionsMasterTask1Hints = this.teamsData[i].missions[3].task[1].hints*250
          let portionsMasterTask2Bonus = this.teamsData[i].missions[3].task[2].taskBonus
          let portionsMasterTask2Points = this.teamsData[i].missions[3].task[2].questions*1000
          let portionsMasterTask2Hints = this.teamsData[i].missions[3].task[2].hints*250

          let explorerTimeBonus = this.teamsData[i].missions[4].timeBonus
          let explorerTask0Bonus = this.teamsData[i].missions[4].task[0].taskBonus
          let explorerTask0Points = this.teamsData[i].missions[4].task[0].questions*800

          let lastStandPoints = 0
          if(this.teamsData[i].missions[5].hasOwnProperty('points')){
            lastStandPoints = this.teamsData[i].missions[5].points
          }

          points = firstLightPoints+airCMCTask0points+airCMCTask1points+airCMCTask2points
            +cornMazeTask0Points+cornMazeTask1Points+cornMazeTask2Points
            +portionsMasterTask0Points+portionsMasterTask1Points+portionsMasterTask2Points
            +explorerTask0Points
            +airCMCTimeBonus+cornMazeTimeBonus+portionsMasterTimeBonus+explorerTimeBonus
            +airCMCTask0Bonus+airCMCTask1Bonus+airCMCTask2Bonus
            +cornMazeTask0Bonus+cornMazeTask1Bonus+cornMazeTask2Bonus
            +portionsMasterTask0Bonus+portionsMasterTask1Bonus+portionsMasterTask2Bonus
            +explorerTask0Bonus
            +lastStandPoints
            -airCMCTask0Hints-airCMCTask1Hints-airCMCTask2Hints
            -portionsMasterTask0Hints-portionsMasterTask1Hints-portionsMasterTask2Hints

        }

      firebase.database().ref('/teams/').child(teamId)
        .update({points: points}).then(() => {
        firebase.database().ref('/teams/').orderByChild('managerId').equalTo(managerIdNum).once('value').then( function(snapshot) {
        // firebase.database().ref('/teams/').once('value').then(function(snapshot) {
          self.teamsData = snapshot.val();
          // console.log(snapshot.val())
        });

      });
    });

  }

  updateTotalQuestions(teamId){
    let self = this;
    let questions : number = 0;
    let managerId = sessionStorage.getItem("managerId")
    let managerIdNum: number = +managerId
    firebase.database().ref('/teams/').orderByChild('managerId').equalTo(managerIdNum).once('value').then( function(snapshot) {
      // firebase.database().ref('/teams/').once('value').then(function(snapshot) {
      self.teamsData = snapshot.val();
    }).then(() => {
      //for (let i=0; i<this.teamsData.length; i++){
      let i : number = +teamId
      if (i == teamId){

        let airCMCTask0points = this.teamsData[i].missions[1].task[0].questions
        let airCMCTask1points = this.teamsData[i].missions[1].task[1].questions
        let airCMCTask2points = this.teamsData[i].missions[1].task[2].questions

        let cornMazeTask0Points = this.teamsData[i].missions[2].task[0].questions
        let cornMazeTask1Points = this.teamsData[i].missions[2].task[1].questions
        let cornMazeTask2Points = this.teamsData[i].missions[2].task[2].questions

        let portionsMasterTask0Points = this.teamsData[i].missions[3].task[0].questions
        let portionsMasterTask1Points = this.teamsData[i].missions[3].task[1].questions
        let portionsMasterTask2Points = this.teamsData[i].missions[3].task[2].questions

        let explorerTask0Points = this.teamsData[i].missions[4].task[0].questions

        questions = airCMCTask0points+airCMCTask1points+airCMCTask2points
          +cornMazeTask0Points+cornMazeTask1Points+cornMazeTask2Points
          +portionsMasterTask0Points+portionsMasterTask1Points+portionsMasterTask2Points
          +explorerTask0Points
      }

      firebase.database().ref('/teams/').child(teamId)
        .update({questions: questions}).then(() => {
        firebase.database().ref('/teams/').orderByChild('managerId').equalTo(managerIdNum).once('value').then( function(snapshot) {
          // firebase.database().ref('/teams/').once('value').then(function(snapshot) {
          self.teamsData = snapshot.val();
        });

      });
    });

  }

  updateTotalHints(teamId){
    let self = this;
    let hints : number = 0;
    let managerId = sessionStorage.getItem("managerId")
    let managerIdNum: number = +managerId
    firebase.database().ref('/teams/').orderByChild('managerId').equalTo(managerIdNum).once('value').then( function(snapshot) {
      // firebase.database().ref('/teams/').once('value').then(function(snapshot) {
      self.teamsData = snapshot.val();
    }).then(() => {
      //for (let i=0; i<this.teamsData.length; i++){
      let i : number = +teamId
      if (i == teamId){

        let airCMCTask0points = this.teamsData[i].missions[1].task[0].hints
        let airCMCTask1points = this.teamsData[i].missions[1].task[1].hints
        let airCMCTask2points = this.teamsData[i].missions[1].task[2].hints

        let portionsMasterTask0Points = this.teamsData[i].missions[3].task[0].hints
        let portionsMasterTask1Points = this.teamsData[i].missions[3].task[1].hints
        let portionsMasterTask2Points = this.teamsData[i].missions[3].task[2].hints

        let explorerTask0Points = this.teamsData[i].missions[4].task[0].questions

        hints = airCMCTask0points+airCMCTask1points+airCMCTask2points
          +portionsMasterTask0Points+portionsMasterTask1Points+portionsMasterTask2Points
          +explorerTask0Points
      }

      firebase.database().ref('/teams/').child(teamId)
        .update({hints: hints}).then(() => {
        firebase.database().ref('/teams/').orderByChild('managerId').equalTo(managerIdNum).once('value').then( function(snapshot) {
          // firebase.database().ref('/teams/').once('value').then(function(snapshot) {
          self.teamsData = snapshot.val();
        });

      });
    });

  }

  getTeams(){
      let self = this;
      firebase.database().ref('/teams/').once('value').then(function(snapshot) {
        self.teamsData = snapshot.val();
        console.log(snapshot.val())
        for(let i = 0; i < self.teamsData.length; i++){
          let teamObj = {
            teamId: i,
            teamPoints: self.teamsData[i].points
          }
          self.teamRanks.push(teamObj)
          // self.teamsData[0].missions[1].timeLeft = 1800
          // if(!self.teamsData[i].missions[0].timeLeft){
          //   self.teamsData[i].missions[0].timeLeft = 0
          // }if(!self.teamsData[i].missions[1].timeLeft){
          //   self.teamsData[i].missions[1].timeLeft = 0
          // }if(!self.teamsData[i].missions[2].timeLeft){
          //   self.teamsData[i].missions[2].timeLeft = 0
          // }if(!self.teamsData[i].missions[3].timeLeft){
          //   self.teamsData[i].missions[3].timeLeft = 0
          // }if(!self.teamsData[i].missions[4].timeLeft){
          //   self.teamsData[i].missions[4].timeLeft = 0
          // }if(!self.teamsData[i].missions[5].timeLeft){
          //   self.teamsData[i].missions[5].timeLeft = 0
          // }

        }
        self.teamRanks.sort((a, b) => (a.teamPoints > b.teamPoints) ? -1 : 1)
        console.log("Team Ranks: " ,self.teamRanks)
        for(let i = 0; i < self.teamRanks.length; i++){
          self.teamsData[self.teamRanks[i].teamId].rank = i+1

        }
        console.log("Rank Added", self.teamsData)
      });

  }

  updateTime(teamId, missionId, timeType, timeValue){
    // console.log(teamId + missionId + timeType + timeValue)
    let teamIdNum: number = +teamId
    let missionIdNum: number = +missionId
    teamId = teamId.toString();
    missionId = missionId.toString();
    timeType = timeType.toString();
    timeValue = timeValue.toString();
    let self = this;

    if(timeType == "startTime"){
      self.startTimer(teamId, missionId)
      firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
        .update({startTime: timeValue}).then(() => {
        // console.log("working")
        let managerId = sessionStorage.getItem("managerId")
        let managerIdNum: number = +managerId
        firebase.database().ref('/teams/').orderByChild('managerId').equalTo(managerIdNum).once('value').then( function(snapshot) {
        // firebase.database().ref('/teams/').once('value').then(function(snapshot) {
          self.teamsData = snapshot.val();
          // self.teamsData1 = snapshot.val();
          // console.log(snapshot.val())
          // self.updateTimeBonus(teamId, missionIdNum, missionId)
        });
      })
      firebase.database().ref('/teams/').child(teamId)
        .update({mission: this.teamsData[teamIdNum].missions[missionIdNum].name})
    }
    if(timeType == "endTime"){
      firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
        .update({endTime: timeValue}).then(() => {
          // console.log("working")
        let managerId = sessionStorage.getItem("managerId")
        let managerIdNum: number = +managerId
        firebase.database().ref('/teams/').orderByChild('managerId').equalTo(managerIdNum).once('value').then( function(snapshot) {
        // firebase.database().ref('/teams/').once('value').then(function(snapshot) {
          self.teamsData = snapshot.val();
          // self.teamsData1 = snapshot.val();
          // console.log(snapshot.val())
          self.updateTimeBonus(teamId, missionIdNum, missionId)
          if(missionIdNum == 5){
            self.updateLastStandTimeDif(teamId)
          }
        });


        })
    }
    if(timeType == "timeLeft"){
      firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
        .update({timeLeft: timeValue})
    }

  }

  updateLastStandTimeDif(teamId){
    let teamIdNum: number = +teamId
    let timeDifference: number = 0
    let extraMins: number = 0
    let endTime: string = this.teamsData[teamIdNum].missions[5].endTime
    let endTimeSplit = endTime.split(':')
    let endTimeHours: number = +endTimeSplit[0]
    let endTimeMin: number = +endTimeSplit[1]
    let endTimeSeconds: number = +endTimeSplit[2]
    endTimeSeconds = endTimeHours *60*60 + endTimeMin*60 + endTimeSeconds

    let startTime: string = this.teamsData[teamIdNum].missions[5].startTime
    let startTimeSplit = startTime.split(':')
    let startTimeHours: number = +startTimeSplit[0]
    let startTimeMin: number = +startTimeSplit[1]
    let startTimeSeconds: number = +startTimeSplit[2]
    startTimeSeconds = startTimeHours *60*60 + startTimeMin*60 + startTimeSeconds
    if(isNaN(endTimeSeconds) || isNaN(startTimeSeconds)){
      timeDifference = 0
      firebase.database().ref('/teams/').child(teamId).child('missions').child('5')
        .update({points: 0})
    }else{
      timeDifference = endTimeSeconds - startTimeSeconds
    }
    console.log("Last stand Time Dif: ", timeDifference)

    let self = this
    firebase.database().ref('/teams/').child(teamId).child('missions').child('5')
      .update({timeDif: timeDifference}).then(() => {
      // let managerId = sessionStorage.getItem("managerId")
      // let managerIdNum: number = +managerId
      // firebase.database().ref('/teams/').orderByChild('managerId').equalTo(managerIdNum).once('value').then( function(snapshot) {
        firebase.database().ref('/teams/').once('value').then(function(snapshot) {
        self.teamsData = snapshot.val();
        console.log(snapshot.val())
        let teamLSRanks: any = [];
        for(let i = 0; i < self.teamsData.length; i++){
          if(self.teamsData[i].missions[5].timeDif != null && self.teamsData[i].missions[5].timeDif != 0){
            let teamLSObj = {
              teamId: i,
              teamTimeDif: self.teamsData[i].missions[5].timeDif
            }
            teamLSRanks.push(teamLSObj)
          }
        }
        teamLSRanks.sort((a, b) => (a.teamTimeDif > b.teamTimeDif) ? 1 : -1)
        console.log("Team LS Ranks: " ,teamLSRanks)
        let lsPoints = 13400
        teamLSRanks.forEach(function (value) {
          value.points = lsPoints
          lsPoints = lsPoints - 335
        })
          console.log("Team LS Ranks: " ,teamLSRanks)

          teamLSRanks.forEach(function (value) {
            firebase.database().ref('/teams/').child(value.teamId.toString()).child('missions').child('5')
              .update({points: value.points})
          });
        self.updatePoints(teamId)
      });

    });

  }

  updateTimeBonus(teamId, missionIdNum: number, missionId) {

    //for (let i = 0; i < this.teamsData.length; i++) {
      // Checks whether all questions are answered
    let i: number = +teamId
      if (i == teamId && ((this.teamsData[i].missions[1].task[0].questions == 5 && this.teamsData[i].missions[1].task[1].questions == 5 && this.teamsData[i].missions[1].task[0].questions == 5)
        || (this.teamsData[i].missions[2].task[0].questions == 10 && this.teamsData[i].missions[2].task[1].questions == 10 && this.teamsData[i].missions[2].task[0].questions == 10)
        || (this.teamsData[i].missions[3].task[0].questions == 10 && this.teamsData[i].missions[3].task[1].questions == 10 && this.teamsData[i].missions[3].task[0].questions == 10)
        || (this.teamsData[i].missions[4].task[0].questions == 15))) {

        let explorerStartDate = new Date()
        let explorerEndDate = new Date()
        let explorerTimeDif: number = 0
        //Check for explorer Time Diff and Date()
        if(this.teamsData[i].missions[4].endTime && this.teamsData[i].missions[4].startTime){
          let endTime: string = this.teamsData[i].missions[4].endTime
          let endTimeSplit = endTime.split(':')
          let endTimeHours: number = +endTimeSplit[0]
          let endTimeMin: number = +endTimeSplit[1]
          explorerEndDate.setHours(endTimeHours)
          explorerEndDate.setMinutes(endTimeMin)
          endTimeMin = endTimeHours * 60 + endTimeMin

          let startTime: string = this.teamsData[i].missions[4].startTime
          let startTimeSplit = startTime.split(':')
          let startTimeHours: number = +startTimeSplit[0]
          let startTimeMin: number = +startTimeSplit[1]
          explorerStartDate.setHours(startTimeHours)
          explorerStartDate.setMinutes(startTimeMin)
          startTimeMin = startTimeHours * 60 + startTimeMin

          explorerTimeDif = endTimeMin - startTimeMin
        }

        if(this.teamsData[i].missions[missionIdNum].endTime && this.teamsData[i].missions[missionIdNum].startTime) {
          let timeDifference: number = 0
          let extraMins: number = 0
          let endTime: string = this.teamsData[i].missions[missionIdNum].endTime
          let endTimeSplit = endTime.split(':')
          let endTimeHours: number = +endTimeSplit[0]
          let endTimeMin: number = +endTimeSplit[1]
          let endDate = new Date()
          endDate.setHours(endTimeHours)
          endDate.setMinutes(endTimeMin)
          endTimeMin = endTimeHours * 60 + endTimeMin

          let startTime: string = this.teamsData[i].missions[missionIdNum].startTime
          let startTimeSplit = startTime.split(':')
          let startTimeHours: number = +startTimeSplit[0]
          let startTimeMin: number = +startTimeSplit[1]
          let startDate = new Date()
          startDate.setHours(startTimeHours)
          startDate.setMinutes(startTimeMin)
          startTimeMin = startTimeHours * 60 + startTimeMin

          // let explorerPenalty: number = 0;
          if((startDate < explorerStartDate && endDate > explorerStartDate) || (startDate < explorerEndDate && endDate > explorerEndDate)){
            // explorerPenalty = explorerTimeDif
            timeDifference = endTimeMin - startTimeMin - explorerTimeDif
          }else{
            timeDifference = endTimeMin - startTimeMin
          }


          //Calculating time bonus points
          if(missionIdNum == 1 && timeDifference<30){
            extraMins = 30 - timeDifference;
          }
          if(missionIdNum == 2 && timeDifference<20){
            extraMins = 20 - timeDifference;
          }
          if(missionIdNum == 3 && timeDifference<30){
            extraMins = 30 - timeDifference;
          }
          if(missionIdNum == 4 && timeDifference<10){
            extraMins = 10 - timeDifference;
          }
          console.log("Time Difference: " + timeDifference)
          firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
            .update({timeBonus: extraMins * 150})
        }
      }else{
        firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
          .update({timeBonus: 0})
      }
    //}
  }

  updateTaskBonus(teamId, missionId, taskId){
    let self = this;
    let missionIdNum: number = +missionId
    let taskIdNum: number = +taskId
    for(let i = 0; i < this.teamsData.length; i++){
      if (i == teamId && missionIdNum == 1 && ((this.teamsData[i].missions[missionIdNum].task[taskIdNum].questions == 5 ))) {
        firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId).child('task').child(taskId)
          .update({taskBonus: 3000}).then(() => {
          let managerId = sessionStorage.getItem("managerId")
          let managerIdNum: number = +managerId
          firebase.database().ref('/teams/').orderByChild('managerId').equalTo(managerIdNum).once('value').then( function(snapshot) {
          // firebase.database().ref('/teams/').once('value').then(function(snapshot) {
            self.teamsData = snapshot.val();
            console.log(snapshot.val())
          });

        });
      }
      if (i == teamId && missionIdNum == 2 && ((this.teamsData[i].missions[missionIdNum].task[taskIdNum].questions == 10 ))) {
        firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId).child('task').child(taskId)
          .update({taskBonus: 300})
      }
      if (i == teamId && missionIdNum == 3 && ((this.teamsData[i].missions[missionIdNum].task[taskIdNum].questions == 10 ))) {
        firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId).child('task').child(taskId)
          .update({taskBonus: 1500})
      }
      if (i == teamId && missionIdNum == 4 && ((this.teamsData[i].missions[missionIdNum].task[0].questions == 15 ))) {
        firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId).child('task').child(taskId)
          .update({taskBonus: 1200})
      }
      if (i == teamId && missionIdNum == 1 && ((this.teamsData[i].missions[missionIdNum].task[taskIdNum].questions < 5 ))) {
        firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId).child('task').child(taskId)
          .update({taskBonus: 0})
      }
      if (i == teamId && missionIdNum == 2 && ((this.teamsData[i].missions[missionIdNum].task[taskIdNum].questions < 10 ))) {
        firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId).child('task').child(taskId)
          .update({taskBonus: 0})
      }
      if (i == teamId && missionIdNum == 3 && ((this.teamsData[i].missions[missionIdNum].task[taskIdNum].questions < 10 ))) {
        firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId).child('task').child(taskId)
          .update({taskBonus: 0})
      }
      if (i == teamId && missionIdNum == 4 && ((this.teamsData[i].missions[missionIdNum].task[0].questions < 15 ))) {
        firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId).child('task').child(taskId)
          .update({taskBonus: 0})
      }
    }
  }

  updateQuestions(teamId, missionId, taskId, score, sign){
    let self = this;
    let points: number = 0;
    let signValue: number = +sign
    teamId = teamId.toString();
    missionId = missionId.toString();
    taskId = taskId.toString();
    console.log(teamId + missionId + taskId + score)
    let questionsValue : number = 0;
    //for (let i=0; i<this.teamsData.length; i++){
    let i: number = +teamId
      if (i == teamId){
        questionsValue = this.teamsData[i].questions
      }
    //}
    firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
      .child('task').child(taskId).update({questions: score}).then(() => {
      // let managerId = sessionStorage.getItem("managerId")
      // let managerIdNum: number = +managerId
      // firebase.database().ref('/teams/').orderByChild('managerId').equalTo(managerIdNum).once('value').then( function(snapshot) {
        // firebase.database().ref('/teams/').once('value').then(function(snapshot) {
        // self.teamsData = snapshot.val();
        // console.log(snapshot.val())
        let missionIdNum: number = +missionId
        self.updateTotalQuestions(teamId)
        self.updateTaskBonus(teamId, missionId, taskId)
        self.updateTimeBonus(teamId, missionIdNum, missionId)
        self.updatePoints(teamId)
      // });

    });
    this.getTeam(sessionStorage.getItem("managerId"))


  }

  updateHints(teamId, missionId, taskId, score, sign){
    let self = this;
    let signValue: number = -sign
    teamId = teamId.toString();
    missionId = missionId.toString();
    taskId = taskId.toString();
    console.log(teamId + missionId + taskId + score)
    let hintsValue : number = 0;
    for (let i=0; i<this.teamsData.length; i++){
      if (i == teamId){
        hintsValue = this.teamsData[i].hints
      }
    }
    firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
      .child('task').child(taskId).update({hints: score}).then(() => {
      // let managerId = sessionStorage.getItem("managerId")
      // let managerIdNum: number = +managerId
      //firebase.database().ref('/teams/').orderByChild('managerId').equalTo(managerIdNum).once('value').then( function(snapshot) {
        // firebase.database().ref('/teams/').once('value').then(function(snapshot) {
        // self.teamsData = snapshot.val();
        // console.log(snapshot.val())
        self.updateTotalHints(teamId)
        self.updatePoints(teamId)
      // });

    });
    this.getTeam(sessionStorage.getItem("managerId"))
  }

  updateFirstLightScore(teamId, score){
    let self = this
    let scoreValue: number = +score
    firebase.database().ref('/teams/').child(teamId).child('missions').child('0')
      .child('task').child('0').update({questions: scoreValue}).then(() => {
      let managerId = sessionStorage.getItem("managerId")
      let managerIdNum: number = +managerId
      firebase.database().ref('/teams/').orderByChild('managerId').equalTo(managerIdNum).once('value').then( function(snapshot) {
      // firebase.database().ref('/teams/').once('value').then(function(snapshot) {
        self.teamsData = snapshot.val();
        console.log(snapshot.val())
        self.updatePoints(teamId)
      });

    });

  }

  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      console.log(val, '-');
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  startTimer(teamId, missionId) {
    // let timeInString = this.teamsData[teamId].missions[missionId].startTime
    // let splitted = timeInString.split(":")
    // let minutes: number = + splitted[0]
    // let seconds: number = + splitted[1] + minutes*60
    // console.log("Seconds: ", seconds)
    // this.timeLeft = seconds
    // console.log("TimeLeft: ", this.timeLeft)
    if(missionId == 0){
      this.teamsData[teamId].missions[missionId].timeLeft = 0
    }if(missionId == 1){
      this.teamsData[teamId].missions[missionId].timeLeft = 1800
    }if(missionId == 2){
      this.teamsData[teamId].missions[missionId].timeLeft = 1200
    }if(missionId == 3){
      this.teamsData[teamId].missions[missionId].timeLeft = 1800
    }if(missionId == 4){
      this.teamsData[teamId].missions[missionId].timeLeft = 600
    }if(missionId == 5){
      this.teamsData[teamId].missions[missionId].timeLeft = 0
    }

    this.interval = setInterval(() => {
      if(this.teamsData[teamId].missions[missionId].timeLeft > 0) {
        this.teamsData[teamId].missions[missionId].timeLeft--;
      } else {
        this.teamsData[teamId].missions[missionId].timeLeft = 0;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  createArray(){
    let self = this;
    let dataItem: any = [];
    let tempStr: String;
    this.getTeam(sessionStorage.getItem("managerId"))

    for (let team in this.teamsData){
      let teamItem: String[] = []
      dataItem.push(team);
    }

    self.outputData = dataItem;
    console.log(this.outputData)
  }
  getTeamPoints(teamId){
    let points : number = 0
    // let teamIdValue: number = +teamId
    firebase.database().ref('/teams/').child(teamId).child('points').on('value', function(snapshot) {
      points = snapshot.val()
      console.log("Points : "+points)
    })
    return points
  }
  getTeamQuestions(teamId){
    // let teamIdValue: number = +teamId
    let questions : number = 0
    firebase.database().ref('/teams/').child(teamId).child('questions').on('value', function(snapshot) {
      questions = snapshot.val()
      console.log("Questions : "+questions)

    })
    return questions

  }
  getTeamHints(teamId){
    let hints : number = 0
    // let teamIdValue: number = +teamId
    firebase.database().ref('/teams/').child(teamId).child('hints').on('value', function(snapshot) {
      hints = snapshot.val()
      console.log("Hints : "+hints)
    })
    return hints
  }



}
