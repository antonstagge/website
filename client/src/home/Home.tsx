import * as React from "react";
import resumePic from "src/resources/images/yosemity-falls.jpg";
import aboutMePic from "src/resources/images/vineyard.jpg";
import contactPic from "src/resources/images/typewriter.jpg";
import computer from "src/resources/images/desk.jpg";
import logowhite from "src/resources/images/logowhite.png";
import BackgroundImage from "src/shared/BackgroundImage";
import MenuList from "src/shared/MenuList";
import Socials from "./Socials";
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
  title: string;
  active: MenuChoice;
  hover: boolean;
}
class Home extends React.Component<RouteComponentProps, HomeState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      title: getMenuItem(this.props.location.state | 0).title,
      active: this.props.location.state | 0,
      hover: false
    };
  }
  public clickedChoice = (choice: MenuChoice) => {
    this.props.history.push(getMenuItem(choice).link);
  };

  public doubleClickedChoice = (choice: MenuChoice) => {
    this.props.history.push(getMenuItem(choice).link);
  };

  public render() {
    return (
      <div className="flex-1 max-h-full relative overflow-hidden font-header xs:h-middle sm:h-middle bg-black">
        <div className="h-full overflow-y-scroll overflow-x-hidden">
          {Array.from(Array(numItems).keys()).map(choice => {
            return (
              <BackgroundImage
                key={choice}
                backgroundImage={getMenuItem(choice).backgroundImage}
              />
            );
          })}
        </div>
        <div className="absolute pin overflow-hidden">
          <div className="flex text-white h-full">
            <div className="flex-1 flex flex-col xs:pl-8 sm:pl-16">
              <div className="fadeIn flex-no-grow flex items-center overflow-visible pt-6">
                <img src={logowhite} alt="" className="xs:h-16 sm:h-32" />
                <div className="flex">
                  <div className="xs:w-px xs:px-px sm:px-0 sm:w-1 xs:ml-1 sm:ml-2 bg-white" />
                  <div className="flex flex-col justify-end pl-px xs:text-xs sm:text-xl font-semibold">
                    <div className="flex-no-grow -mb-1 leading-normal">
                      ANTON
                    </div>
                    <div className="flex-no-grow">STAGGE</div>
                  </div>
                </div>
              </div>
              <NoStyleLink
                to={getMenuItem(this.state.active).link}
                className="flex-1 cursor-pointer flex flex-col justify-end xs:mb-8 sm:mb-16"
                onMouseEnter={() => this.setState({ hover: true })}
                onMouseLeave={() => this.setState({ hover: false })}
              >
                <div
                  className={
                    "flex-no-grow xs:text-4xl sm:text-7xl font-bold flex " +
                    (this.state.active !== -1 ? "fadeOutIn" : "TODO")
                  }
                >
                  <div className="flex-no-grow fadeIn ">
                    <div className="-mb-2">{this.state.title}</div>
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
            </div>
            <MenuList
              className="flex-no-grow"
              onClick={this.clickedChoice}
              onTouch={coiche => console.log("TOUCH TODO")}
              titles={Array.from(Array(numItems).keys()).map(
                choice => getMenuItem(choice).title
              )}
              active={this.state.active}
            />
          </div>
        </div>
        <Socials className="absolute pin-t pin-r xs:pr-5 sm:pr-10 pt-10 xs:mt-1 sm:mt-0 z-30" />
      </div>
    );
  }
}

export default Home;
