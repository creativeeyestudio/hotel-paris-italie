import React from "react";
import Navigation from "./Navigation";
import Logo from "./Logo";

interface HeaderProps {
  locale: string;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  return (
    <>
      <header className="h-[64px] px-[1.25rem]">
        <figure className="aspect-video h-full relative">
          <Logo />
        </figure>
      </header>
      <div className="nav--primary">
        <Navigation menuId={'main-menu'} locale={locale} />
      </div>
    </>
  );
};

export default Header;
