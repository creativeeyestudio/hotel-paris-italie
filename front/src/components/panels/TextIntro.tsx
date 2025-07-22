import { TextIntroProps } from "@/interfaces/blocks";
import React from "react";

const TextIntro: React.FC<TextIntroProps> = ({
  title,
  html,
  className,
  firstBlock,
}) => {
  const TitleTag = firstBlock ? "h1" : "h2";

  return (
    <section className={`text-intro ${className}`}>
      <div className="text-intro__container">
        <TitleTag className="text-intro__title">{title}</TitleTag>
        {html !== "" ? <div
          className="text-intro__text"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div> : <></>}
      </div>
    </section>
  );
};

export default TextIntro;
