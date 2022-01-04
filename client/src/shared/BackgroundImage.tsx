import * as React from "react";
import { MenuItem } from "src/home/Home";
import fadeframe from "src/resources/images/fade_frame.png";
import { Link, useLocation } from "react-router-dom";
interface BackgroundImageProps {
  className?: string;
  menuItem: MenuItem;
  onMouseEnter?(e: React.MouseEvent<HTMLDivElement>): void;
  onMouseLeave?(e: React.MouseEvent<HTMLDivElement>): void;
}

const BackgroundImage = ({
  className,
  menuItem,
  onMouseEnter,
  onMouseLeave,
}: BackgroundImageProps) => {
  const location = useLocation();
  return (
    <div
      className={
        className +
        " relative bg-grey-dark xs:h-middle sm:h-middle cursor-pointer "
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link to={location.pathname !== "/" ? "/" : menuItem.link}>
        <div className="absolute z-10 w-full h-full pointer-events-none" />
        <img
          src={fadeframe}
          alt="fadeframe"
          className="absolute w-full h-full "
          style={{
            opacity: 0.3,
            pointerEvents: "none",
          }}
        />
        <img
          src={menuItem.backgroundImage}
          alt="background"
          className={"min-w-full xs:h-middle sm:h-middle"}
          style={{
            maxWidth: "unset",
            objectFit: "contain",
          }}
        />
      </Link>
    </div>
  );
};

export default BackgroundImage;
