import { NavbarLinkProps } from '@/widgets/navbar';
import { UserLogged } from '@/widgets/navbar/ui/index.types';
import { createConfig } from '../useCreateConfig';
import { RouterConfig } from '@/providers/router/index.types';

export function getConfig() {
    const config = createConfig();

    const routerConfig: RouterConfig = { page404: config.page404, pages: {} };

    const navbarConfig: {
        [name: string]: { props: NavbarLinkProps; logged: UserLogged };
    } = {};

    Object.entries(config.pages).forEach(([name, item]) => {
        routerConfig.pages[name] = {
            url: item.url,
            navigation: item.router.navigation ?? null,
            component: item.router.component,
            updateParams: item.router.update
                ? item.router.update.updateParams
                : undefined,
            updateDefault: item.router.update
                ? item.router.update.updateDefault
                : undefined,
            logged: item.logged,
        };

        if (item.children) {
            Object.entries(item.children.pages).forEach(
                ([childName, child]) => {
                    routerConfig.pages[name + '-' + childName] = {
                        url: item.url + child.url,
                        logged: item.logged,
                        base: name,
                        renderChild: child.renderChild,
                    };
                },
            );
        }

        if (item.navbarLink) {
            let defaultUrl = item.url;
            if (item.children) {
                if (item.children.default) {
                    defaultUrl +=
                        item.children.pages[item.children.default].url;
                }
            }
            navbarConfig[name] = {
                props: {
                    className: item.navbarLink.className,
                    text: item.navbarLink.text,
                    href: defaultUrl,
                },
                logged: item.logged,
            };
        }
    });

    return { routerConfig, navbarConfig };
}
