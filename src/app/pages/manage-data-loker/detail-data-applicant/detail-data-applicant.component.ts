import {Component, Input, OnInit} from '@angular/core';
import {ManageApplicantServiceService} from "../manage-applicant-service.service";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail-data-applicant',
  templateUrl: './detail-data-applicant.component.html',
  styleUrls: ['./detail-data-applicant.component.scss']
})
export class DetailDataApplicantComponent implements OnInit {
  @Input("data") data: any;
  age !: number;
  isLoading!: boolean;
  buttonItems!: any;
  id !: number;

  payload !: any

  private unsubcribe$ = new Subject();

  constructor(private applicantService: ManageApplicantServiceService,
              /*public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              private router: Router,*/
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    //this.data = null
    this.getDetailApplicant(this.applicantService.submissionId);
    this.data = this.applicantService.data;
    //this.data = this.applicantService.data;

    this.buttonItems = [
      {
        label: 'Short listed', icon: 'pi pi-briefcase', command: () => {
          this.update("SHORTLISTED");
        }
      },
      {
        label: 'Assessment', icon: 'pi pi-file-import', command: () => {
          this.update("ASSESSMENT");
        }
      },
      {
        label: 'Interview', icon: 'pi pi-users', command: () => {
          this.update("INTERVIEW");
        }
      },
      {separator: true},
      {
        label: 'Done', icon: 'pi pi-check', command: () => {
          this.update("DONE");
        }
      },
    ];
  }

  reject() {
    this.update("UNSUITABLE")
  }

  update(status: string) {
    this.payload = {'status': status};
    console.log(this.payload);
    this.applicantService.updateStatusDataApplicantDetail(this.applicantService.submissionId, this.payload).subscribe((res) => {
      console.log(res);
      const id = parseInt(<string>this.activatedRoute.snapshot.paramMap.get('id'));
      window.location.reload();
    })

  }

  getDetailApplicant(submissionId: number) {
    this.isLoading = true;
    setTimeout(() => {
      this.applicantService.getDataApplicantDetail(submissionId).pipe(takeUntil(this.unsubcribe$)).subscribe((res) => {
        this.data = res.data;
        this.isLoading = false;
        if (this.data.dob) {
          const convertAge = new Date(this.data.dob);
          const timeDiff = Math.abs(Date.now() - convertAge.getTime());
          this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
        } else {
          this.age = 0;
        }
        console.log(res);
      }, ((err: Error) => {
        console.log(err);
        this.isLoading = false;
      }))
    });
  }


}
