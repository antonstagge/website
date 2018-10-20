import * as React from 'react';
import mainimage from './images/main.jpg';
import oland from './images/oland.jpg';
import computer from './images/computer.jpg';
import vineyard from './images/vineyard.jpg';
// import { debounce } from 'ts-debounce';
import BackgroundImage from './BackgroundImage';
import MenuList from './MenuList';

enum MenuChoice {
    AboutMe = 0, 
    Resume = 1,
    Projects = 2,
    Contact = 3,
}

export enum ChangeDirection {
    UP,
    DOWN,
}

interface MenuItem {
    title: string;
    backgroundImage: string;
    number: MenuChoice;
}

interface HomeProps {};
interface HomeState {
    title: string;
    active: MenuChoice;
    changeTo: MenuChoice | -1;
    changeDirection: ChangeDirection;
    hover: boolean;
};

const animTime = 1000;
const items = 4;

class Home extends React.Component<HomeProps, HomeState> {
    public toggleTwice: boolean = false;
    public toggleTwiceRender: boolean = false;
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            title: this.getMenuItem(MenuChoice.AboutMe).title,
            active: MenuChoice.AboutMe,
            changeTo: -1,
            changeDirection: ChangeDirection.UP,
            hover: false,
        };
        // this.handleScroll = debounce(this.handleScroll, 40);
    }

    public componentDidMount() {
        window.addEventListener('wheel', this.handleScroll);
        window.addEventListener('keydown', this.handleKeyDown);
    }

    public componentWillUnmount() {
        window.removeEventListener('wheel', this.handleScroll);
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    public handleScroll = (e: WheelEvent) => {
        e.preventDefault();
        if (this.state.changeTo === -1 && this.toggleTwice) {
            this.toggleTwice = false;
            if (e.deltaY > 0) {
                this.changeUp();
            } else {
                this.changeDown();
            }
        } else if (this.state.changeTo === -1) {
            this.toggleTwice = true;
        } else {
            this.toggleTwice = false;
        }
    }

    public handleKeyDown = (e: KeyboardEvent) => {
        if (this.state.changeTo === -1) {
            if (e.keyCode === 40) {
                this.changeUp();
            } else if (e.keyCode === 38) {
                this.changeDown();
            }
        }
    }

    public changeUp = () => {
        const nextChange = (this.state.active + 1) % items
        this.setState({
            changeTo: nextChange, 
            changeDirection: ChangeDirection.UP
        });
        this.delayChange(nextChange);
    }

    public changeDown = () => {
        const nextChange = (this.state.active + (items-1)) % items
        this.setState({
            changeTo: nextChange,
            changeDirection: ChangeDirection.DOWN,
        });
        this.delayChange(nextChange);
    }

    public delayChange = (nextChange: MenuChoice) => {
        setTimeout(() => this.setState({title: this.getMenuItem(nextChange).title}), animTime/2)
        setTimeout(() => {
            this.setState({active: nextChange});
            setTimeout(() => this.setState({changeTo: -1}), 500);
        }, animTime);
    }

    public getMenuItem = (choice: MenuChoice): MenuItem => {
        switch(choice) {
            case MenuChoice.AboutMe: 
                return {
                    title: 'ABOUT ME',
                    backgroundImage: oland,
                    number: choice
                }
            case MenuChoice.Resume:
                return {
                    title: 'RESUME',
                    backgroundImage: mainimage,
                    number: choice
                }
            case MenuChoice.Projects:
                return {
                    title: 'PROJECTS',
                    backgroundImage: computer,
                    number: choice
                }
            case MenuChoice.Contact:
                return {
                    title: 'CONTACT',
                    backgroundImage: vineyard,
                    number: choice
                }
        }
    }

    public getClassName = (choice: MenuChoice) => {
        if (this.state.changeTo !== -1 && this.state.active !== this.state.changeTo && (this.state.changeTo === choice || this.state.active === choice)) {
            // getting swapped from or to
            if (this.state.active === 0 && this.state.changeTo === items-1) {
                // special case for from 0 to last
                return (choice === 0 ? "bgAnimDownFirst" : "bgAnimDownLast");
            } else if (this.state.active === items-1 && this.state.changeTo === 0) {
                // special case for from last to 0
                return (choice === 0 ? "bgAnimUpFirst" : "bgAnimUpLast");
            }
            return (this.state.changeDirection === ChangeDirection.UP ? "bgAnimUp" : "bgAnimDown");
        } else {
            // active or not
            return (this.state.active === choice ? "" : "hidden")
        }
    } 

    public render() {
        
        return <div
            className="h-full relative"
        >
            {Array.from(Array(items).keys()).map(choice => {
                return <BackgroundImage
                    key={choice}
                    backgroundImage={this.getMenuItem(choice).backgroundImage}
                    className={this.getClassName(this.getMenuItem(choice).number)}
                />
            })}
            <div className="absolute z-10 pin">
                <div className="flex text-white h-full">
                    <div className="flex-1 flex flex-col cursor-pointer"
                        onMouseEnter={() => this.setState({hover: true})}
                        onMouseLeave={() => this.setState({hover: false})}
                    >
                        <div className="flex-2"/>
                        <div className="flex-1 pl-16 flex">
                             <div 
                                className={"flex-no-grow text-5xl tracking-tighter font-bold " + 
                                (this.state.changeTo !== -1 
                                    ? "fadeOutIn"
                                    : ""
                                )
                            }>
                                {this.state.title}
                                <div className={"bg-white h-3 hoverBar " + (this.state.hover ? "w-full": "w-0") } />
                            </div>
                            <div className="flex-1"/>
                        </div>
                    </div>
                    <MenuList 
                        titles={Array.from(Array(items).keys()).map(choice => this.getMenuItem(choice).title)}
                        active={this.state.changeTo === -1 ? this.state.active : this.state.changeTo}
                    />
                </div>
            </div>
        </div>
    }
}


export default Home;