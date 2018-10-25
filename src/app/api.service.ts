import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Socket} from 'ngx-socket-io'; //importer socket

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:Http, private socket:Socket) { }

  loginApi(form){
    return this.http.post('http://localhost:3000/user/login', form)
  }
  registerApi(form){
    return this.http.post('http://localhost:3000/user/register', form)
  }

  postuser(form){
    return this.http.post('http://localhost:3000/user/users', form)
  }
  getuser(){
    return this.http.get('http://localhost:3000/user/users')
  }
  deleteuser(id){
    return this.http.delete('http://localhost:3000/user/users/' + id)
  }
  edituser(id, user){
    return this.http.put('http://localhost:3000/user/users/' + id, user)
  }

  postmessage(form){
    return this.http.post('http://localhost:3000/user/message', form)
  }
  getmessage(){
    return this.http.get('http://localhost:3000/user/message')
  }

  newMessage(){
    return this.socket
         .fromEvent('newmessage')
  
  }
}
