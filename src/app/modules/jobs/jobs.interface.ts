import { IApplication } from "../applications/applications.interface";

export type IJob = {
  title: string;
  description: string;
  company: string;
  location: string;
  created_at?: Date;
  applications?: IApplication[];
};
