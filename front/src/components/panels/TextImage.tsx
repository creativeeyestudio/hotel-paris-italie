import React from "react";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TextImageProps } from "@/interfaces/blocks";
import { ImageWrapper } from "./ImageWrapper";

import "@/styles/components/text-image.scss";

const TextImage: React.FC<TextImageProps> = ({
  title,
  html,
  image,
  secondaryBg,
  linkList,
  subItem,
  device,
  firstBlock,
}) => {
  const TitleTag = firstBlock ? "h1" : "h2";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return process.env.NEXT_PUBLIC_API_URL ? (
    <section className={`text-img${secondaryBg ? " text-img--sec-color" : ""}`}>
      <div className="text-img__content">
        <TitleTag className="text-img__title">{title}</TitleTag>

        <div
          className="text-img__text"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {subItem?.map((item, index) => (
          <div className="text-img__sub-content" key={index}>
            <span>
              <strong>{item.title}</strong>
            </span>
            <div dangerouslySetInnerHTML={{ __html: item.html }}></div>
          </div>
        ))}

        {linkList.length > 0 && (
          <ul className="text-double-img__list-items">
            {linkList?.map((linkItem, index) => (
              <li key={index} className="text-double-img__list-item">
                <strong>
                  {linkItem.linkUrl ? (
                    <Link target="_blank" href={linkItem.linkUrl}>
                      {linkItem.linkName}
                    </Link>
                  ) : (
                    linkItem.linkName
                  )}
                </strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      {device.desktop ? (
        <ImageWrapper
          url={apiUrl + image.url}
          alt={image.alt}
          className="text-img__image"
        />
      ) : (
        <AspectRatio ratio={device.mobile ? 4 / 3 : 16 / 9}>
          <ImageWrapper
            url={apiUrl + image.url}
            alt={image.alt}
            className="text-img__image"
          />
        </AspectRatio>
      )}
    </section>
  ) : (
    <></>
  );
};

export default TextImage;
