import { Schema, model } from 'mongoose';
import { IApplication } from './applications.interface';

const ApplicationSchema = new Schema<IApplication>({
  job_id: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  applicant_name: {
    type: String,
    required: true,
  },
  applicant_email: {
    type: String,
    required: true,
  },
  cover_letter: {
    type: String,
    required: true,
  },
  submitted_at: {
    type: Date,
    default: Date.now,
  },
});

export const ApplicationModel = model<IApplication>(
  'Application',
  ApplicationSchema,
);
