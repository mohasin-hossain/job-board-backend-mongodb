import { IJob } from './jobs.interface';
import { JobModel } from './jobs.model';

const createJobIntoDB = async (jobData: IJob): Promise<IJob> => {
  return await JobModel.create(jobData);
};

const getAllJobsFromDB = async (): Promise<IJob[]> => {
  return await JobModel.find().sort({ created_at: -1 });
};

const getJobByIdFromDB = async (id: string): Promise<IJob | null> => {
  return await JobModel.findById(id).populate('applications');
};

export const JobService = {
  createJobIntoDB,
  getAllJobsFromDB,
  getJobByIdFromDB,
};
