import * as React from "react";
import BackgroundImage from "./BackgroundImage";
import { MenuChoice, getMenuItem, animTime } from "src/home/Home";
import Menu from "./Menu";

interface HeaderProps {
  type: MenuChoice;
  titles: string[];
  className?: string;
  route(state: any): void;
}
interface HeaderState {
  headerAnim: boolean;
  shrink: boolean;
  hoverBack: boolean;
}
class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      headerAnim: true,
      shrink: true,
      hoverBack: false,
    };
  }

  public componentDidMount() {
    setTimeout(() => this.setState({ headerAnim: false }), animTime / 2);
  }

  public delayRoute = (type: MenuChoice) => {
    this.setState({ headerAnim: true, shrink: false });
    setTimeout(
      () =>
        this.props.route({
          pathname: "/",
          state: type,
        }),
      animTime / 2
    );
  };

  public render() {
    const { type, titles, className } = this.props;
    return (
      <div
        className={
          className +
          " flex-1 relative " +
          (this.state.headerAnim
            ? "xs:h-middle sm:h-middle overflow-hidden"
            : "")
        }
      >
        <div className="font-header">
          <div
            className={
              "overflow-hidden " +
              (this.state.shrink
                ? "xs:shrinkHeight sm:shrinkHeight"
                : "xs:growHeight sm:growHeight")
            }
          >
            <BackgroundImage
              backgroundImage={getMenuItem(type).backgroundImage}
            />
          </div>
          <div
            className={
              "absolute text-white text-5xl font-bold pin-t " +
              "pin-l z-30 w-full pt-6 xs:px-4 sm:px-16 xs:h-48 sm:h-64 flex flex-col justify-between cursor-pointer " +
              (this.state.shrink ? "fadeIn" : "fadeOut")
            }
            onClick={() => this.delayRoute(type)}
            onTouchEnd={() => this.delayRoute(type)}
            onMouseEnter={() => this.setState({ hoverBack: true })}
            onMouseLeave={() => this.setState({ hoverBack: false })}
          >
            <div>{getMenuItem(type).title}</div>
            <div className="text-lg cursor-pointer flex pb-2 ">
              <div className={"flex flex-col justify-center"}>
                <div className="flex-no-grow">
                  {"BACK"}
                  <div
                    className={
                      "bg-white h-1 hoverBar " +
                      (this.state.hoverBack ? "w-full" : "w-0")
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <Menu
            className={this.state.shrink ? "fadeIn" : "fadeOut"}
            changeLocation={this.props.route}
            active={type}
            titles={titles}
          />
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Header;
