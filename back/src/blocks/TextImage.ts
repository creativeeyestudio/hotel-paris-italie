import type { Block } from "payload";

const TextImage: Block = {
    slug: 'text-image',
    labels: {
        singular: 'text-image-block',
        plural: 'text-image-blocks',
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
            name: 'image',
            label: 'Image',
            type: 'upload',
            relationTo: 'media',
            required: true,
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

export default TextImage;