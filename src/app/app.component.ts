import {Component} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menuMode = 'static';
  title = 'eRecruitmentAdmin';

  constructor(private primengConfig: PrimeNGConfig) {
  }

  ngOnInit(appComponent: AppComponent) {
    this.primengConfig.ripple = true;
  }


}
