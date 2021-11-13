import { Component, OnInit } from '@angular/core';
import { ManageTestService } from '../manage-test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // test =  {}
  tests:any = []
  testName:any = []
  constructor(private _test : ManageTestService) { }

  ngOnInit(): void {
    this._test.getList().subscribe(
      
      (result) => {console.warn(result)
        this.tests = result
       this.testName = this.tests.tests
      //  console.log(this.testName)
    })
  }

 
}
