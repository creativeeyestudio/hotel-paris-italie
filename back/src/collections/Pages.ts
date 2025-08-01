import type { CollectionConfig } from 'payload'
import Text from '@/blocks/Text'
import TextIntro from '@/blocks/TextIntro'
import HtmlContent from '@/blocks/HtmlContent'
import Heroscreen from '@/blocks/Heroscreen'
import Parallax from '@/blocks/Parallax'
import TextDoubleImage from '@/blocks/TextImageDouble'
import TextImage from '@/blocks/TextImage'
import { convertRichTextToHTML } from '@/utils/convertRichTextToHTML'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { pagesAccess } from '@/access/pagesAccess'
import ImageLink from '@/blocks/ImageLink'

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

export type LayoutBlock = {
  blockType: string
  blockName?: string
  content?: SerializedEditorState
  accessIntro?: SerializedEditorState
  accessContent?: SerializedEditorState
  html?: string
  [key: string]: unknown
}

export async function enrichLayoutWithHTML(layout: LayoutBlock[] = []): Promise<LayoutBlock[]> {
  return Promise.all(
    layout.map(async (block) => {
      const { blockType, blockName, content, subItem, ...rest } = block

      const enrichedBlock: LayoutBlock = {
        blockType,
        blockName,
        ...rest,
      }

      if (content) {
        enrichedBlock.content = content
        enrichedBlock.html = await convertRichTextToHTML(content)
      }

      if (Array.isArray(subItem)) {
        enrichedBlock.subItem = await Promise.all(
          subItem.map(async (item) => ({
            ...item,
            html: item.content ? await convertRichTextToHTML(item.content) : undefined,
          }))
        )
      }

      return enrichedBlock
    })
  )
}


/* -------------------------------------------------------------------------- */
/*  Collection                                                                */
/* -------------------------------------------------------------------------- */
const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Contenu',
  },
  access: pagesAccess,
  fields: [
    /* ------------------------ Métadonnées basiques ------------------------ */
    {
      name: 'title',
      label: 'Titre de la page',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      label: 'URL',
      type: 'text',
      required: true,
      unique: true,
    },

    /* ------------------------------ Contenu ------------------------------ */
    {
      name: 'content',
      label: 'Contenu de la page',
      type: 'group',
      fields: [
        {
          name: 'heroscreen',
          label: 'Images d\'Heroscreen',
          type: 'blocks',
          blocks: [Heroscreen],
          maxRows: 1
        },
        {
          name: 'layout',
          label: 'Blocks de la page',
          type: 'blocks',
          blocks: [Text, TextIntro, TextImage, TextDoubleImage, Parallax, ImageLink, HtmlContent],
          required: false,
          localized: true,
        },
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
        {
          name: 'published',
          type: 'radio',
          label: 'Publié',
          options: [
            { label: 'En brouillon', value: '0' },
            { label: 'A relire', value: '1' },
            { label: 'Publié', value: '2' },
          ],
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
        if (doc?.content?.layout) {
          doc.content.layout = await enrichLayoutWithHTML(doc.content.layout)
        }
        return doc
      },
    ],
  },
}

export default Pages
