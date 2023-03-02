import { useCallback, useEffect, useRef, useState } from "react";
import resumePic from "src/resources/images/yosemity-falls-min.jpg";
import aboutMePic from "src/resources/images/vineyard-min.jpg";
import contactPic from "src/resources/images/typewriter-min.jpg";
import computer from "src/resources/images/desk-min.jpg";
import BackgroundImage from "./components/BackgroundImage";
import MenuList from "./components/MenuList";
import Socials from "./components/Socials";
import LogoWithName from "./components/LogoWithName";
import NoStyleLink from "src/shared/NoStyleLink";
import { useLocation } from "react-router-dom";
import { BackButton } from "./components/BackButton";

export enum MenuChoice {
  AboutMe = 0,
  Resume = 1,
  Portfolio = 2,
  Contact = 3,
}

export const menuItems: { [choice: number]: MenuItem } = {
  [MenuChoice.AboutMe]: {
    title: "ABOUT ME",
    backgroundImage: aboutMePic,
    number: MenuChoice.AboutMe,
    link: "/aboutme",
  },
  [MenuChoice.Resume]: {
    title: "RESUME",
    backgroundImage: resumePic,
    number: MenuChoice.Resume,
    link: "/resume",
  },
  [MenuChoice.Portfolio]: {
    title: "PORTFOLIO",
    backgroundImage: computer,
    number: MenuChoice.Portfolio,
    link: "/portfolio",
  },
  [MenuChoice.Contact]: {
    title: "CONTACT",
    backgroundImage: contactPic,
    number: MenuChoice.Contact,
    link: "/contact",
  },
};
export interface MenuItem {
  title: string;
  backgroundImage: string;
  number: MenuChoice;
  link: string;
}

export const numItems = 4;
export const getMenuItem = (choice: MenuChoice): MenuItem => menuItems[choice];
const getMenuChoiceByPathname = (pathname: string): MenuChoice | null =>
  Object.values(menuItems).find((v) => v.link === pathname)?.number ?? null;

const Home = () => {
  const container = useRef<HTMLDivElement>(null);
  const disableScroll = useRef<boolean>(false);
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (container.current) {
      container.current.focus();
      if (active !== 0) {
        container.current.children[active].scrollIntoView({
          block: "center",
        });
      } else {
        container.current.scrollTop = 1;
      }
    }
  }, [container]);

  useEffect(() => {
    if (container.current) {
      if (getMenuItem(active).link !== location.pathname) {
        const newActive = getMenuChoiceByPathname(location.pathname);
        if (newActive !== null) {
          container.current.children[newActive].scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
          setActive(newActive);
        }
      }
    }
  }, [container, location.pathname]);

  const loopScroll = useCallback(() => {
    if (!container.current) {
      return;
    }

    const childHeight = container.current.children[1].clientHeight;
    if (!disableScroll.current) {
      if (
        container.current.scrollTop + 2 * childHeight >=
        container.current.scrollHeight
      ) {
        container.current.scrollTop = 1;
        disableScroll.current = true;
      } else if (container.current.scrollTop <= 0) {
        container.current.scrollTop =
          container.current.scrollHeight - 2 * childHeight;
        disableScroll.current = true;
      }
    } else {
      setTimeout(() => {
        disableScroll.current = false;
      }, 40);
    }

    const chosen =
      Math.round(container.current.scrollTop / childHeight) % numItems;

    if (chosen !== active) {
      setActive(chosen);
    }
  }, [container, active]);
  return (
    <div className="flex-1 relative overflow-hidden font-header xs:h-middle sm:h-middle bg-black">
      <div
        className="xs:h-middle sm:h-middle overflow-y-scroll overflow-x-hidden scroll-snap invisible-scrollbar"
        ref={container}
        onScroll={loopScroll}
        tabIndex={1}
      >
        {Array.from(Array(numItems).keys()).map((choice) => {
          return (
            <BackgroundImage
              key={choice}
              className="snap-point"
              menuItem={getMenuItem(choice)}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            />
          );
        })}
        <BackgroundImage
          key={"extra0"}
          className="snap-point"
          menuItem={getMenuItem(0)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
        <BackgroundImage
          key={"extra1"}
          className=""
          menuItem={getMenuItem(1)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      </div>
      {isHome && (
        <>
          <NoStyleLink
            to={getMenuItem(active).link}
            className="cursor-pointer flex flex-col justify-end xs:mb-8 sm:mb-16 xs:pl-8 sm:pl-16 z-30 absolute pin-b pin-l"
          >
            <div
              className={
                "flex-no-grow xs:text-4xl sm:text-7xl font-bold flex text-white"
              }
            >
              <div className="flex-no-grow fadeIn ">
                <div className="-mb-2">{getMenuItem(active).title}</div>
                <div
                  className={
                    "bg-white h-3 hoverBar " + (hover ? "w-full" : "w-0")
                  }
                />
              </div>
              <div className="flex-1" />
            </div>
          </NoStyleLink>
          <LogoWithName />
          <Socials className="absolute pin-t pin-r xs:pr-5 sm:pr-10 pt-10 xs:mt-1 sm:mt-0 z-30" />
          <MenuList
            className="absolute pin-t pin-b pin-r z-20 text-white"
            showArrows={true}
            menuItems={Array.from(Array(numItems).keys()).map((choice) =>
              getMenuItem(choice)
            )}
            active={active}
          />
        </>
      )}
      {!isHome && (
        <>
          <BackButton hover={hover} />
          <div
            className={
              "absolute text-white text-5xl font-bold pin-t pin-l pt-6 xs:px-4 sm:px-8 xs:h-48 sm:h-64 fadeIn pointer-events-none"
            }
          >
            <div>{getMenuItem(active).title}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
