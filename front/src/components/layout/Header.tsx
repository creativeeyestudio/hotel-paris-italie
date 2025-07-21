import React from "react";
import Logo from "./Logo";
import MenuIcon from "../icons/MenuIcon";
import Navigation from "./Navigation";

interface HeaderProps {
  locale: string;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  return (
    <>
      <header className="header">
        <div className="header__nav">
          <MenuIcon />
          {/* Logo */}
          <figure className="header__logo">
            <div className="header__logo-container">
              <Logo />
            </div>
          </figure>
        </div>

        <ul className="header__lang-list">
          <li className="header__lang-btn">
            <a href="">FR</a>
          </li>
          <li className="header__lang-btn">
            <a href="">EN</a>
          </li>
          <li className="header__lang-btn">
            <a href="">ES</a>
          </li>
          <li className="header__lang-btn">
            <a href="">IT</a>
          </li>
        </ul>
      </header>

      <div className="nav--primary">
        <Navigation menuId={'main-menu'} locale={locale} />
      </div>
    </>
  );
};

export default Header;
