import { pagesAccess } from "@/access/pagesAccess";
import Heroscreen from "@/blocks/Heroscreen";
import { convertRichTextToHTML } from "@/utils/convertRichTextToHTML";
import { GlobalConfig } from "payload";

const RoomPage: GlobalConfig = {
    slug: 'roomPage',
    label: 'Nos chambres',
    access: pagesAccess,
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
                    required: true,
                    localized: true,
                },
                {
                    name: 'introContent',
                    label: 'Contenu',
                    type: 'richText',
                    required: true,
                    localized: true,
                },
                {
                    name: 'introContentHtml',
                    type: 'code',
                    hidden: true,
                    localized: true,
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
                                    localized: true,
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
            fields: [
                {
                    name: 'roomsList',
                    label: false,
                    type: 'array',
                    fields: [
                        {
                            name: 'roomName',
                            label: 'Nom de la chambre',
                            type: 'text',
                            required: true,
                            localized: true,
                        },
                        {
                            name: 'roomDescHtml',
                            label: false,
                            type: 'code',
                            hidden: true,
                            localized: true,
                            admin: {
                                language: 'html'
                            }
                        },
                        {
                            name: 'roomDesc',
                            label: 'Description de la chambre',
                            type: 'richText',
                            required: true,
                            localized: true,
                        },
                        {
                            name: 'roomImage',
                            label: 'Image de la chambre',
                            type: 'relationship',
                            relationTo: 'media',
                        }
                    ]
                }
            ]
        },
    ],

    hooks: {
        afterRead: [
            async ({ doc }) => {
                if (doc?.intro?.introContent) {
                    doc.intro.introContentHtml = await convertRichTextToHTML(doc?.intro?.introContent);
                }

                if (doc?.rooms?.roomsList[0]) {
                    doc?.rooms?.roomsList.forEach(async room => {
                        room.roomDescHtml = await convertRichTextToHTML(room.roomDesc);
                    });
                }
            }
        ]
    }
}

export default RoomPage;