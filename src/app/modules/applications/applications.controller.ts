import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ApplicationService } from './applications.service';
import { ApiError } from '../../errors/apiError';
import { checkJobExists } from '../../utils/jobHelpers';
import mongoose from 'mongoose';

const createApplication = catchAsync(async (req: Request, res: Response) => {
  const { job_id } = req.body;

  // Validate if the job_id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(job_id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid job ID');
  }

  // Check if job exists first
  await checkJobExists(job_id);

  const application = await ApplicationService.createApplicationIntoDB(
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Application submitted successfully',
    data: application,
  });
});

const getAllApplicationsByJobId = catchAsync(
  async (req: Request, res: Response) => {
    const job_id = req.params.job_id;

    // Validate if the job_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(job_id)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid job ID');
    }

    // Check if job exists first
    await checkJobExists(job_id);

    const applications =
      await ApplicationService.getAllApplicationsByJobIdFromDB(job_id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:
        applications.length > 0
          ? 'Applications retrieved successfully'
          : 'Unfortunately, No Applications found for this job!',
      data: applications,
    });
  },
);

export const ApplicationController = {
  createApplication,
  getAllApplicationsByJobId,
};
