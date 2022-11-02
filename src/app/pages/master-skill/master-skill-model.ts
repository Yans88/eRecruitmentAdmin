export interface MasterDataModel {
  next: boolean,
  previous: boolean,
  message?: string,
  currentPage: number,
  totalPages: number,
  pageSize: number,
  totalData: number,
  status: string,
  data: IDataSkillModel[]
}

export interface IDataSkillModel {
  skillId?: number,
  skillName?: string
}


