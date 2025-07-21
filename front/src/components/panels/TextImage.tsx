import { TextImageProps } from "@/interfaces/blocks";
import Image from "next/image";
import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";

import '@/styles/components/text-image.scss';
import Link from "next/link";

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

  console.log(device);
  
  return process.env.NEXT_PUBLIC_API_URL ? (
    <section className={`text-img${secondaryBg ? ' text-img--sec-color' : ''}`}>

    <div className="text-img__content">
      <TitleTag className="text-img__title text-2xl md:text-3xl lg:text-4xl">
        {title}
      </TitleTag>
      <div
        className="text-img__text mt-[1.875rem]"
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

      {linkList.length > 0 && <ul className="text-double-img__list-items">
          {linkList?.map((linkItem, index) => (
            <li key={index} className="text-double-img__list-item">
              <strong>
                {linkItem.linkUrl 
                  ? <Link target="_blank" href={linkItem.linkUrl}>{linkItem.linkName}</Link> 
                  : linkItem.linkName
                }  
              </strong>
            </li>
          ))}
        </ul>}
    </div>

    <figure className="text-img__image">
      {device.desktop ? (
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + image.url}
          alt={image.alt ?? ""}
          fill
          objectFit="cover"
        />
      ) : (
        <AspectRatio ratio={device.mobile ? 4 / 3 : 16 / 9}>
          <Image
            src={process.env.NEXT_PUBLIC_API_URL + image.url}
            alt={image.alt ?? ""}
            fill
            objectFit="cover"
          />
        </AspectRatio>
      )}
    </figure>
  </section>
) : (
  <></>
);

};

export default TextImage;
