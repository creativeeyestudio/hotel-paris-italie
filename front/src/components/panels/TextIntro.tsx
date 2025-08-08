import { TextIntroProps } from "@/interfaces/blocks";
import React from "react";
import { CurtainReveal } from "../anims/CurtainReveal";
import NavLink from "./NavLink";
import Link from "next/link";
import ScrollButton from "./ScrollButton";

const TextIntro: React.FC<TextIntroProps> = ({
  title,
  html,
  className = "",
  firstBlock,
  cta,
  linkList
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

          {cta && (
            <div className="text-intro__btn-list">
              {cta.map((link, index) => (
                <NavLink 
                  isExternal={link.isBlank} 
                  linkType={link.type} 
                  label={link.label} 
                  isBlank={link.isBlank} 
                  key={index} />
              ))}
            </div>
          )}

          {linkList && (
            <div className="text-intro__btn-list">
              {linkList.map((link, index) => (

                link.linkUrl 
                  ? (link.linkUrl.startsWith('#') 
                    ? <ScrollButton targetId={link.linkUrl} key={index} btnLabel={link.linkName} className="btn--primary" />
                    : <Link href={link.linkUrl} key={index} className="btn--primary">{link.linkName}</Link>)
                  : <></>
              ))}
            </div>
          )}
          
        </CurtainReveal>
      </div>
    </section>
  );
};

export default TextIntro;
