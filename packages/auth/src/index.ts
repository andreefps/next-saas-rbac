import {
  
  createMongoAbility,
  CreateAbility,
  MongoAbility,
  AbilityBuilder,
} from '@casl/ability'
import { User } from './models/user'
import { permissions } from './permissions'
import { billingSubject, inviteSubject, organizationSubject, projectSubject, userSubject } from './subjects'
import {z} from 'zod'

const appAbilitiesSchema = z.union([
  projectSubject,
  userSubject,
  inviteSubject, 
  organizationSubject, 
  billingSubject,
  z.tuple([z.literal('manage'), z.literal('all')])
])

type AppAbilities = z.infer< typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User){
  const builder = new AbilityBuilder(createAppAbility)
  
  if(typeof permissions[user.role] !== 'function'){
    throw new Error(`Permissions for role ${user.role} not found'`)
  }
  permissions[user.role](user, builder)
  const ability = builder.build()
  return ability
}