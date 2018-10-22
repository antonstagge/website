import * as React from 'react';
import BackgroundImage from './BackgroundImage';
import { MenuChoice, getMenuItem } from 'src/home/Home';
import Menu from './Menu';

interface HeaderProps {
    type: MenuChoice;
    titles: string[];
    route(state: any):void;
}

interface HeaderState {
    shrink: boolean;
    hoverBack: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);
        this.state = {
            shrink: true,
            hoverBack: false,
        }
    }


    public render () {
        const {type, titles, route} = this.props;
        return <div>
            <div className={"overflow-hidden " + (this.state.shrink ? "shrinkHeight" : "growHeight")}>
                <BackgroundImage 
                    backgroundImage={getMenuItem(type).backgroundImage}
                />
            </div>
            <div className={"absolute text-white text-5xl tracking-tighter font-bold pin-t "
                + "pin-l z-10 pt-6 pl-16 h-64 flex flex-col justify-between cursor-pointer " 
                + (this.state.shrink ? "fadeIn" : "fadeOut")}
                onClick={() => {
                    this.setState({shrink: false});
                    setTimeout(() => route({
                        pathname: "/",
                        state: type
                    }), 500);
                }}
                onMouseEnter={() => this.setState({hoverBack: true})}
                onMouseLeave={() => this.setState({hoverBack: false})}
            >
                <div>
                    {getMenuItem(type).title}
                </div>
                <div className="text-lg tracking-normal cursor-pointer flex pb-2 "> 
                    <div 
                        className={"flex flex-col justify-center"}
                    >
                        <div className="flex-no-grow">
                                {'BACK'}
                            <div className={"bg-white h-1 hoverBar " + (this.state.hoverBack ? "w-full": "w-0") } />
                        </div>
                    </div>
                </div>
            </div>
            <Menu 
                className={(this.state.shrink ? "fadeIn" : "fadeOut")}
                changeLocation={route}
                active={type}
                titles={titles}
            />
        </div>
    }
}

export default Header;