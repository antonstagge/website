import * as React from 'react';
import { MenuChoice } from 'src/home/Home';

export interface MenuListProps {
    titles: string[];
    active: number;
    className?: string;
    onClick(choice: MenuChoice): void;
    onDoubleClick?(choice: MenuChoice):void;
}
interface MenuListState {
    hover: number;
}
class MenuList extends React.Component<MenuListProps, MenuListState> {
    constructor(props: MenuListProps) {
        super(props);
        this.state = {
            hover: -1,
        }
    }
    public render() {
        const {titles, active,className, onClick, onDoubleClick} = this.props;
        return (<div className={"flex flex-col justify-center text-right fadeIn " + className}>
            {titles.map((title, index) => (
                <div 
                key={"menulist_" + index}
                onMouseEnter={() => this.setState({hover: index})}
                onMouseLeave={() => this.setState({hover: -1})}
                onClick={() => onClick(index)}
                onTouchStart={() => onClick(index)}
                onDoubleClick={(e: React.MouseEvent) => {
                    if (onDoubleClick !== undefined) {
                        e.preventDefault();
                        e.stopPropagation();
                        onDoubleClick(index);
                    }
                }}
                className={"flex-no-grow xs:h-6 lg:h-8 flex cursor-pointer " 
            }>
                <div className="flex-1 flex flex-col justify-center">
                    <div className={"flex-no-grow font-semibold whitespace-no-wrap MenuList " + 
                        (this.state.hover === -1 
                            ? index === active
                                ? "xs:text-lg lg:text-4xl"
                                : "xs:text-xs lg:text-half"
                            : index === this.state.hover
                                ? "xs:text-lg lg:text-4xl"
                                : "xs:text-xs lg:text-half"
                        )
                    } >
                        {title}
                    </div>
                </div>
                <div className="flex-no-grow xs:w-5 lg:w-10 flex flex-col justify-center">
                    <div className={"xs:pr-1 lg:pr-3 flex-no-grow text-xl font-bold " + 
                        (this.state.hover === -1 
                            ? index === active
                                ? ""
                                : "invisible"
                            : index === this.state.hover
                                ? ""
                                : "invisible"
                        )
                    }>
                        {"<"}
                    </div>
                </div>
            </div>
            ))}
    </div>)
    }
}
export default MenuList;