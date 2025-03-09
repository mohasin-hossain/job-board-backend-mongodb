import httpStatus from 'http-status';
import { JobModel } from '../modules/jobs/jobs.model';
import { ApiError } from '../errors/apiError';

export const checkJobExists = async (jobId: string) => {
  const job = await JobModel.findById(jobId);
  if (!job) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'No job record found for the provided Job ID!'
    );
  }
  return job;
};