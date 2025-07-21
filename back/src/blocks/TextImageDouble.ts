import type { Block } from "payload";

const TextImageDouble: Block = {
    slug: 'text-double-image',
    labels: {
        singular: 'text-double-image-block',
        plural: 'text-double-image-blocks',
    },
    fields: [
        {
            name: 'title',
            label: 'Titre',
            type: 'text',
            required: true,
        },
        {
            name: 'secondaryBg',
            type: 'checkbox',
            label: 'Fond secondaire',
            defaultValue: false
        },
        {
            name: 'content',
            label: 'Contenu',
            type: 'richText',
            required: true,
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'image1',
                    label: 'Image 1',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    admin: {
                        width: '50%',
                    },
                },
                {
                    name: 'image2',
                    label: 'Image 2',
                    type: 'upload',
                    relationTo: 'media',
                    required: false,
                    admin: {
                        width: '50%',
                    },
                },
            ]
        },
        {
            name: 'linkList',
            label: 'Liste de liens',
            type: 'array',
            fields: [
                {
                    type: 'row',
                    fields:[
                        {
                            name: 'linkName',
                            label: "Nom du lien",
                            type: 'text',
                            required: true,
                            admin: {
                                width: '50%',
                            },
                        },
                        {
                            name: 'linkUrl',
                            label: "URL",
                            type: 'text',
                            admin: {
                                width: '50%',
                            },
                        },
                    ]
                }
            ]
        },
        {
            name: 'subItem',
            label: 'Sous contenu',
            type: 'array',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true
                },
                {
                    name: 'content',
                    type: 'richText',
                    required: true
                },
            ]
        },
    ]
}

export default TextImageDouble;