import * as React from 'react';
import BackgroundImage from './BackgroundImage';
import { MenuChoice, getMenuItem } from 'src/home/Home';
import Menu from './Menu';
// import {animTime} from 'src/home/Home';

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
        return <div className="font-header">
            <div className={"overflow-hidden " + (this.state.shrink ? "shrinkHeight" : "growHeight")}>
                <BackgroundImage 
                    backgroundImage={getMenuItem(type).backgroundImage}
                />
            </div>
            <div className={"absolute text-white text-5xl font-bold pin-t "
                + "pin-l z-10 w-full pt-6 px-16 h-64 flex flex-col justify-between cursor-pointer " 
                + (this.state.shrink ? "fadeIn" : "fadeOut")}
                onClick={() => {
                    this.setState({shrink: false});
                    route({
                        pathname: "/",
                        state: type
                    });
                }}
                onMouseEnter={() => this.setState({hoverBack: true})}
                onMouseLeave={() => this.setState({hoverBack: false})}
            >
                <div>
                    {getMenuItem(type).title}
                </div>
                <div className="text-lg cursor-pointer flex pb-2 "> 
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