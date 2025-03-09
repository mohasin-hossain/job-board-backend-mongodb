import { z } from 'zod';

const createApplicationValidationSchema = z.object({
  body: z.object({
    job_id: z
      .string({ required_error: 'Job ID is required' })
      .min(1, 'Job ID is required'),

    applicant_name: z
      .string({ required_error: 'Applicant name is required' })
      .min(3, 'Applicant name must be at least 3 characters long'),

    applicant_email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),

    cover_letter: z
      .string({ required_error: 'Cover letter is required' })
      .min(20, 'Cover letter must be at least 20 characters long'),
  }),
});

export const ApplicationValidation = { createApplicationValidationSchema };
