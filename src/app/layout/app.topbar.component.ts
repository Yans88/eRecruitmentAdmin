import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {MySessionService} from '../auth/my-session.service';
import {LayoutService} from './service/app.layout.service';
import {WebSocketAPI} from "./service/WebSocketAPI";


@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  providers: [WebSocketAPI]
})
export class AppTopBarComponent implements OnInit {
  items!: MenuItem[];
  items2!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    public sessionService: MySessionService,
    public webSocketAPI: WebSocketAPI
  ) {
    this.items2 = [
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logOut(),
      },
    ];
  }

  ngOnInit(): void {
    if (this.sessionService.isUserLogin()) this.webSocketAPI.connectWS();
  }


  logOut(): void {
    this.sessionService.destroySession();
    this.webSocketAPI.disConnect();
    this.router.navigateByUrl('/auth/login');
  }


}
