import React from "react";
import Logo from "./Logo";
import MenuIcon from "../icons/MenuIcon";
import Navigation from "./Navigation";
import ToggleLang from "../panels/ToggleLang";

interface HeaderProps {
  locale: string;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  return (
    <>
      <header className="header">
        <div className="header__nav">
          <MenuIcon locale={locale} />
          {/* Logo */}
          <figure className="header__logo">
            <div className="header__logo-container">
              <Logo />
            </div>
          </figure>
        </div>

        <ToggleLang currentLocale={locale} />
      </header>

      <div className="nav nav--close">
        <Navigation
          menuId={"main-menu"}
          locale={locale}
          classes="nav__primary"
        />
        <Navigation
          menuId={"secondary-menu"}
          locale={locale}
          classes="nav__secondary"
        />
      </div>
    </>
  );
};

export default Header;
