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
    let numValue: number = 9
    let teamValue = numValue + 1
    let team: string = teamValue.toString()
    let num: string = numValue.toString()
    firebase.database().ref('teams/'+num).set({
      name: "Team "+team,
      managerId: 0,
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
        console.log(snapshot.val())
      });
    }

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


  updatePoints(teamId){
    let self = this;
    let points : number = 0;
    let scoreValue : number = 0;
    // this.getTeams()
    firebase.database().ref('/teams/').once('value').then(function(snapshot) {
      self.teamsData = snapshot.val();
      console.log(snapshot.val())
    }).then(() => {
      for (let i=0; i<this.teamsData.length; i++){
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

          points = firstLightPoints+airCMCTask0points+airCMCTask1points+airCMCTask2points
            +cornMazeTask0Points+cornMazeTask1Points+cornMazeTask2Points
            +portionsMasterTask0Points+portionsMasterTask1Points+portionsMasterTask2Points
            +explorerTask0Points
            +airCMCTimeBonus+cornMazeTimeBonus+portionsMasterTimeBonus+explorerTimeBonus
            +airCMCTask0Bonus+airCMCTask1Bonus+airCMCTask2Bonus
            +cornMazeTask0Bonus+cornMazeTask1Bonus+cornMazeTask2Bonus
            +portionsMasterTask0Bonus+portionsMasterTask1Bonus+portionsMasterTask2Bonus
            +explorerTask0Bonus
            -airCMCTask0Hints-airCMCTask1Hints-airCMCTask2Hints
            -portionsMasterTask0Hints-portionsMasterTask1Hints-portionsMasterTask2Hints

        }
      }

      // scoreValue =  score
      console.log("existing point: "+points+" New score: "+scoreValue)
      // points = points + scoreValue
      firebase.database().ref('/teams/').child(teamId)
        .update({points: points}).then(() => {
        firebase.database().ref('/teams/').once('value').then(function(snapshot) {
          self.teamsData = snapshot.val();
          console.log(snapshot.val())
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
    console.log(teamId + missionId + timeType + timeValue)
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
        console.log("working")
        firebase.database().ref('/teams/').once('value').then(function(snapshot) {
          self.teamsData = snapshot.val();
          // self.teamsData1 = snapshot.val();
          console.log(snapshot.val())
          // self.updateTimeBonus(teamId, missionIdNum, missionId)
        });
      })
      firebase.database().ref('/teams/').child(teamId)
        .update({mission: this.teamsData[teamIdNum].missions[missionIdNum].name})
    }
    if(timeType == "endTime"){
      firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
        .update({endTime: timeValue}).then(() => {
          console.log("working")
        firebase.database().ref('/teams/').once('value').then(function(snapshot) {
          self.teamsData = snapshot.val();
          // self.teamsData1 = snapshot.val();
          console.log(snapshot.val())
          self.updateTimeBonus(teamId, missionIdNum, missionId)
        });


        })
    }
    if(timeType == "timeLeft"){
      firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
        .update({timeLeft: timeValue})
    }

  }

  updateTimeBonus(teamId, missionIdNum: number, missionId) {

    for (let i = 0; i < this.teamsData.length; i++) {
      // Checks whether all questions are answered
      if (i == teamId && ((this.teamsData[i].missions[1].task[0].questions == 5 && this.teamsData[i].missions[1].task[1].questions == 5 && this.teamsData[i].missions[1].task[0].questions == 5)
        || (this.teamsData[i].missions[2].task[0].questions == 10 && this.teamsData[i].missions[2].task[1].questions == 10 && this.teamsData[i].missions[2].task[0].questions == 10)
        || (this.teamsData[i].missions[3].task[0].questions == 10 && this.teamsData[i].missions[3].task[1].questions == 10 && this.teamsData[i].missions[3].task[0].questions == 10)
        || (this.teamsData[i].missions[4].task[0].questions == 15))) {

        if (this.teamsData[i].missions[missionIdNum].endTime && this.teamsData[i].missions[missionIdNum].startTime) {
          let timeDifference: number = 0
          let extraMins: number = 0
          let endTime: string = this.teamsData[i].missions[missionIdNum].endTime
          let endTimeSplit = endTime.split(':')
          let endTimeHours: number = +endTimeSplit[0]
          let endTimeMin: number = +endTimeSplit[1]
          endTimeMin = endTimeHours * 60 + endTimeMin

          let startTime: string = this.teamsData[i].missions[missionIdNum].startTime
          let startTimeSplit = startTime.split(':')
          let startTimeHours: number = +startTimeSplit[0]
          let startTimeMin: number = +startTimeSplit[1]
          startTimeMin = startTimeHours * 60 + startTimeMin

          timeDifference = endTimeMin - startTimeMin
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
      }
    }
  }

  updateTaskBonus(teamId, missionId, taskId){
    let self = this;
    let missionIdNum: number = +missionId
    let taskIdNum: number = +taskId
    for(let i = 0; i < this.teamsData.length; i++){
      if (i == teamId && missionIdNum == 1 && ((this.teamsData[i].missions[missionIdNum].task[taskIdNum].questions == 5 ))) {
        firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId).child('task').child(taskId)
          .update({taskBonus: 3000}).then(() => {
          firebase.database().ref('/teams/').once('value').then(function(snapshot) {
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
    // if(missionId == 0){
    //   points = 2000*signValue
    //   // this.updatePoints(teamId, points)
    // }
    // if(missionId == 1){
    //   points = 200*signValue
    //   // this.updatePoints(teamId, points)
    // }
    // if(missionId == 2){
    //   points = 1000*signValue
    //   // this.updatePoints(teamId, points)
    // }
    // if(missionId == 3){
    //   points = 800*signValue
    //   // this.updatePoints(teamId, points)
    // }
    teamId = teamId.toString();
    missionId = missionId.toString();
    taskId = taskId.toString();
    console.log(teamId + missionId + taskId + score)
    let questionsValue : number = 0;
    for (let i=0; i<this.teamsData.length; i++){
      if (i == teamId){
        questionsValue = this.teamsData[i].questions
      }
    }
    firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
      .child('task').child(taskId).update({questions: score})
    firebase.database().ref('/teams/').child(teamId)
      .update({questions: questionsValue + signValue}).then(() => {
      firebase.database().ref('/teams/').once('value').then(function(snapshot) {
        self.teamsData = snapshot.val();
        console.log(snapshot.val())
        self.updateTaskBonus(teamId, missionId, taskId)
        self.updatePoints(teamId)
      });

    });
    this.getTeams();


  }

  updateHints(teamId, missionId, taskId, score, sign){
    let self = this;
    let signValue: number = -sign
    // if(missionId == 1){
    //   hints = 500*signValue
    //   this.updatePoints(teamId)
    // }
    // if(missionId == 2){
    //   // hints = 0
    //   // this.updatePoints(teamId, hints)
    // }
    // if(missionId == 3){
    //   hints = 250*signValue
    //   this.updatePoints(teamId)
    // }
    // if(missionId == 4){
    //   // hints = 0
    //   // this.updatePoints(teamId, hints)
    // }
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
      .child('task').child(taskId).update({hints: score})
    firebase.database().ref('/teams/').child(teamId)
      .update({hints: hintsValue - signValue}).then(() => {
      firebase.database().ref('/teams/').once('value').then(function(snapshot) {
        self.teamsData = snapshot.val();
        console.log(snapshot.val())
        self.updatePoints(teamId)
      });

    });
    this.getTeams();
  }

  updateFirstLightScore(teamId, score){
    let self = this
    let scoreValue: number = +score
    firebase.database().ref('/teams/').child(teamId).child('missions').child('0')
      .child('task').child('0').update({questions: scoreValue}).then(() => {
      firebase.database().ref('/teams/').once('value').then(function(snapshot) {
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
    self.getTeams()

    for (let team in this.teamsData){
      let teamItem: String[] = []
      dataItem.push(team);
    }

    self.outputData = dataItem;
    console.log(this.outputData)
  }

}
