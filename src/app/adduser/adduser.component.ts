import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  addForm:FormGroup;
  constructor(private apiService:ApiService) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      name : new FormControl('', [Validators.required]),
      lastname : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.email, Validators.required]),
      password : new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }
  userBtn(){
   if(this.addForm.valid){
     this.apiService.registerApi(this.addForm.value).subscribe(res => {
       console.log(res.json());
     });
   }
  }

}
