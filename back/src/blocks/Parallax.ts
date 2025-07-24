import { Block } from "payload";

const Parallax: Block = {
    slug: 'parallax',
    labels: {
        singular: 'Parallax',
        plural: 'Parallaxes'
    },
    fields: [
        {
            name: 'parallaxImage',
            label: 'Image du Parallax',
            type: 'upload',
            relationTo: 'media',
            required: true, 
        },
        {
            name: 'parallaxSpeed',
            label: 'Vitesse',
            type: 'number',
            required: true,
            defaultValue: 1.5
        }
    ]
}

export default Parallax