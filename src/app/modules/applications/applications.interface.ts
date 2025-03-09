import mongoose from 'mongoose';

export type IApplication = {
  job_id: mongoose.Types.ObjectId;
  applicant_name: string;
  applicant_email: string;
  cover_letter: string;
  submitted_at?: Date;
};
