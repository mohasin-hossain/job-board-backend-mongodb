import { Schema, model } from 'mongoose';
import { IJob } from './jobs.interface';

const JobSchema = new Schema<IJob>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  applications: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Application',
    },
  ],
});

export const JobModel = model<IJob>('Job', JobSchema);
