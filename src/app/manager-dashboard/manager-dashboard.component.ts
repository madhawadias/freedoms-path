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
    this.getTeam(this.id)
    // this.updateQuestions(this.teamId,this.missionId,this.taskId,this.score)
    // this.createTeam()
    // this.createArray()
    // console.log(this.teamsData)
  }

  createTeam(){
    firebase.database().ref('teams/1').set({
      name: "Beta",
      questions: 12,
      hints: 7,
      points: 444,
      mission: "",
      missions: [
        {
          name: "Air CMC",
          startTime: 0,
          endTime: 0,
          timeLeft: 0,
          task: [
            {
              questions: 7,
              hints: 3,
              name: "task1",
            },
            {
              questions: 6,
              hints: 1,
              name: "task2",
            },
            {
              questions: 8,
              hints: 1,
              name: "task3",
            }
          ]
        },
        {
          name: "Corn Maze",
          startTime: 0,
          endTime: 0,
          timeLeft: 0,
          task: [
            {
              questions: 4,
              hints: 0,
              name: "task1",
            },
            {
              questions: 3,
              hints: 0,
              name: "task2",
            },
            {
              questions: 6,
              hints: 0,
              name: "task3",
            }
          ]
        },
        {
          name: "Portions Master",
          startTime: 0,
          endTime: 0,
          timeLeft: 0,
          task: [
            {
              questions: 4,
              hints: 0,
              name: "task1",
            },
            {
              questions: 7,
              hints: 3,
              name: "task2",
            },
            {
              questions: 3,
              hints: 1,
              name: "task3",
            }
          ]
        },
        {
          name: "Explorer",
          startTime: 0,
          endTime: 0,
          timeLeft: 0,
          task: [
            {
              questions: 7,
              hints: 2,
              name: "task1",
            },
            {
              questions: 0,
              hints: 0,
              name: "task2",
            },
            {
              questions: 0,
              hints: 0,
              name: "task3",
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

  getTeams(){
    console.log("id: " + this.id)
    let self = this;
    firebase.database().ref('/teams/').once('value').then(function(snapshot) {
      self.teamsData = snapshot.val();
      // self.teamsData1 = snapshot.val();
      console.log(snapshot.val())
    });
  }

  updateTime(teamId, missionId, timeType, timeValue){
    console.log(teamId + missionId + timeType + timeValue)
    teamId = teamId.toString();
    missionId = missionId.toString();
    timeType = timeType.toString();
    timeValue = timeValue.toString();

    if(timeType == "startTime"){
      firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
        .update({startTime: timeValue})
    }
    if(timeType == "endTime"){
      firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
        .update({endTime: timeValue})
    }
    if(timeType == "timeLeft"){
      firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
        .update({timeLeft: timeValue})
    }

    this.getTeams();
  }

  updateQuestions(teamId, missionId, taskId, score){
    teamId = teamId.toString();
    missionId = missionId.toString();
    taskId = taskId.toString();
    console.log(teamId + missionId + taskId + score)
    firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
      .child('task').child(taskId).update({questions: score})
    this.getTeams();
  }

  updateHints(teamId, missionId, taskId, score){
    teamId = teamId.toString();
    missionId = missionId.toString();
    taskId = taskId.toString();
    console.log(teamId + missionId + taskId + score)
    firebase.database().ref('/teams/').child(teamId).child('missions').child(missionId)
      .child('task').child(taskId).update({hints: score})
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
