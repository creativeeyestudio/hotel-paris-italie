import { User } from '@/types/User'
import { hasRole } from './roles'
import { AccessConfig } from './AccessConfig'

export const mediaAccess = {
  read: () => true,
  create: ({ req: { user } }: AccessConfig) => hasRole(user?.role, 'editor'),
  update: ({ req: { user } }: AccessConfig) => hasRole(user?.role, 'editor'),
  delete: ({ req: { user } }: AccessConfig) => hasRole(user?.role, 'editor'),
}
