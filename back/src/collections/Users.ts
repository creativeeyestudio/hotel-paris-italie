import { ROLE_OPTIONS } from '@/constants/roles'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Utilisateur',
    plural: 'Utilisateurs',
  },
  admin: {
    useAsTitle: 'email',
    group: 'Administration',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'contributor',
      options: ROLE_OPTIONS,
      access: {
        create: ({ req: { user } }) => user?.role === 'admin',
        read: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
      },
      admin: {
        position: 'sidebar',
      },
    }
  ],
}
