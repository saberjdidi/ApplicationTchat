import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  addForm : FormGroup
  user = {};

  constructor(private router:Router, private apiService:ApiService) { }

  ngOnInit() {

    this.apiService.getuser().subscribe(res => {
      this.user = res.json();
      console.log(res.json());
    })
  }

}
