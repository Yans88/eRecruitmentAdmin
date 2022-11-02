export interface ManageDataApplicant {
  next: boolean,
  previous: boolean,
  message?: string,
  currentPage: number,
  totalPages: number,
  pageSize: number,
  totalData: number,
  status: string,
  data: IDataApplicant[]
}

export interface DetailDataApplicant {
  message: string,
  status: string,
  data?: IDataDetailApplicant
}

export interface IDataApplicant {
  appliedAt: any,
  "appliedBy": IAppliedBy,
  "coverLetter": string,
  "description": string,
  "status": string,
  "submissionId": number,
  "updatedAt": any
}

export interface IAppliedBy {
  "email": string,
  "name": string,
  "phoneNumber": string
}

export interface IDataDetailApplicant {
  "userId": number,
  "address": string,
  "avatarFileId": number,
  "avatarURL": string,
  "bio": string,
  "cvFileId": number,
  "cvURL": string,
  "dob": any,
  "educations": IDataEducation[],
  "email": string,
  "experiences": IDataExperience[],
  "name": "string",
  "phoneNumber": "string",
  "skills": IDataSkill[]
}

export interface IDataEducation {
  "educationId": number,
  "degree": string,
  "description": string,
  "educationName": string,
  "startDate": any,
  "endDate": any,
  "major": string
}

export interface IDataExperience {
  "experienceId": number,
  "corporateName": string,
  "description": string,
  "startDate": any,
  "endDate": any,
  "position": string
}

export interface IDataSkill {
  "skillId": number,
  "skillName": string
}

export interface IDataUpdateStatus {
  "description": string,
  "status": string
}
