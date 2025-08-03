import { AccessConfig } from './AccessConfig'
import { hasRole } from './roles'

export const accessNavigation = {
  read: () => true,
  create: ({ req: { user } }: AccessConfig) => hasRole(user?.role, 'editor'),
  update: ({ req: { user } }: AccessConfig) => hasRole(user?.role, 'editor'),
  delete: ({ req: { user } }: AccessConfig) => hasRole(user?.role, 'editor'),
}
