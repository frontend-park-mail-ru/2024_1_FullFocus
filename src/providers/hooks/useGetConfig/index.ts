import { NavbarLinkProps } from '@/widgets/navbar';
import { UserLogged } from '@/widgets/navbar/ui/index.types';
import { createConfig } from '../useCreateConfig';
import { RouterConfig } from '@/providers/router/index.types';

export function getConfig(parent: Element) {
    const config = createConfig(parent);

    const routerConfig: RouterConfig = { page404: config.page404, pages: {} };

    const navbarConfig: {
        [name: string]: { props: NavbarLinkProps; logged: UserLogged };
    } = {};

    Object.entries(config.pages).forEach(([name, item]) => {
        routerConfig.pages[name] = {
            url: item.url,
            navigation: item.router.navigation ?? null,
            component: item.router.component,
            logged: item.logged,
        };

        if (item.navbarLink) {
            navbarConfig[name] = {
                props: {
                    className: item.navbarLink.className,
                    text: item.navbarLink.text,
                    href: item.url,
                },
                logged: item.logged,
            };
        }
    });

    return { routerConfig, navbarConfig };
}
