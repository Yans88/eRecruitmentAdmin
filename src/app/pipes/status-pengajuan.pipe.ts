import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'statusPengajuan'
})
export class StatusPengajuanPipe implements PipeTransform {

  transform(value?: number): any {
    if (value === 1) {
      return '<span class="p-badge p-badge-warning">New</span>';
    } else if (value === 2) {
      return '<span class="p-badge p-badge-danger">Reject</span>';
    } else if (value === 3) {
      return '<span class="p-badge p-badge-success">Posted</span>';
    } else {
      return '<span class="p-badge p-badge-info">Closed</span>';
    }

  }

}
