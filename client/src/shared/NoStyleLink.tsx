import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface NoStyleLinkProps {
  className?: string;
  to: string;
  children: ReactNode;
}
const NoStyleLink = ({ to, className, children }: NoStyleLinkProps) => {
  return (
    <Link to={to} className={'noStyleLink ' + className}>
      {children}
    </Link>
  );
};
export default NoStyleLink;
