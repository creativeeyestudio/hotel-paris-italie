import Heroscreen from "@/blocks/Heroscreen";
import { convertRichTextToHTML } from "@/utils/convertRichTextToHTML";
import { convertHTMLToLexical } from "@payloadcms/richtext-lexical";
import { GlobalConfig } from "payload";

const RoomPage: GlobalConfig = {
    slug: 'roomPage',
    label: 'Nos chambres',
    admin: {
        group: 'Pages dédiées'
    },
    fields: [
        {
            name: 'intro',
            label: 'Introduction',
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
                    name: 'introTitle',
                    label: 'Titre',
                    type: 'text',
                    required: true
                },
                {
                    name: 'introContent',
                    label: 'Contenu',
                    type: 'richText',
                    required: true
                },
                {
                    name: 'introContentHtml',
                    type: 'code',
                    hidden: true,
                    admin: {
                        language: 'html'
                    }
                }
            ]
        },
        {
            name: 'services',
            label: 'Nos services',
            type: 'group',
            fields: [
                {
                    name: 'serviceList',
                    label: false,
                    type: 'array',
                    labels: {
                        singular: 'Service',
                        plural: 'Services',
                    },
                    fields: [
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'serviceIcon',
                                    label: 'Icone du service',
                                    type: 'select',
                                    admin: {
                                        width: '25%'
                                    },
                                    options: [
                                        {
                                            label: 'Salle de bain',
                                            value: 'bathroom'
                                        },
                                        {
                                            label: 'Climatisation',
                                            value: 'air'
                                        },
                                        {
                                            label: 'WiFi',
                                            value: 'wifi'
                                        },
                                        {
                                            label: 'Téléphone',
                                            value: 'phone'
                                        },
                                        {
                                            label: 'Coffre-fort',
                                            value: 'safe'
                                        },
                                        {
                                            label: 'Minibar',
                                            value: 'minibar'
                                        },
                                        {
                                            label: 'TV écran plat',
                                            value: 'television'
                                        },
                                        {
                                            label: 'Plateau de courtoisie',
                                            value: 'courtesyTray'
                                        },
                                    ]
                                },
                                {
                                    name: 'serviceLabel',
                                    label: 'Nom du service',
                                    type: 'text',
                                    required: true,
                                    admin: {
                                        width: '75%'
                                    },
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: 'rooms',
            label: 'Types de chambres',
            type: 'group',
            fields: []
        },
    ],

    hooks: {
        afterRead: [
            async ({ doc }) => {
                if (doc?.intro?.introContent) {
                    doc.intro.introContentHtml = await convertRichTextToHTML(doc?.intro?.introContent);
                }
            }
        ]
    }
}

export default RoomPage;