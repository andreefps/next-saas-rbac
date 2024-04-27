import { AbilityBuilder } from "@casl/ability"
import { AppAbility } from "."
import { User } from "./models/user"
import { Role } from "./models/roles"


type PermissionsByRole = (user: User, builder: AbilityBuilder<AppAbility>) => void 

export const permissions:Record<Role, PermissionsByRole> = {
  ADMIN:  (_, {can}) => {
    can('', 'all')
  },
  MEMBER: (_,{can}) => {
    can('invite', 'User')
  },
  BILLING: (_,{can}) => {
    
  }
}