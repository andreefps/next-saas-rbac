import { roleSchema } from './roles'
import { z } from 'zod'

export const userSchema = z.object({
  __typename: z.literal('User').default('User'),
  id: z.string(),
  role: roleSchema,
})
export type User = z.infer<typeof userSchema>
