import Image from "next/image";
import { ImageLinkProps } from "@/interfaces/blocks";
import NavLink from "./NavLink";

const ImageLink: React.FC<ImageLinkProps> = ({ linksList }) => {
  return (
    <section className="image-link">
      {linksList.map((link, index) => {
        // Extraction ici
        const type = link?.type;
        const label = link?.label;
        const isBlank = link?.isBlank;
        const imageUrl = link?.image?.url;
        const imageAlt = link?.image?.alt ?? "";

        return (
          <div className="image-link__item" key={index}>
            <NavLink
              isExternal={false}
              linkType={type}
              label={label}
              isBlank={isBlank}
              link={link.page}
              className="image-link__link"
            />
            <figure className="image-link__image">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
                alt={imageAlt}
                fill
              />
            </figure>
          </div>
        );
      })}
    </section>
  );
};


export default ImageLink;
