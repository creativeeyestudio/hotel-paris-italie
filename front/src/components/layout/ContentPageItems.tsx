import React from "react";
import { BlockProps } from "@/interfaces/page";
import Text from "../panels/Text";
import TextIntro from "../panels/TextIntro";
import TextImage from "../panels/TextImage";
import TextDoubleImage from "../panels/TextDoubleImage";
import Parallax from "../panels/Parallax";
import HtmlContent from "../panels/HtmlContent";
import { getDeviceDetector } from "@/lib/deviceDetector";
import ImageLink from "../panels/ImageLink";

interface ContentPageItemsProps {
  blocks: BlockProps[];
  locale: string;
}

const ContentPageItems: React.FC<ContentPageItemsProps> = async ({
  blocks,
  locale,
}) => {
  if (!blocks || blocks.length === 0) return null;

  const device = await getDeviceDetector();

  return (
    <>
      {blocks.map((block, index) => {
        const isFirst = index === 0;

        switch (block.blockType) {
          case "text":
            return (
              <Text
                title={block.title}
                html={block.html}
                firstBlock={isFirst}
                key={index}
              />
            );
          case "text-intro":
            return (
              <TextIntro
                title={block.title}
                html={block.html}
                firstBlock={isFirst}
                key={index}
              />
            );
          case "text-image":
            return (
              <TextImage
                title={block.title}
                html={block.html}
                image={block.image}
                cta={block.cta}
                secondaryBg={block.secondaryBg}
                linkList={block.linkList}
                subItem={block.subItem}
                device={device}
                firstBlock={isFirst}
                key={index}
              />
            );
          case "text-double-image":
            return (
              <TextDoubleImage
                title={block.title}
                html={block.html}
                image1={block.image1}
                image2={block.image2}
                cta={block.cta}
                secondaryBg={block.secondaryBg}
                linkList={block.linkList}
                subItem={block.subItem}
                device={device}
                firstBlock={isFirst}
                key={index}
              />
            );
          case "parallax":
            return (
              <Parallax
                parallaxImage={block.parallaxImage}
                parallaxSpeed={block.parallaxSpeed}
                key={index}
              />
            );
          case "image-link":
            return (
              <ImageLink
                linksList={block.linksList}
                key={index}
                locale={locale}
              />
            );
          case "html-content":
            return <HtmlContent content={block.content} key={index} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default ContentPageItems;
