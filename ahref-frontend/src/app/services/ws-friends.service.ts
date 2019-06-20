import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject} from 'rxjs';
import {User} from '../shared/sdk/models';

@Injectable({
  providedIn: 'root'
})
export class WsFriendsService {

  private ws_state = new BehaviorSubject<string>('');
  current_ws_state = this.ws_state.asObservable();
  public connection;

  constructor(private toastr: ToastrService) { }

  changeWsState(i: string) {
    this.ws_state.next(i);
  }
  connect(id: string) {
    this.connection = new WebSocket('ws://localhost:1338');
    this.connection.onopen = () => {
      console.log('Successfully connected to websocket server');
      this.connection.send(JSON.stringify({purpose: 'onlogin', data: id}));
    };
    this.connection.onerror = (err) => {
      console.log('Failed to connect to websocket server');
    };
    let js;
    this.connection.onmessage =  (message) => {
      try {
        js = JSON.parse(message.data);
      } catch (e) {
        console.log('Invalid JSON: ', message.data);
        return;
      }
      if (js.type === 'message') {

        this.changeWsState(js.data);
        this.toastr.success('You have a received a friend request.', 'Notification');
      }
    };


  }

  disconnect() {
    if (this.connection) {
    this.connection.send(JSON.stringify({purpose: 'onlogout', data: ''}));
    }
  }

  sendMessage(id: string) {
    if (this.connection) {
      this.connection.send(JSON.stringify({purpose: 'message', data: id}));
    }
  }
}
