"use client";

import { Page } from "@/interfaces/page";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import toggleReservePopup from "@/lib/toggleReservePopup";
import { useHandleNavClick } from "@/lib/useHandleNavClick";

interface NavLinkProps {
  isExternal: boolean;
  linkType: LinkType;
  label: string;
  isBlank: boolean;
  link?: Page;
  href?: string;
  className?: string;
  locale?: string;
}

type LinkType =
  | "page"
  | "external"
  | "access-situation"
  | "rooms-page"
  | "reserve"
  | "homepage";

const ExternalLink: React.FC<{
  href: string;
  label: string;
  isBlank: boolean;
  className?: string;
}> = ({ href, label, isBlank, className }) => {
  return (
    <a
      href={href}
      className={className}
      target={isBlank ? "_blank" : undefined}
      rel={isBlank ? "noopener noreferrer" : undefined}
    >
      {label}
    </a>
  );
};

const HomePageLink = (
  label: string,
  isBlank: boolean,
  locale: string,
  className?: string,
) => {
  const handleOnClick = useHandleNavClick();
  const href = `/${locale}/`;

  return (
    <Link
      href={href}
      className={className}
      target={isBlank ? "_blank" : undefined}
      rel={isBlank ? "noopener noreferrer" : undefined}
      onClick={(e) => handleOnClick(e, href)}
    >
      <span className={`${className}__label`}>{label}</span>
    </Link>
  );
};

const InternalLink = (
  link: Page,
  label: string,
  isBlank: boolean,
  locale: string,
  className?: string,
) => {
  const handleOnClick = useHandleNavClick();
  const href = `/${locale}/${link.slug}`;

  return (
    <Link
      href={href}
      className={className}
      target={isBlank ? "_blank" : undefined}
      rel={isBlank ? "noopener noreferrer" : undefined}
      onClick={(e) => handleOnClick(e, href)}
    >
      <span className={`${className}__label`}>{label}</span>
    </Link>
  );
};

const RoomsPageLink = (
  label: string,
  locale: string,
  isBlank: boolean,
  className?: string,
) => {
  const handleOnClick = useHandleNavClick();
  const href = `/${locale}/nos-chambres`;

  return (
    <Link
      href={href}
      className={className}
      target={isBlank ? "_blank" : undefined}
      rel={isBlank ? "noopener noreferrer" : undefined}
      onClick={(e) => handleOnClick(e, href)}
    >
      <span className={`${className}__label`}>{label}</span>
    </Link>
  );
};

const AccessPageLink = (
  label: string,
  locale: string,
  isBlank: boolean,
  className?: string,
) => {
  const handleOnClick = useHandleNavClick();
  const href = `/${locale}/acces-et-situation`;

  return (
    <Link
      href={href}
      className={className}
      target={isBlank ? "_blank" : undefined}
      rel={isBlank ? "noopener noreferrer" : undefined}
      onClick={(e) => handleOnClick(e, href)}
    >
      <span className={`${className}__label`}>{label}</span>
    </Link>
  );
};

const ReserveLink = (label: string, className?: string) => {
  return (
    <Button
      variant={"link"}
      className={className}
      onClick={() => toggleReservePopup()}
    >
      <span className={`${className}__label`}>{label}</span>
    </Button>
  );
};

const NavLink: React.FC<NavLinkProps> = ({
  isExternal,
  linkType,
  label,
  isBlank,
  link,
  href,
  className,
  locale = "fr",
}) => {
  if (isExternal && href) {
    return (
      <ExternalLink
        href={href}
        label={label}
        className={className}
        isBlank={isBlank}
      />
    );
  }

  switch (linkType) {
    case "homepage":
      return HomePageLink(label, isBlank, locale, className);

    case "page":
      if (link) return InternalLink(link, label, isBlank, locale, className);
      return null;

    case "rooms-page":
      return RoomsPageLink(label, locale, isBlank, className);

    case "access-situation":
      return AccessPageLink(label, locale, isBlank, className);

    case "reserve":
      return ReserveLink(label, className);

    default:
      return null;
  }
};

export default NavLink;
