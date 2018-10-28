import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  updateUser = null;
  users = {};
  constructor(private router:Router, private apiService:ApiService) {
    this.apiService.newMessage().subscribe(Data => {
      this.ngOnInit();
    });
   }

  ngOnInit() {
    this.apiService.getuser().subscribe(res => {
      this.users = res.json();
      console.log(res.json());
    });
  }

  deleteUser(id){
    if(confirm('Delete user !!') == true){
      this.apiService.deleteuser(id).subscribe(res => {
        this.ngOnInit();
      });
    }
  }

  updateBtn(){
    this.apiService.edituser(this.updateUser._id, this.updateUser).subscribe(res => {
      this.updateUser = null;
      this.ngOnInit();
      console.log(res.json());
    });
  }

  logoutBtn(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
