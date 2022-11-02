import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {ChartModule} from "primeng/chart";
import {CarouselModule} from "primeng/carousel";
import {GalleriaModule} from "primeng/galleria";
import {SkeletonModule} from "primeng/skeleton";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ChartModule,
    CarouselModule,
    GalleriaModule,
    SkeletonModule
  ]
})
export class HomeModule {
}
