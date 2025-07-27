import LinkFields from "@/utils/linkFields";
import { Block } from "payload";

const ImageLink: Block = {
    slug: 'image-link',
    labels: {
        singular: 'Lien avec Image',
        plural: 'Liens avec Image',
    },
    fields: [
        {
            name: 'linksList',
            label: 'Liste de liens',
            type: 'array',
            labels: {
                singular: 'Lien',
                plural: 'Liens',
            },
            fields: [
                ...LinkFields(false, true)
            ]
        }
    ]
}

export default ImageLink