import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {HomeService} from "./home.service";
import {DataHomeModel, MasterHomeModel} from "./home-model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items!: DataHomeModel;
  images!: any[];
  isLoading: boolean = true;
  private unsubcribe$ = new Subject();
  carouselResponsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(private homeService: HomeService) {

  }


  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    setTimeout(() => {
      this.homeService.getData().pipe(takeUntil(this.unsubcribe$)).subscribe((res: MasterHomeModel) => {
          this.items = res.data;
          this.images = [
            {
              img: "assets/images/gallery/gallery-4.jpeg",
              title: "Our Office",
            },
            {
              img: "assets/images/gallery/gallery-2.jpeg",
              title: "Work Hard Anywhere",
            },
            {
              img: "assets/images/gallery/gallery-5.jpeg",
              title: "Meeting room",
            },
            {
              img: "assets/images/gallery/gallery-3.jpeg",
              title: "Our Workspace"
            },
            {
              img: "assets/images/gallery/gallery-1.jpeg",
              title: "WFH - Work Hard Anywhere",
            }
          ]
          this.isLoading = false;
        }, ((err: Error) => {
          console.log(err);
          this.isLoading = false;
        })
      );
    }, 1000);

  }


}
