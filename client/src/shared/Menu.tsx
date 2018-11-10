import * as React from 'react';
import oneham from 'src/resources/images/oneham.png';
import onehamblack from 'src/resources/images/onehamblack.png';
import MenuList from './MenuList';
import { MenuChoice, getMenuItem, animTime } from 'src/home/Home';

interface MenuProps {
    titles: string[];
    active: MenuChoice;
    className?: string;
    changeLocation(path: string): void;
}
interface MenuState {
    hover: boolean;
    show: boolean;
    inside: boolean;
}
class Menu extends React.Component<MenuProps, MenuState> {
    constructor(props: MenuProps) {
        super(props);
        this.state = {
            hover: false,
            show: false,
            inside: true,
        }
    }

    public componentDidMount() {
        window.addEventListener('click', this.handleClickOutside);
    }

    public componentWillUnmount() {
        window.removeEventListener('click', this.handleClickOutside);
    }
    
    public handleClickOutside = () => {
        if (!this.state.inside) {
            this.setState({show: false, inside: true});
        }
    }

    public handleClicked = (clicked: MenuChoice) => {
        this.props.changeLocation(getMenuItem(clicked).link);
    }

    public render() {
        const oneHamElem = <img 
            src={oneham} alt=""
            className={"flex-no-grow " + (this.state.hover ? "my-1" : "my-px py-px")}
            style={{
                height: '8px',
                width: '40px'
            }}
        />
        
        const oneHamBlackElem = <img 
            src={onehamblack} alt=""
            className={"flex-no-grow " + (this.state.hover ? "mx-1" : "mx-px px-px")}
            style={{
                height: '40px',
                width: '8px'
            }}
        />

        const hamElem = <div className="flex-no-grow flex flex-col justify-center">
            {oneHamElem}
            {oneHamElem}
            {oneHamElem}
        </div>

        const hamblackElem = <div className="flex-no-grow flex justify-center">
            {oneHamBlackElem}
            {oneHamBlackElem}
            {oneHamBlackElem}
        </div>

        return <div 
            className={"absolute pin-t pin-r z-10 xs:h-48 lg:h-64 pt-6 xs:pr-4 lg:pr-8 pl-2 flex flex-col justify-start " + this.props.className}
            onMouseEnter={() => this.setState({inside: true})}
            onMouseLeave={() => this.setState({inside: false})}
        >
            <div className="flex-no-grow cursor-pointer h-12 w-12 flex flex-col justify-center z-20 "
                onMouseEnter={() => this.setState({hover: true})}
                onMouseLeave={() => this.setState({hover: false})}
                onClick={() => this.setState({show: !this.state.show})}
            >
                {this.state.show ? hamblackElem :hamElem}
            </div>
            <div 
                className={"absolute pin-r pin-t xs:h-48 lg:h-64 flex flex-col justify-end bg-white overflow-hidden border-black "}
                style={{
                    width: (this.state.show ? '240%' : '0%'),
                    transition: 'width ' + animTime + 'ms'
                }}
                onMouseEnter={() => this.setState({inside: true})}
                onMouseLeave={() => this.setState({inside: false})}
            >
                <MenuList 
                    className="flex-no-grow"
                    titles={this.props.titles}
                    active={this.props.active}
                    onClick={this.handleClicked}
                    onTouch={this.handleClicked}
                />
            </div>
        </div>
    }
}

export default Menu;