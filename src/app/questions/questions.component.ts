import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageTestService } from '../manage-test.service';
import { Selected } from '../selected';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  tests: any = []
  testName: any = []
  questions: any = []
  item: any = []
  options: any = []
  correctOption: any = []
  savedOption:any = []
  availableQues: any = []
  isSelect = false
  name = ""
  type = ""
  fetched:any = []
  testId = ""

  selected:Selected[] = []
  id = this.route.snapshot.params.id

  // radio = document.getElementsByClassName('.radio') 
  constructor(private _test: ManageTestService, private route: ActivatedRoute, private _router: Router) { }




  ngOnInit(): void {
    
  
    this._test.getList().subscribe(

      (result) => {
        console.warn(result)
        this.tests = result
        this.testName = this.tests.tests


        for (let i = 0; i < this.testName.length; i++) {
          if (this.testName[i]._id === this.id) {
            this.questions = this.testName[i].questions
            this.availableQues = [... this.questions]
            
            this.name = this.testName[i].name
            this.item = this.availableQues[i]

            this.options = this.item.options
            this.type = this.item.type
            this.correctOption = this.item.correctOptionIndex
            
          }
         
        }
        localStorage.setItem("availableQues", JSON.stringify(this.availableQues))
      })
  }

  nextQuestion() {
    console.log(this.savedOption)
    //  this.selected = JSON.parse(localStorage.getItem('selected')!) 
    this.availableQues = JSON.parse(localStorage.getItem('availableQues')!)
    this.selected.push({
      id : this.item._id,
      questionText : this.item.questionText,
      seloption : this.savedOption,
      options : this.item.options,
      correctOption: this.item.correctOptionIndex,
      type : this.type
    })
    
    localStorage.setItem("selected", JSON.stringify(this.selected))

    if(this.availableQues.length > 0){
      
      console.log(this.availableQues)
      for (let i = 0; i < this.availableQues.length; i++) {
        console.log(this.availableQues[i])
      
          this.item = this.availableQues[i]

          this.options = this.item.options
          this.type = this.item.type
          this.correctOption = this.item.correctOptionIndex
          
       
      }
      
    }
    this.availableQues.pop()
    localStorage.setItem("availableQues", JSON.stringify(this.availableQues))
    
    console.log(this.selected )
  }

  previousQuestion() {
    this.selected = JSON.parse(localStorage.getItem('selected')!)
    this.availableQues = JSON.parse(localStorage.getItem('availableQues')!)
    this.availableQues.push(this.item)
    console.log(this.selected)
    this.selected.pop()
    console.log(this.selected)
    
    localStorage.setItem("selected", JSON.stringify(this.selected))
    // console.log(this.selected)
     for(let i=0; i<this.selected.length; i++)
     {

      this.item = this.selected[i]
      // console.log(this.item)
      this.options = this.selected[i].options
      this.fetched = this.selected[i].seloption
      console.log(this.fetched)
    }
    // this.availableQues.push(this.item)
    //   this.selected.pop()
    localStorage.setItem("availableQues", JSON.stringify(this.availableQues))
  }



  arrayRemove(arr: any, value: any) {

    return arr.filter(function (ele: any) {
      return ele != value;
    });
  }

  onSelect(e: any) {
    
      // 
    if(this.item.type === "Multiple-Response")
    {
      if(e.target.checked){
        this.savedOption.push(e.target.id)
        
      }
     else{
       this.savedOption.pop()
     }
    }
   else{
    
      this.savedOption = e.target.id
    
   
   }
   
  }

  onFinish(){
    this.selected = JSON.parse(localStorage.getItem('selected')!)
    console.log(this.selected)

    this.selected.push({
      id : this.item._id,
      questionText : this.item.questionText,
      seloption : this.savedOption,
      options : this.item.options,
      correctOption: this.item.correctOptionIndex,
      type : this.type
    })
    
    localStorage.setItem("selected", JSON.stringify(this.selected))
  }

}
