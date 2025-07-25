import Image from "next/image";
import { ImageLinkProps } from "@/interfaces/blocks";
import NavLink from "./NavLink";

const ImageLink: React.FC<ImageLinkProps> = ({ linksList }) => {
  return (
    <>
      <section className="image-link">
        {linksList.map((link, index) => (
            <div className="image-link__item" key={index}>
              <NavLink
                isExternal={false}
                linkType={link.type}
                label={link.label}
                isBlank={link.isBlank}
                className="image-link__link"
              />
              <figure key={index} className="image-link__image">
                <Image
                  src={process.env.NEXT_PUBLIC_API_URL + link.image.url}
                  alt={link.image.alt ?? ""}
                  fill
                />
              </figure>
            </div>
        ))}
      </section>
    </>
  );
};

export default ImageLink;
