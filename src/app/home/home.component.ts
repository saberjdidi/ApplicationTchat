import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ChatService } from '../chat.service';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  addForm : FormGroup
  user = {};
  username='';
  city='';
  messageArray:Array<{username:String, message:String}> = [];

  constructor(private router:Router, private apiService:ApiService, private chatservice:ChatService) {
    this.chatservice.newUserJoined().subscribe(data => this.messageArray.push(data));

    //this.chatservice.newArticle().subscribe(Data => {
     // this.ngOnInit();
    //})
   }

  ngOnInit() {

    this.apiService.getuser().subscribe(res => {
      this.user = res.json();
      console.log(res.json());
    })

    
  }

  join(){
    this.chatservice.joinCity({username:this.username, city:this.city})
  }

}
