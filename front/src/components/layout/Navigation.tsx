import { ImageDataProps } from "@/interfaces/image";
import { MenuItem } from "@/interfaces/navigation";
import { fetchNavigation } from "@/lib/cms";
import { Facebook, Instagram } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

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

  const getLinkProps = (item: MenuItem) => {
    const href = item.page ? `/${locale}/${item.page.slug}` : (item.url ?? "#");
    const label = item.label ?? "";
    return { href, label };
  };

  const renderLink = (item: MenuItem) => {
    let href: string;

    const props = getLinkProps(item);

    console.log(item);
    
    // Détermination du lien et label selon le type
    if (item.type === "access-situation") {
      href = `/${locale}/acces-et-situation`;
    } else if (item.type === "rooms-page") {
      href = `/${locale}/nos-chambres`;
    } else {
      href = props.href;
    }

    // Retourne le lien selon qu'il soit externe ou interne
    return item.type === "external" ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title="Nouvel onglet"
        className={`${classes}__link`}
      >
        {props.label}
      </a>
    ) : (
      <Link href={href} className={`${classes}__link`}>
        {props.label}
      </Link>
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
