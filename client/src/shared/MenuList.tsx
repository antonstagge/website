import * as React from 'react';
import { MenuChoice } from 'src/home/Home';

export interface MenuListProps {
    titles: string[];
    active: number;
    className?: string;
    onClick(choice: MenuChoice): void;
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
        const {titles, active,className, onClick} = this.props;
        return (<div className={"flex flex-col justify-center text-right " + className}>
            {titles.map((title, index) => (
                <div 
                key={"menulist_" + index}
                onMouseEnter={() => this.setState({hover: index})}
                onMouseLeave={() => this.setState({hover: -1})}
                onClick={() => onClick(index)}
                className={"flex-no-grow  h-6 flex cursor-pointer " 
            }>
                <div className="flex-1 flex flex-col justify-center">
                    <div className={"flex-no-grow tracking-tighter font-semibold whitespace-no-wrap MenuList " + 
                        (this.state.hover === -1 
                            ? index === active
                                ? "text-3xl"
                                : "text-half"
                            : index === this.state.hover
                                ? "text-3xl"
                                : "text-half"
                        )
                    } >
                        {title}
                    </div>
                </div>
                <div className="flex-no-grow w-10 flex flex-col justify-center">
                    <div className={"pr-3 flex-no-grow text-xl font-bold " + 
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