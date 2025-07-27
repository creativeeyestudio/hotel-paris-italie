import { TextIntroProps } from "@/interfaces/blocks";
import React from "react";
import { CurtainReveal } from "../anims/CurtainReveal";

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
        <CurtainReveal direction="bottom" color="#faf8f3">
          <TitleTag className="text-intro__title">{title}</TitleTag>
          {html && html !== "" ? (
            <div
              className="text-intro__text"
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          ) : (
            <></>
          )}  
        </CurtainReveal>
        
      </div>
    </section>
  );
};

export default TextIntro;
