import * as React from 'react';
import oneham from 'src/resources/images/oneham.png';
import onehamblack from 'src/resources/images/onehamblack.png';
import MenuList from './MenuList';
import { MenuChoice, getMenuItem } from 'src/home/Home';

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
            this.setState({show: false, inside: false});
        }
    }

    public handleClicked = (clicked: MenuChoice) => {
        if (clicked === 0) {
            this.props.changeLocation("/");
        } else {
            this.props.changeLocation(getMenuItem(clicked - 1).link);
        }
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
            className={"absolute pin-t pin-r z-10 pt-6 pr-6 flex flex-col justify-center " + this.props.className}
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
                className={"absolute pin-r pin-y flex flex-col justify-center bg-white overflow-hidden border-black "
                    + (this.state.show ? "border-l border-b ": "border-b")
                }
                style={{
                    height: 'calc(100vh - 3rem)',
                    width: (this.state.show ? '270%' : '0%'),
                    transition: 'width 1s'
                }}
                onMouseEnter={() => this.setState({inside: true})}
                onMouseLeave={() => this.setState({inside: false})}
            >
                <MenuList 
                    className="flex-no-grow"
                    titles={['HOME'].concat(this.props.titles)}
                    active={this.props.active + 1}
                    onClick={this.handleClicked}
                />
            </div>
        </div>
    }
}

export default Menu;