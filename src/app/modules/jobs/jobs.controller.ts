import { Request, Response } from 'express';
import { JobService } from './jobs.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { ApiError } from '../../errors/apiError';
import mongoose from 'mongoose';

const createJob = catchAsync(async (req: Request, res: Response) => {
  const job = await JobService.createJobIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Job created successfully',
    data: job,
  });
});

const getAllJobs = catchAsync(async (req: Request, res: Response) => {
  const jobs = await JobService.getAllJobsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Jobs retrieved successfully!',
    data: jobs,
  });
});

const getJobById = catchAsync(async (req: Request, res: Response) => {
  const job_id = req.params.id;

   // Validate if the job_id is a valid ObjectId
   if (!mongoose.Types.ObjectId.isValid(job_id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid job ID');
  }

  const job = await JobService.getJobByIdFromDB(job_id);

  sendResponse(res, {
    success: !!job,
    statusCode: job ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: job ? 'Job found!' : 'Job not found!',
    data: job,
  });
});

export const JobController = {
  createJob,
  getAllJobs,
  getJobById,
};
