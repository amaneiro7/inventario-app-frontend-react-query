import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type RoleId } from '../value-object/RoleId'
import { type RoleName } from '../value-object/RoleName'

export interface Role {
  id: Primitives<RoleId>
  name: Primitives<RoleName>
}

export type RoleDTO = Role
