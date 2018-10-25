import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import {Socket} from 'ngx-socket-io'; //importer socket

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  //private socket = io('http://localhost:3000')

  constructor(private http:Http, private socket:Socket) { }

  joinCity(data){
    this.socket.emit('join', data);
  }

  newUserJoined(){
    let observable = new Observable<{username:String, message:String}>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });
    return observable;
    
  }

  newmessage(){
    return this.socket
         .fromEvent('newmessage')
  
  }
}
