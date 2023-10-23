export type JobType = {
  id: string;
  company: string;
  company_logo: string;
  location: string
  role: string;
  yoe: string;
  qualification: string;
  ctc: string;
  skills: [];
  jd: string;
  perks: string;
  email: string;
  phone: string;
};

export type JobsType = JobType[];

export type UserType = {
  id: string;
  name: string;
  role: string;
  yoe: string;
  qualification: string;
  ectc: string;
  skills: [];
  about: string;
  resume: string;
  reason_to_apply: string;
  email: string;
  phone: string;
};