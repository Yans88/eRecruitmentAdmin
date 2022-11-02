import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MySessionService} from "../../auth/my-session.service";
import {Injectable} from "@angular/core";
import {MessageService} from "primeng/api";
import {environment} from "../../../environments/environment";

@Injectable()
export class WebSocketAPI {
  webSocketEndPoint: string = environment.webSocketEndPoint;
  topic: string = "/topic/applyJob";
  stompClient: any;


  constructor(private sessionService: MySessionService, private messageService: MessageService) {
  }

  connectWS(): void {
    //console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
        _this.onMessageReceived(sdkEvent);
      });
      _this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
    this.addUser();
  };

  disConnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }


  errorCallBack(error: any) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this.connectWS();
    }, 5000);
  }

  addUser() {
    const name = this.sessionService.getSession()?.name;
    this.stompClient.send("/app/addUser", {}, JSON.stringify({sender: name, type: 'JOIN'}));
  }

  onMessageReceived(payload: any) {
    const message = JSON.parse(payload.body);
    const roleName = this.sessionService.getSession()?.role;
    const userId = this.sessionService.getSession()?.userId;
    if (message.type === "newApplyJob") {
      if ((roleName === "USER" && message.userId === userId) || roleName === "ADMIN") {
        this.messageService.add({
          key: "newApplyJobWS",
          severity: 'success',
          summary: 'New Submission',
          detail: message.title,
          life: 5000,
        });
      }

    }
  }

  clearMessage(): void {
    this.messageService.clear();
  }

}

