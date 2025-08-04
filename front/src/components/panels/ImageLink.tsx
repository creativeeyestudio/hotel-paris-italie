import Image from "next/image";
import { ImageLinkProps } from "@/interfaces/blocks";
import NavLink from "./NavLink";

const ImageLink: React.FC<ImageLinkProps> = ({ linksList, locale }) => {
  return (
    <section className="image-link">
      {linksList.map((link, index) => {
        const type = link?.type;
        const label = link?.label;
        const isBlank = link?.isBlank;
        const imageUrl = link?.image?.url;
        const imageAlt = link?.image?.alt ?? "";
        const pageLink = link?.page;

        return (
          <div className="image-link__item" key={index}>
            <NavLink
              isExternal={isBlank}
              linkType={type}
              label={label}
              isBlank={isBlank}
              link={pageLink}
              className="image-link__link"
              locale={locale}
            />
            <figure className="image-link__image">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
                alt={imageAlt}
                fill
                sizes={`(min-width: 1024px) ${((1 / linksList.length) * 100).toFixed(2)}vw`}
              />
            </figure>
          </div>
        );
      })}
    </section>
  );
};

export default ImageLink;
