import * as React from 'react';
import oneham from 'src/resources/images/oneham.png';
import onehamblack from 'src/resources/images/onehamblack.png';
import MenuList from 'src/home/MenuList';
import { MenuChoice, getMenuItem } from 'src/home/Home';

interface MenuProps {
    titles: string[];
    active: MenuChoice;
    changeLocation(path: string): void;
}
interface MenuState {
    hover: boolean;
    show: boolean;
}

class Menu extends React.Component<MenuProps, MenuState> {
    constructor(props: MenuProps) {
        super(props);
        this.state = {
            hover: false,
            show: false,
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

        return <div className="absolute pin-t pin-r z-10 pt-6 pr-6 flex flex-col justify-center">
            <div className="flex-no-grow cursor-pointer h-12 w-12 flex flex-col justify-center z-20"
                onMouseEnter={() => this.setState({hover: true})}
                onMouseLeave={() => this.setState({hover: false})}
                onClick={() => this.setState({show: !this.state.show})}
            >
                {this.state.show ? hamblackElem :hamElem}
            </div>
            <div className="absolute pin-r pin-y flex flex-col justify-center bg-white border-l border-black overflow-hidden"
                style={{
                    height: 'calc(100vh - 3rem)',
                    width: (this.state.show ? '270%' : '0%'),
                    transition: 'width 1s'
                }}
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