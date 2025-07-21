import { TextIntroProps } from "@/interfaces/blocks";
import React from "react";

const TextIntro: React.FC<TextIntroProps> = ({ title, html, firstBlock }) => {
  const TitleTag = firstBlock ? "h1" : "h2";

  return (
    <section className="text-intro p-[2rem] bg-[#FAF8F3] lg:py-[6.25rem]">
      <div className="max-w-[1200] mx-auto">
        <TitleTag className="text-intro__title text-2xl md:text-center md:text-3xl lg:text-5xl">{title}</TitleTag>
        <div
          className="text-intro__text mt-[1.875rem] lg:text-center"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>
    </section>
  );
};

export default TextIntro;
