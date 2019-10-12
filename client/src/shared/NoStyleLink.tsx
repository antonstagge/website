import * as React from "react";
import { Link } from "react-router-dom";

interface NoStyleLinkProps {
  className?: string;
  to: string;
}
const NoStyleLink: React.SFC<NoStyleLinkProps> = ({
  to,
  className,
  children
}) => {
  return (
    <Link to={to} className={"noStyleLink " + className}>
      {children}
    </Link>
  );
};
export default NoStyleLink;
