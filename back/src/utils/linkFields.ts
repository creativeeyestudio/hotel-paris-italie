import { Field } from "payload";

const LinkFields = (noImage = false): Field[] => [
  {
    type: 'row',
    fields: [
      {
        name: 'type',
        type: 'select',
        defaultValue: 'page',
        required: true,
        options: [
          { label: 'Page', value: 'page' },
          { label: 'Article', value: 'post' },
          { label: 'Lien personnalisé', value: 'external' },
          { label: 'Page "Nos Chambres"', value: 'rooms-page' },
          { label: 'Page "Accès et situation"', value: 'access-situation' },
          { label: 'Réserver une chambre', value: 'reserve-popup' },
        ],
        admin: {
          width: '25%'
        }
      },
      {
        name: 'label',
        type: 'text',
        required: true,
        localized: true,
        admin: {
          width: '75%'
        }
      },
    ]
  },
  
  {
    name: 'page',
    type: 'relationship',
    relationTo: 'pages',
    admin: {
      condition: (_data, sibling) => sibling.type === 'page',
    },
  },
  {
    name: 'post',
    type: 'relationship',
    relationTo: 'posts',
    admin: {
      condition: (_data, sibling) => sibling.type === 'post',
    },
  },
  {
    name: 'url',
    type: 'text',
    admin: {
        placeholder: 'https://',
        condition: (_data, sibling) => sibling.type === 'external',
    },
  },
  {
    name: 'image',
    label: 'Image',
    type: 'relationship',
    relationTo: 'media',
    required: false,
    admin: {
        condition: () => !noImage
    }
  },
  {
    name: 'newTab',
    type: 'checkbox',
    label: 'Ouvrir dans un nouvel onglet',
    admin: {
      condition: (_data, sibling) => sibling.type !== 'reserve-popup',
    },
  },
]

export default LinkFields