import { ImageDataProps } from "@/interfaces/image";
import { MenuItem } from "@/interfaces/navigation";
import { fetchNavigation } from "@/lib/cms";
import { Facebook, Instagram } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import NavLink from "../panels/NavLink";

interface NavigationParams {
  menuId?: "main-menu" | "secondary-menu" | "footer-menu" | null;
  locale: string;
  classes?: string;
  classesList?: string;
  classesItem?: string;
}

const Navigation = async ({
  menuId,
  locale,
  classes,
  classesList,
  classesItem,
}: NavigationParams) => {
  const headersList = await headers();
  const site = headersList.get("x-website") ?? "default-site";

  if (menuId == null) return;

  const navigation = await fetchNavigation(site, menuId, locale);

  if (!navigation) {
    console.error(`Menu non trouvé avec l'ID ${menuId}`);
    return;
  }

  const renderLink = (item: MenuItem) => {
    return (
      <NavLink
        isExternal={item.type === "external"}
        linkType={item.type}
        label={item.label ?? ""}
        link={item.page}
        href={item.url}
        className={`${classes}__link`}
        isBlank={item.newTab ?? false}
      />
    );
  };

  const renderImage = (item: ImageDataProps) => (
    <figure className={`${classes}__image`}>
      <Image
        key={item.id}
        src={process.env.NEXT_PUBLIC_API_URL + item.url}
        alt={item.alt ?? ""}
        fill
        objectFit="cover"
      />
    </figure>
  );

  const renderSocialLinks = () => (
    <li className={`${classes}__item ${classesItem ?? ""}`}>
      <ul className={`${classes}__social-list`}>
        <li className={`${classes}__social-link`}>
          <Facebook
            size={32}
            color="#ffffff"
            strokeWidth={1.5}
            absoluteStrokeWidth
          />
        </li>
        <li className={`${classes}__social-link`}>
          <Instagram
            size={32}
            color="#ffffff"
            strokeWidth={1.5}
            absoluteStrokeWidth
          />
        </li>
      </ul>
    </li>
  );

  const renderItems = (items: MenuItem[]) => {
    return (
      <ul className={`${classes}__list ${classesList ?? ""}`}>
        {menuId === "secondary-menu" && renderSocialLinks()}

        {items.map((item) => (
          <li key={item.id} className={`${classes}__item ${classesItem ?? ""}`}>
            {renderLink(item)}
            {item.image ? renderImage(item.image) : null}
            {item.children?.length ? renderItems(item.children) : null}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <nav className={classes}>{renderItems(navigation.items)}</nav>
    </>
  );
};

export default Navigation;
