import { Component, OnInit } from '@angular/core';
import { Test } from './test';
import { Observable } from 'rxjs/Rx';
import { TestService } from './test.service';
// import { DropdownComponent } from './dropdown.component';


@Component({
    // moduleId: module.id,
    selector: 'my-tester',
    templateUrl: '/trash/test.component.html',
    providers: [TestService]
})

export class TestComponent implements OnInit {

    teams = ["ALL", "team1", "team2", "team3", "team4"];
    Test1: Test[];//Observable<Test[]>;
    selectedteamid: string = "ALL";
    temp: Test[];

    constructor(private Testservice: TestService) {

    };

    get_test() {
        this.Testservice.gettest().subscribe((quality) => this.temp = quality);


    }


    ngOnInit() {
        this.get_test();
        // this.myfilter(this.temp);
        // console.log("tempvalue:",this.temp);
        // this.myfilter(this.Test1);

    }
    onchange(selectedteamid) {
        this.selectedteamid = selectedteamid;
        console.log(this.selectedteamid);
        this.myfilter(this.temp);
        this.fuc(this.Test1);
        return selectedteamid;

    }

    myfilter(temp) {
        return this.Test1 = temp.filter((item) => item.team_id == this.selectedteamid);

    }
    fuc(Test1) {
        console.log(JSON.stringify(Test1));
    }

}



