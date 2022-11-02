export interface ManageDataLoker {
  next: boolean,
  previous: boolean,
  message?: string,
  currentPage: number,
  totalPages: number,
  pageSize: number,
  totalData: number,
  status: string,
  data: IDataLokerModel[]
}

export interface DetailDataLoker {
  message: string,
  status: string,
  data: IDataLokerModel
}

export interface IDataLokerModel {
  idPengajuan: number,
  posisi: string,
  description: string,
  remarkStaff?: string,
  remarkHR?: string,
  numberRequired: number,
  status?: number,
  numberApplicant?: any,
  deadline?: any,
  createdAt: any,
  userId?: number,
  requestName: string,
  listSkill?: number[]
}

export interface AddDataLokerModel {
  posisi?: string,
  description?: string,
  remarkStaff?: string,
  numberRequired?: number,
  listSkill?: number[]
}
