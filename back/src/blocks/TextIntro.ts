import linkFields from "@/utils/linkFields";
import type { Block } from "payload";

const TextIntro: Block = {
    slug: 'text-intro',
    labels: {
        singular: 'Introduction',
        plural: 'Introduction',
    },
    fields: [
        {
            name: 'title',
            label: 'Titre',
            type: 'text',
            required: true,
        },
        {
            name: 'content',
            label: 'Contenu',
            type: 'richText',
            required: true,
        },
        {
            name: 'links',
            label: 'Liste de liens',
            type: 'array',
            fields: [
                ...linkFields()
            ]
        }
    ]
}

export default TextIntro;
