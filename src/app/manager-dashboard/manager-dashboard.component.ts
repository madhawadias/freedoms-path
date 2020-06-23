import { Component, OnInit } from '@angular/core'
import * as firebase from "firebase";

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.sass']
})
export class ManagerDashboardComponent implements OnInit {
  public teamsData: any = [];
  public outputData: any = [];
  // private teamId: String = '0';
  // private missionId: String = '0';
  // private taskId: String = '0';
  // private score: Number = 15;

  constructor() { }

  ngOnInit(): void {
    this.getTeams()
    // this.updateQuestions(this.teamId,this.missionId,this.taskId,this.score)
    // this.createTeam()
    // this.createArray()
    // console.log(this.teamsData)
  }

  createTeam(){
    firebase.database().ref('teams/2').set({
      name: "Alpha",
      questions: 12,
      hints: 7,
      points: 444,
      mission: "",
      missions: [
        {
          name: "Air CMC",
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

  addHints(teamName){
    firebase.database().ref('team/alpha').set({
      hints: 7,
      points: 444
    });
  }

  getTeam(child){
    let self = this;
    let childFilter = child.toLowerCase()
    firebase.database().ref('/teams/').orderByChild('name').equalTo(childFilter).once('value').then(function(snapshot) {
      self.teamsData = snapshot.val();
      console.log(snapshot.val())
    });
  }

  getTeams(){
    let self = this;
    firebase.database().ref('/teams/').once('value').then(function(snapshot) {
      self.teamsData = snapshot.val();
      // self.teamsData1 = snapshot.val();
      console.log(snapshot.val())
    });
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
