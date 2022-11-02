import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'tagSkill'
})
export class TagSkillPipe implements PipeTransform {

  transform(values?: any[]) {
    let result = '';
    for (let i = 0; i < values!.length; i++) {
      result += `<label class="p-chip p-chip-text mr-2 pt-1 pb-1 line-height-4">${values![i].skillName}</label>`;
    }
    return result;
  }


}
