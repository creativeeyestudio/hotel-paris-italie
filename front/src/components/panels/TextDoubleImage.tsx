import React from "react";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TextDoubleImageProps } from "@/interfaces/blocks";
import { ImageWrapper } from "./ImageWrapper";
import SwiperComponent from "./SwiperComponent";

import '@/styles/components/text-double-image.scss';

const TextDoubleImage: React.FC<TextDoubleImageProps> = ({
  title,
  html,
  image1,
  image2,
  secondaryBg,
  linkList,
  subItem,
  device,
  firstBlock,
}) => {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const imgRatio = device.mobile ? 4/3 : 16/9;
  const TitleTag = firstBlock ? "h1" : "h2";

  return apiUrl != undefined ? (
    <section className={`text-double-img ${secondaryBg ? 'text-double-img--sec-color' : ''}`}>
      
      <div className="text-double-img__content">
        <TitleTag className="text-double-img__title">{title}</TitleTag>
        
        <div
          className="text-double-img__text"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>

        {subItem?.map((item, index) => (
          <div className="text-double-img__sub-content" key={index}>
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

      {device.desktop && <div className={`text-double-img__images`}>
        <ImageWrapper url={apiUrl + image1.url} alt={image1.alt} className={`text-double-img__image--1 ${image2 ? 'text-double-img__image--half' : 'text-double-img__image--full'}`} /> 
        {(image2 !== undefined && image2 !== null) && 
          <ImageWrapper url={apiUrl + image2.url} alt={image2.alt} className="text-double-img__image--2" /> 
        }
      </div>}

      {(device.mobile || device.tablet) && (
        (image2 === undefined || image2 === null) ? (
          <AspectRatio ratio={imgRatio}>
            <ImageWrapper url={apiUrl + image1.url} alt={image1.alt} />
          </AspectRatio>
        ) : (
          <SwiperComponent images={[image1, image2]} ratio={imgRatio}></SwiperComponent>
        )
      )}
    </section>
  ) : (<></>);
};

export default TextDoubleImage;
