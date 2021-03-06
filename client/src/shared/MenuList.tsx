import * as React from "react";
import { MenuChoice } from "src/home/Home";
import arrowUp from "src/resources/logos/arrow-up.png";

export interface MenuListProps {
  titles: string[];
  active: number;
  className?: string;
  showArrows?: boolean;
  onClick(choice: MenuChoice): void;
  onTouch(choice: MenuChoice): void;
}
interface MenuListState {
  hover: number;
}
class MenuList extends React.Component<MenuListProps, MenuListState> {
  private hasBeenTouched = false;
  constructor(props: MenuListProps) {
    super(props);
    this.state = {
      hover: -1
    };
  }
  public render() {
    const {
      titles,
      active,
      className,
      onClick,
      onTouch,
      showArrows
    } = this.props;
    return (
      <div
        className={
          "flex flex-col justify-center text-right fadeIn " + className
        }
      >
        {showArrows && (
          <div className="flex justify-end mb-12 mr-6 sm:mr-12">
            <img
              src={arrowUp}
              width={20}
              style={{
                height: "12px"
              }}
            />
          </div>
        )}
        {titles.map((title, index) => (
          <div
            key={"menulist_" + index}
            onMouseEnter={() => this.setState({ hover: index })}
            onMouseLeave={() => this.setState({ hover: -1 })}
            onClick={() => !this.hasBeenTouched && onClick(index)}
            onTouchStart={e => {
              this.hasBeenTouched = true;
              setTimeout(() => (this.hasBeenTouched = false), 500);
              onTouch(index);
            }}
            className={"flex-no-grow xs:h-6 sm:h-8 flex cursor-pointer "}
          >
            <div className="flex-1 flex flex-col justify-center">
              <div
                className={
                  "flex-no-grow font-semibold whitespace-no-wrap MenuList " +
                  (this.state.hover === -1
                    ? index === active
                      ? "xs:text-lg sm:text-4xl"
                      : "xs:text-xs sm:text-half"
                    : index === this.state.hover
                    ? "xs:text-lg sm:text-4xl"
                    : "xs:text-xs sm:text-half")
                }
              >
                {title}
              </div>
            </div>
            <div className="flex-no-grow xs:w-5 sm:w-10 flex flex-col justify-center">
              <div
                className={
                  "xs:pr-1 sm:pr-3 flex-no-grow text-xl font-bold " +
                  (this.state.hover === -1
                    ? index === active
                      ? ""
                      : "invisible"
                    : index === this.state.hover
                    ? ""
                    : "invisible")
                }
              >
                {"<"}
              </div>
            </div>
          </div>
        ))}
        {showArrows && (
          <div className="flex justify-end mt-12 mr-6 sm:mr-12">
            <img
              src={arrowUp}
              width={20}
              className=""
              style={{
                transform: "rotate(180deg)",
                height: "12px"
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
export default MenuList;
