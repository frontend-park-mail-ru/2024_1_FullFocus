import { Link, LinkProps } from '../ui';
import backIconTmpl from './svgTemplates/index.ticksvg.pug';

export function getBackLink(parent: Element, props: LinkProps) {
    props.iconTmpl = backIconTmpl;
    return new Link(parent, props);
}
