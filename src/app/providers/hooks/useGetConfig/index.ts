import { UserLogged } from '@/widgets/navbar/ui/index.types';
import { createConfig } from '../useCreateConfig';
import { RouterConfig } from './../../router/index.types';
import { LinkProps } from '@/shared/uikit/link';

export function getConfig() {
    const config = createConfig();

    const routerConfig: RouterConfig = { page404: config.page404, pages: {} };

    const navbarConfig: {
        [name: string]: { props: LinkProps; logged: UserLogged };
    } = {};

    const mobileNavbarConfig: {
        [name: string]: { props: LinkProps; logged: UserLogged };
    } = {};

    Object.entries(config.pages).forEach(([name, item]) => {
        const match = item.url.match(/([/\w]+)({(\w+)})?/);
        const url = match.length >= 2 ? match[1] : undefined;
        const slugName = match.length >= 4 ? match[3] : undefined;

        if (url !== undefined) {
            routerConfig.pages[name] = {
                url: url,
                slugParamName: slugName,
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
                        iconName: item.navbarLink.iconName,
                        style: item.navbarLink.style,
                        imgName: item.navbarLink.imgName,
                    },
                    logged: item.logged,
                };

                if (item.navbarLink.mobileIconName) {
                    mobileNavbarConfig[name] = {
                        props: {
                            className: 'mobile-' + item.navbarLink.className,
                            text: item.navbarLink.text,
                            href: defaultUrl,
                            imgName: item.navbarLink.mobileIconName,
                        },
                        logged: item.logged,
                    };
                }
            }
        }
    });

    return { routerConfig, navbarConfig, mobileNavbarConfig };
}
