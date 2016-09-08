import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the TimetablePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/timetable/timetable.html',
})
export class TimetablePage {
segment='MONDAY';
tempdata=[];
  constructor(private navCtrl: NavController) {

  }
  updateTimeTable(){
   if(this.segment==="MONDAY")
   {this.tempdata= this.data.MONDAY
     
  }
}
 data= 
    {
        
            "MONDAY": [
                {
                    "start": "8:30",
                    "end": "9:15",
                    "subject": "subject1",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "9:15",
                    "end": "10:15",
                    "subject": "subject2",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "10:30",
                    "end": "11:15",
                    "subject": "subject3",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "11:15",
                    "end": "12:15",
                    "subject": "subject4",
                    "subjectcode": "XC9100"
                },{
                    "start": "12:30",
                    "end": "1:15",
                    "subject": "lauch",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "1:15",
                    "end": "2:15",
                    "subject": "subject5",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "2:15",
                    "end": "3:15",
                    "subject": "subject6",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "3:15",
                    "end": "4:15",
                    "subject": "subject7",
                    "subjectcode": "XC9100"
                }
            ]
        ,
            "TUESDAY": [
                {
                    "start": "8:30",
                    "end": "9:15",
                    "subject": "subject1",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "9:15",
                    "end": "10:15",
                    "subject": "subject2",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "10:30",
                    "end": "11:15",
                    "subject": "subject3",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "11:15",
                    "end": "12:15",
                    "subject": "subject4",
                    "subjectcode": "XC9100"
                },{
                    "start": "12:30",
                    "end": "1:15",
                    "subject": "lauch",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "1:15",
                    "end": "2:15",
                    "subject": "subject5",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "2:15",
                    "end": "3:15",
                    "subject": "subject6",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "3:15",
                    "end": "4:15",
                    "subject": "subject7",
                    "subjectcode": "XC9100"
                }
            ]
        ,
            "WEDNESDAY": [
                {
                    "start": "8:30",
                    "end": "9:15",
                    "subject": "subject1",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "9:15",
                    "end": "10:15",
                    "subject": "subject2",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "10:30",
                    "end": "11:15",
                    "subject": "subject3",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "11:15",
                    "end": "12:15",
                    "subject": "subject4",
                    "subjectcode": "XC9100"
                },{
                    "start": "12:30",
                    "end": "1:15",
                    "subject": "lauch",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "1:15",
                    "end": "2:15",
                    "subject": "subject5",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "2:15",
                    "end": "3:15",
                    "subject": "subject6",
                    "subjectcode": "XC9100"
                },
                {
                    "start": "3:15",
                    "end": "4:15",
                    "subject": "subject7",
                    "subjectcode": "XC9100"
                }
            ]
        }
    



}
