import { Component, OnInit } from '@angular/core'
import * as firebase from "firebase";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.sass']
})
export class ManagerDashboardComponent implements OnInit {
  public teamsData: any = [];
  public outputData: any = [];
  public id: any = [];

  constructor(private route: ActivatedRoute) {
    this.id = route.snapshot.params.id
  }

  ngOnInit(): void {
    // this.getTeam(this.id)
    this.getTeams()
    // this.getTeamPoints(0)
    // this.updateQuestions(this.teamId,this.missionId,this.taskId,this.score)
    // this.createTeam()
    // this.createArray()
    // console.log(this.teamsData)
  }

  createTeam(){
    firebase.database().ref('teams/0').set({
      name: "Alpha",
      managerId: 0,
      questions: 0,
      hints: 0,
      points: 0,
      mission: "",
      missions: [
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
        }

      ]
    });
  }

  getTeam(managerId){
    let self = this;
    let managerIdValue: number = +managerId
    console.log("managerId : " + managerIdValue)
    firebase.database().ref('/teams/').orderByChild('managerId').equalTo(managerIdValue).on('value', function(snapshot) {
      self.teamsData = snapshot.val();
      // self.teamsData1 = snapshot.val();
      console.log(snapshot.val())
    });
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

  updatePoints(teamId, score){
    let points : number = 0;
    let scoreValue : number = 0;
    for (let i=0; i<this.teamsData.length; i++){
      if (i == teamId){
        points = this.teamsData[i].points
        let airCMCTimeBonus = this.teamsData[i].missions[0].timeBonus
        let cornMazeTimeBonus = this.teamsData[i].missions[1].timeBonus
        let portionsMasterTimeBonus = this.teamsData[i].missions[2].timeBonus
        let explorerTimeBonus = this.teamsData[i].missions[3].timeBonus

        points = points+airCMCTimeBonus+cornMazeTimeBonus+portionsMasterTimeBonus+explorerTimeBonus
      }
    }
    // Points for task completed
    // AIR CMC
    // for (let i=0; i<this.teamsData.length; i++){
    //   if (i == teamId){
    //     points = this.teamsData[i].points
    //     if (this.teamsData[i].missions[0].task[0].questions==5){
    //       points = points + 3000
    //     }
    //     if (this.teamsData[i].missions[0].task[1].questions==5){
    //       points = points + 3000
    //     }
    //     if (this.teamsData[i].missions[0].task[2].questions==5){
    //       points = points + 3000
    //     }
    //
    //   }
    // }
    scoreValue =  score
    console.log("existing point: "+points+" New score: "+scoreValue)
    points = points + scoreValue
    firebase.database().ref('/teams/').child(teamId)
      .update({points: points})
  }

  getTeams(){
      let self = this;
      firebase.database().ref('/teams/').once('value').then(function(snapshot) {
        self.teamsData = snapshot.val();
        // self.teamsData1 = snapshot.val();
        console.log(snapshot.val())
      });

  }

  updateTime(teamId, missionId, timeType, timeValue){
    console.log(teamId + missionId + timeType + timeValue)
    let missionIdNum: number = +missionId
    teamId = teamId.toString();
    missionId = missionId.toString();
    timeType = timeType.toString();
    timeValue = timeValue.toString();
    let self = this;

    if(timeType == "startTime"){
      firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
        .update({startTime: timeValue})
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

    // this.getTeams();

    // Bonus points

    // this.updateTimeBonus(teamId, missionIdNum, missionId)



  }

  updateTimeBonus(teamId, missionIdNum: number, missionId) {
    for (let i = 0; i < this.teamsData.length; i++) {
      if (i == teamId) {
        if (this.teamsData[i].missions[missionIdNum].endTime && this.teamsData[i].missions[missionIdNum].startTime) {
          let timeBonus: number
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

          timeBonus = endTimeMin - startTimeMin
          console.log("Time Difference: " + timeBonus)
          firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
            .update({timeBonus: timeBonus * 150})
        }
      }
    }
  }


  updateQuestions(teamId, missionId, taskId, score, sign){
    let points: number = 0;
    let signValue: number = +sign
    if(missionId == 0){
      points = 2000*signValue
      this.updatePoints(teamId, points)
    }
    if(missionId == 1){
      points = 200*signValue
      this.updatePoints(teamId, points)
    }
    if(missionId == 2){
      points = 1000*signValue
      this.updatePoints(teamId, points)
    }
    if(missionId == 3){
      points = 800*signValue
      this.updatePoints(teamId, points)
    }
    teamId = teamId.toString();
    missionId = missionId.toString();
    taskId = taskId.toString();
    console.log(teamId + missionId + taskId + score)
    // let questionObj = this.teamsData.filter(x => x.)
    let questionsValue : number = 0;
    for (let i=0; i<this.teamsData.length; i++){
      if (i == teamId){
        questionsValue = this.teamsData[i].questions
      }
    }
    firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
      .child('task').child(taskId).update({questions: score})
    firebase.database().ref('/teams/').child(teamId)
      .update({questions: questionsValue + signValue})
    this.getTeams();
  }

  updateHints(teamId, missionId, taskId, score, sign){
    let hints: number = 0;
    let signValue: number = -sign
    if(missionId == 0){
      hints = 500*signValue
      this.updatePoints(teamId, hints)
    }
    if(missionId == 1){
      // hints = 0
      // this.updatePoints(teamId, hints)
    }
    if(missionId == 2){
      hints = 250*signValue
      this.updatePoints(teamId, hints)
    }
    if(missionId == 3){
      // hints = 0
      // this.updatePoints(teamId, hints)
    }
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
      .update({hints: hintsValue + signValue})
    this.getTeams();
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
