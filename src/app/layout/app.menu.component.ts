import {Component, OnInit} from '@angular/core';
import {LayoutService} from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
    this.model = [
      {
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/page'],
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: [''],
          },
          {
            label: 'Data Skill',
            icon: 'pi pi-align-justify',
            routerLink: ['/master-skill'],
          },
          {
            label: 'Data Pengajuan', icon: 'pi pi-fw pi-chart-bar',
            items: [
              {
                label: 'New', icon: 'pi pi-fw pi-chart-line',
                routerLink: ['/data-pengajuan'],
              },
              {
                label: 'Posted', icon: 'pi pi-fw pi-check-circle',
                routerLink: ['/data-pengajuan/posted'],
              },
              {
                label: 'Ditolak', icon: 'pi pi-fw pi-times',
                routerLink: ['/data-pengajuan/reject'],
              },
              {
                label: 'Closed', icon: 'pi pi-fw pi-exclamation-circle',
                routerLink: ['/data-pengajuan/closed'],
              }
            ]
          },
        ],
      },
    ];

  }
}
