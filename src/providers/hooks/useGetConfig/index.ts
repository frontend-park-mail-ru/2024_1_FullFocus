import { Page } from '@/providers';
import { NavbarLinkProps } from '@/widgets/navbar';
import { UserLogged } from '@/widgets/navbar/ui/index.types';
import { createConfig } from '../useCreateConfig';

export function getConfig(parent: Element) {
    const config = createConfig(parent);

    const routerConfig: { [name: string]: Page } = {};
    const navbarConfig: {
        [name: string]: { props: NavbarLinkProps; logged: UserLogged };
    } = {};

    Object.entries(config).forEach(([name, item]) => {
        routerConfig[name] = {
            url: item.url,
            navigation: item.router.navigation ?? null,
            component: item.router.component,
        };

        navbarConfig[name] = {
            props: {
                className: item.navbarLink.className,
                text: item.navbarLink.text,
                href: item.url,
            },
            logged: item.navbarLink.logged,
        };
    });

    return { routerConfig, navbarConfig };
}
