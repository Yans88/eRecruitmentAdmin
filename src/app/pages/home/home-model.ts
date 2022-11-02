export interface MasterHomeModel {
  message?: string,
  status: string,
  data: DataHomeModel
}

export interface DataHomeModel {
  totalApplied?: number,
  totalJobPosting?: number
  totalJobRequest?: number
  totalNewJobRequest?: number
}



