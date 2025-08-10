import { Block } from "payload";

const Heroscreen: Block = {
    slug: 'heroscreen',
    labels: {
        singular: 'Heroscreen',
        plural: 'Heroscreens'
    },
    fields: [
        {
            name: 'heroImage',
            label: 'Image',
            type: 'upload',
            relationTo: 'media',
            hasMany: true,
            required: true, 
        },
        {
            name: 'title',
            label: 'Titre',
            type: 'text',
            localized: true,
            admin: {
                description: 'Titre visible en version Desktop'
            }
        }
    ]
}

export default Heroscreen