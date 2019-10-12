import * as React from "react";
import resumePic from "src/resources/images/yosemity-falls.jpg";
import aboutMePic from "src/resources/images/vineyard.jpg";
import contactPic from "src/resources/images/typewriter.jpg";
import computer from "src/resources/images/desk.jpg";
import BackgroundImage from "src/shared/BackgroundImage";
import MenuList from "src/shared/MenuList";
import Socials from "./Socials";
import LogoWithName from "./LogoWithName";
import NoStyleLink from "src/shared/NoStyleLink";
import { RouteComponentProps } from "react-router-dom";

export enum MenuChoice {
  AboutMe = 0,
  Resume = 1,
  Portfolio = 2,
  Contact = 3
}
interface MenuItem {
  title: string;
  backgroundImage: string;
  number: MenuChoice;
  link: string;
}
export const animTime: number = 500;
export const numItems = 4;
export const getMenuItem = (choice: MenuChoice): MenuItem => {
  switch (choice) {
    case MenuChoice.AboutMe:
      return {
        title: "ABOUT ME",
        backgroundImage: aboutMePic,
        number: choice,
        link: "aboutme"
      };
    case MenuChoice.Resume:
      return {
        title: "RESUME",
        backgroundImage: resumePic,
        number: choice,
        link: "resume"
      };
    case MenuChoice.Portfolio:
      return {
        title: "PORTFOLIO",
        backgroundImage: computer,
        number: choice,
        link: "portfolio"
      };
    case MenuChoice.Contact:
      return {
        title: "CONTACT",
        backgroundImage: contactPic,
        number: choice,
        link: "contact"
      };
  }
};
interface HomeState {
  active: MenuChoice;
  hover: boolean;
}
class Home extends React.Component<RouteComponentProps, HomeState> {
  private container: React.RefObject<HTMLDivElement>;
  private childHeight: number = 0;
  private disableScroll: boolean = false;
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      active: this.props.location.state | 0,
      hover: false
    };
    this.container = React.createRef();
  }

  public componentDidMount() {
    if (this.container.current) {
      this.container.current.focus();
      this.childHeight = this.container.current.children[1].clientHeight;
      if (this.state.active !== 0) {
        this.container.current.children[this.state.active].scrollIntoView({
          block: "center"
        });
      } else {
        this.container.current.scrollTop = 1;
      }
    }
  }

  public loopScroll = () => {
    if (!this.container.current) {
      return;
    }

    console.log("scroll");

    const lowerLimit =
      this.childHeight * numItems + this.container.current.children.length;

    if (!this.disableScroll) {
      if (this.container.current.scrollTop >= lowerLimit) {
        this.container.current.scrollTop = 1;
        this.disableScroll = true;
      } else if (this.container.current.scrollTop <= 0) {
        this.container.current.scrollTop = lowerLimit - 3;
        this.disableScroll = true;
      }
    } else {
      setTimeout(() => {
        this.disableScroll = false;
      }, 100);
    }

    const chosen =
      Math.round(this.container.current.scrollTop / this.childHeight) %
      numItems;

    if (chosen !== this.state.active) {
      this.setState({ active: chosen });
    }
  };

  public clickedChoice = (choice: MenuChoice) => {
    this.props.history.push(getMenuItem(choice).link);
  };

  public doubleClickedChoice = (choice: MenuChoice) => {
    this.props.history.push(getMenuItem(choice).link);
  };

  public onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.props.history.push(getMenuItem(this.state.active).link);
    } else if (e.keyCode === 38 || e.keyCode === 40) {
      let newActive = null;
      if (e.keyCode === 38) {
        newActive = (this.state.active + (numItems - 1)) % numItems;
      } else {
        newActive = (this.state.active + (numItems + 1)) % numItems;
      }

      if (this.container.current) {
        this.container.current.children[newActive].scrollIntoView({
          block: "center",
          behavior: "smooth"
        });
      }
    }
  };

  public render() {
    return (
      <div className="flex-1 max-h-full relative overflow-hidden font-header xs:h-middle sm:h-middle bg-black">
        <div
          className="h-full overflow-y-scroll overflow-x-hidden scroll-snap invisible-scrollbar"
          ref={this.container}
          onScroll={this.loopScroll}
          onKeyDown={this.onKeyDown}
          tabIndex={1}
        >
          {Array.from(Array(numItems).keys()).map(choice => {
            return (
              <BackgroundImage
                key={choice}
                className="snap-point"
                backgroundImage={getMenuItem(choice).backgroundImage}
                onClick={() =>
                  this.props.history.push(getMenuItem(choice).link)
                }
                onMouseEnter={() => this.setState({ hover: true })}
                onMouseLeave={() => this.setState({ hover: false })}
                big={true}
              />
            );
          })}
          <BackgroundImage
            key={"extra0"}
            className="snap-point"
            backgroundImage={getMenuItem(0).backgroundImage}
            onClick={() => this.props.history.push(getMenuItem(0).link)}
            onMouseEnter={() => this.setState({ hover: true })}
            onMouseLeave={() => this.setState({ hover: false })}
            big={true}
          />
          <BackgroundImage
            key={"extra1"}
            className=""
            backgroundImage={getMenuItem(1).backgroundImage}
            onClick={() => this.props.history.push(getMenuItem(1).link)}
            onMouseEnter={() => this.setState({ hover: true })}
            onMouseLeave={() => this.setState({ hover: false })}
            big={true}
          />
        </div>
        <NoStyleLink
          to={getMenuItem(this.state.active).link}
          className="cursor-pointer flex flex-col justify-end xs:mb-8 sm:mb-16 xs:pl-8 sm:pl-16 z-30 absolute pin-b pin-l"
        >
          <div
            className={
              "flex-no-grow xs:text-4xl sm:text-7xl font-bold flex text-white"
            }
          >
            <div className="flex-no-grow fadeIn ">
              <div className="-mb-2">
                {getMenuItem(this.state.active).title}
              </div>
              <div
                className={
                  "bg-white h-3 hoverBar " +
                  (this.state.hover ? "w-full" : "w-0")
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
          onClick={this.clickedChoice}
          onTouch={this.clickedChoice}
          titles={Array.from(Array(numItems).keys()).map(
            choice => getMenuItem(choice).title
          )}
          active={this.state.active}
        />
      </div>
    );
  }
}

export default Home;
