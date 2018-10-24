import * as React from 'react';
import { Link } from "react-router-dom";

interface NoStyleLinkProps {
    className?: string;
    to: string;
    onMouseEnter?(e: React.MouseEvent<HTMLAnchorElement>): void;
    onMouseLeave?(e: React.MouseEvent<HTMLAnchorElement>): void;
}
const NoStyleLink: React.SFC<NoStyleLinkProps> = ({to, className, onMouseEnter, onMouseLeave, children}) => {
    return (<Link to={to} className={"noStyleLink " + className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
    </Link>)
}
export default NoStyleLink;