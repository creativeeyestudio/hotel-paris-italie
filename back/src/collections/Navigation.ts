import { accessNavigation } from '@/access/navigationAccess'
import LinkFields from '@/utils/linkFields'
import { CollectionConfig } from 'payload'
import { v4 as uuidv4 } from 'uuid'

const Navigation: CollectionConfig = {
  slug: 'navigation',
  labels: {
    singular: 'Menu',
    plural: 'Menus',
  },
  admin: {
    group: 'Contenu',
    useAsTitle: 'menuId',
  },
  access: accessNavigation,
  fields: [
    {
      name: 'menuId',
      type: 'select',
      label: 'Position du menu',
      required: true,
      unique: true,
      options: [
        { label: 'Menu principal', value: 'main-menu' },
        { label: 'Menu secondaire', value: 'secondary-menu' },
        { label: 'Menu pied de page', value: 'footer-menu' },
      ],
    },
    {
      name: 'items',
      label: 'Liens du menu',
      type: 'array',
      labels: {
        singular: 'Lien de menu',
        plural: 'Liens de menu',
      },
      fields: [
        ...LinkFields(),
        // {
        //   name: 'children',
        //   type: 'array',
        //   label: 'Sous-menus',
        //   fields: linkFields(),
        // },
      ],
    },

    /* ------------------------ Options de publication ------------------------ */
    {
      name: 'config',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'site',
          type: 'relationship',
          relationTo: 'settings',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' && !data.menuId) data.menuId = uuidv4()
        return data
      },
    ],
  },
}

export default Navigation
