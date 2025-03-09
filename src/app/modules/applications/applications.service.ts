import { JobModel } from '../jobs/jobs.model';
import { IApplication } from './applications.interface';
import { ApplicationModel } from './applications.model';

const createApplicationIntoDB = async (
  data: IApplication,
): Promise<IApplication> => {
  const application = await ApplicationModel.create(data);
  await JobModel.findByIdAndUpdate(
    data.job_id,
    { $push: { applications: application._id } },
    { new: true },
  );
  return application;
};

const getAllApplicationsByJobIdFromDB = async (
  jobId: string,
): Promise<IApplication[]> => {
  return await ApplicationModel.find({ job_id: jobId });
};

export const ApplicationService = {
  createApplicationIntoDB,
  getAllApplicationsByJobIdFromDB,
};
