import { ZodType, z } from 'zod'

export type UserRegistrationProps = {
  type: string
  fullname: string
}

export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z
  .object({
    type: z.string().min(1),
    fullname: z
      .string()
      .min(4, { message: 'your full name must be atleast 4 characters long' }),
  })



