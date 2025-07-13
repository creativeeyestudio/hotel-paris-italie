import React from "react";
import Navigation from "./Navigation";
import Logo from "./Logo";

interface HeaderProps {
  locale: string;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  return (
    <>
      <header className="h-[4rem] px-[1.25rem] flex justify-between items-center">
        <div className="logo-nav h-full">
          {/* Logo */}
          <figure className="aspect-video h-full relative">
            <Logo />
          </figure>
        </div>
        
        <ul className="flex gap-[0.5rem]">
          <li><a href="">FR</a></li>
          <li><a href="">EN</a></li>
          <li><a href="">ES</a></li>
          <li><a href="">IT</a></li>
        </ul>
      </header>
      <div className="nav--primary">
        <Navigation menuId={'main-menu'} locale={locale} />
      </div>
    </>
  );
};

export default Header;
