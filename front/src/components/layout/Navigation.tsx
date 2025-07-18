import { MenuItem } from "@/interfaces/navigation";
import { fetchNavigation } from "@/lib/cms";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

interface NavigationParams {
    menuId?: string | null
    locale: string
    classes?: string
    classesList?: string
}

const Navigation = async ({menuId, locale, classes, classesList}: NavigationParams) => {
    const headersList = await headers();
    const site = headersList.get('x-website') ?? 'default-site';

    if (menuId == null || menuId == "") return;

    const navigation = await fetchNavigation(site, menuId, locale);

    if (!navigation) {
        console.error(`Menu non trouvé avec l'ID ${menuId}`);
        return;
    }

    const getLinkProps = (item: MenuItem) => {
        const href = item.page ? `/${locale}/${item.page.slug}` : (item.url ?? "#");
        const label = item.page?.title ?? item.label ?? "";
        return { href, label };
    };

    const renderLink = (item: MenuItem) => {
        const { href, label } = getLinkProps(item);

        return item.type === "external" ? (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title="Nouvel onglet"
            >
                {label}
            </a>
        ) : (
            <Link href={href}>{label}</Link>
        );
    };

    const renderItems = (items: MenuItem[]) => (
        <ul className={classesList}>
            {items.map((item) => (
                <li key={item.id}>
                    {renderLink(item)}
                    {item.children?.length ? renderItems(item.children) : null}
                </li>
            ))}
        </ul>
    );

    const renderImages = (items: MenuItem[]) => (
        <div>
            {items.map((item) =>
                item.image ? (
                    <Image
                        key={item.id}
                        src={item.image.url}
                        alt={item.image.alt ?? ""}
                        fill
                    />
                ) : null,
            )}
        </div>
    );

    return (
        <>
            <nav className={classes}>{renderItems(navigation.items)}</nav>
            <div>{renderImages(navigation.items)}</div>
        </>
    );
}

export default Navigation;