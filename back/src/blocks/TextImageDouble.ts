import LinkFields from "@/utils/linkFields";
import type { Block } from "payload";

const TextImageDouble: Block = {
    slug: 'text-double-image',
    labels: {
        singular: 'Texte Double Image',
        plural: 'Texte Double Image',
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
            name: 'content',
            label: 'Contenu',
            type: 'richText',
        },
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Boutons Call To Action',
                    description: 'Boutons dédiés à accompagner le visiteur dans sa navigation',
                    fields: [
                        {
                            name: 'cta',
                            label: false,
                            type: 'array',
                            labels: {
                                singular: 'Lien de CTA',
                                plural: 'Liens de CTA',
                            },
                            fields: [
                                ...LinkFields(true),
                            ],
                        },
                    ]
                },
                {
                    label: 'Liste de liens (Colonne de 2)',
                    description: 'Liens sous forme de colonne de 2',
                    fields: [
                        {
                            name: 'linkList',
                            label: false,
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
                    ]    
                },
                {
                    label: 'Sous contenu',
                    description: 'Sous catégories internes',
                    fields: [
                        {
                            name: 'subItem',
                            label: false,
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
                },
                {
                    label: 'Blocks Accordion',
                    description: "Contenus accordion",
                    fields: [
                        {
                            name: 'accordionItem',
                            type: 'array',
                            label: false,
                            fields: [
                                {
                                    name: 'title',
                                    label: 'Titre',
                                    type: 'text',
                                    required: true
                                },
                                {
                                    name: 'content',
                                    label: 'Contenu',
                                    type: 'richText',
                                    required: true
                                }
                            ]
                        }
                        
                    ]
                }
            ]
        },
        
    ]
}

export default TextImageDouble;