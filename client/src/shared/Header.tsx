import * as React from 'react';
import BackgroundImage from './BackgroundImage';
import { MenuChoice, getMenuItem, animTime } from 'src/home/Home';
import Menu from './Menu';

interface HeaderProps {
    type: MenuChoice;
    titles: string[];
    route(state: any):void;
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
        }
    }

    public componentDidMount() {
        setTimeout(() => this.setState({headerAnim: false}), animTime/2);
    }

    public route = (location: any) => {
        this.setState({headerAnim: true});
        setTimeout(() => this.props.route(location), animTime/2);
    }


    public render () {
        const {type, titles} = this.props;
        return <div className="flex-1 relative text-lg "
            style={this.state.headerAnim
                ? {
                    height: 'calc(100vh - 3rem)',
                    overflow: 'hidden',
                }
                : {}}
        >
            <div className="font-header">
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
                        this.route({
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
                    changeLocation={this.route}
                    active={type}
                    titles={titles}
                />
            </div>
            {this.props.children}
        </div>
    }
}

export default Header;