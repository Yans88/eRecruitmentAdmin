import {TagSkillPipe} from './tag-skill.pipe';

describe('TagSkillPipe', () => {
  const pipe = new TagSkillPipe();
  let listSkill = [{
    skillId: 1,
    skillName: "JAVA"
  }, {
    skillId: 1,
    skillName: "HTML"
  }];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms Value 1 to Badge', () => {
    let result = '';
    for (let i = 0; i < listSkill!.length; i++) {
      result += `<label class="p-chip p-chip-text mr-2 pt-1 pb-1 line-height-4">${listSkill![i].skillName}</label>`;
    }
    expect(pipe.transform(listSkill)).toBe(result);
  });
});
