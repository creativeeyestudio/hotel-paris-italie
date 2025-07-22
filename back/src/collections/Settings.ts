import { CollectionConfig } from 'payload'
import { LayoutBlock } from './Pages'
import { convertRichTextToHTML } from '@/utils/convertRichTextToHTML'

export async function enrichLayoutWithHTML(layout: LayoutBlock[] = []): Promise<LayoutBlock[]> {
  return Promise.all(
    layout.map(async (block) => {
      const { blockType, blockName, accessList, accessContent, ...rest } = block

      const enrichedBlock: LayoutBlock = {
        blockType,
        blockName,
        ...rest,
      }

      if (accessContent) {
        enrichedBlock.accessContent = accessContent
        enrichedBlock.html = await convertRichTextToHTML(accessContent)
      }

      if (Array.isArray(accessList)) {
        enrichedBlock.accessList = await Promise.all(
          accessList.map(async (item) => ({
            ...item,
            html: item.accessContent ? await convertRichTextToHTML(item.accessContent) : undefined,
          }))
        )
      }

      return enrichedBlock
    })
  )
}

const Settings: CollectionConfig = {
  slug: 'settings',
  labels: {
    singular: 'Site internet',
    plural: 'Sites internet',
  },
  access: {
    read: () => true, // Public
  },
  admin: {
    useAsTitle: 'title',
    group: 'Administration',
  },
  fields: [
    {
      name: 'title',
      label: 'Titre du site',
      type: 'text',
    },
    {
      name: 'contactDetails',
      label: 'Informations d\'accès et contact',
      type: 'group',
      fields: [
        {
          name: 'adress',
          label: 'Adresse',
          type: 'textarea'
        },
        {
          name: 'postcode',
          label: 'Code postal',
          type: 'text'
        },
        {
          name: 'city',
          label: 'Ville',
          type: 'text'
        },
        {
          name: 'phone',
          label: 'Téléphone',
          type: 'text'
        },
        {
          name: 'email',
          label: 'E-Mail',
          type: 'email'
        },
        {
          name: 'accessList',
          label: 'Moyens d\'accès',
          type: 'array',
          fields: [
            {
              name: 'accessName',
              label: 'Titre',
              type: 'text',
              required: true
            },
            {
              name: 'accessContent',
              label: 'Contenu',
              type: 'richText',
              required: true,
            },
          ]
        }
      ]
    },
    {
      name: 'identityGroup',
      label: 'Identité du site',
      type: 'group',
      fields: [
        {
          name: 'logo',
          label: 'Logo du site',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'favicon',
          label: 'Favicon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'homepage',
          label: "Page d'accueil",
          type: 'relationship',
          relationTo: 'pages',
        },
      ],
    },
    {
      name: 'maintenanceGroup',
      label: 'Maintenance du site',
      type: 'group',
      fields: [
        {
          name: 'maintenance',
          label: 'Mettre le site en maintenance',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------------- */
  /*  Hooks                                                                 */
  /* ---------------------------------------------------------------------- */
  hooks: {
    /**
     * Enrichit les blocks avec du HTML côté lecture.
     */
    afterRead: [
      async ({ doc }) => {
        if (doc?.contactDetails?.accessList) {
          doc.contactDetails.accessList = await enrichLayoutWithHTML(doc.contactDetails.accessList)
        }
        return doc
      },
    ],
  },
}

export default Settings
