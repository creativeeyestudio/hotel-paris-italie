import React from "react";
import Navigation from "./Navigation";
import Logo from "./Logo";
import MenuIcon from "../icons/MenuIcon";

interface HeaderProps {
  locale: string;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  return (
    <>
      <header className="h-[4rem] px-[1.25rem] flex justify-between items-center md:h-[6rem] md:px-[1.875rem] lg:relative lg:px-[5.787vw] lg:bg-primary lg:text-white">
        <div className="logo-nav h-full flex items-center gap-[1.875rem]">
          <MenuIcon />
          {/* Logo */}
          <figure className="aspect-video h-full relative bg-white lg:px-[1rem] lg:absolute lg:left-[50%] lg:translate-x-[-50%]">
            <div className="relative h-full">
              <Logo />
            </div>
          </figure>
        </div>
        
        <ul className="flex gap-[.5rem] divide-x divide-black lg:divide-white">
          <li className="ps-[0.5rem]"><a href="">FR</a></li>
          <li className="ps-[0.5rem]"><a href="">EN</a></li>
          <li className="ps-[0.5rem]"><a href="">ES</a></li>
          <li className="ps-[0.5rem]"><a href="">IT</a></li>
        </ul>
      </header>
      <div className="nav--primary">
        <Navigation menuId={'main-menu'} locale={locale} />
      </div>
    </>
  );
};

export default Header;
