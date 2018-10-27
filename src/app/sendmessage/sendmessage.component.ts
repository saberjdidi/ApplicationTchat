import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators  } from '@angular/forms';

@Component({
  selector: 'app-sendmessage',
  templateUrl: './sendmessage.component.html',
  styleUrls: ['./sendmessage.component.css']
})
export class SendmessageComponent implements OnInit {
  addForm:FormGroup;
  user = {};
  users= {};
  userId = {};
  constructor(private router:Router, private apiService:ApiService) { 
 

    this.apiService.newMessage().subscribe(Data => {
      this.ngOnInit();
    });
   
  }

  ngOnInit() {
    
    this.addForm = new FormGroup({
     //author: new FormControl(''),
     //username: new FormControl(''),
     message: new FormControl(''),
     city: new FormControl(''),
      
    });

    this.apiService.getmessage().subscribe(res => {
      this.user = res.json();
    });

    this.apiService.getuser().subscribe(res => {
      this.users = res.json();
      console.log(res.json());
    });

    const token = localStorage.getItem('token');
    let Data = jwt_decode(token).data;
    this.userId = Data
  }

  sendmessage(){
    if(this.addForm.valid){
     
      const token = localStorage.getItem('token');
      const firstname = jwt_decode(token).data;
      const object = {
           "message" : this.addForm.value.message,
           "city" : this.addForm.value.city,
           //"username" : this.addForm.value.username,
           "author": firstname
      }
     
      this.apiService.postmessage(object).subscribe(res => {
        this.ngOnInit();
        console.log(res.json());
      });
    }
  }

  deleteBtn(id){
    if(confirm('are you sure to delete this message') == true){
      this.apiService.deletemessage(id).subscribe(res => {
        this.ngOnInit();
        console.log(res.json());
      });
    }
  }

  logoutBtn() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
