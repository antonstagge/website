import * as React from 'react';
import mainimage from 'src/resources/images/main.jpg';
import oland from 'src/resources/images/oland.jpg';
import vineyard from 'src/resources/images/vineyard.jpg';
import computer from 'src/resources/images/computer.jpg';
import BackgroundImage from 'src/shared/BackgroundImage';
import MenuList from 'src/shared/MenuList';
import Socials from './Socials';
import NoStyleLink from 'src/shared/NoStyleLink';
import { RouteComponentProps } from 'react-router-dom';

export enum MenuChoice {
    AboutMe = 0, 
    Resume = 1,
    Portfolio = 2,
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
    link: string;
}

interface HomeState {
    title: string;
    active: MenuChoice;
    changeTo: MenuChoice | -1;
    changeDirection: ChangeDirection;
    hover: boolean;
};

const animTime = 1000;
export const numItems = 4;

export const getMenuItem = (choice: MenuChoice): MenuItem => {
    switch(choice) {
        case MenuChoice.AboutMe: 
            return {
                title: 'ABOUT ME',
                backgroundImage: oland,
                number: choice,
                link: 'aboutme'
            }
        case MenuChoice.Resume:
            return {
                title: 'RESUME',
                backgroundImage: mainimage,
                number: choice,
                link: 'resume'
            }
        case MenuChoice.Portfolio:
            return {
                title: 'PORTFOLIO',
                backgroundImage: computer,
                number: choice,
                link: 'portfolio'
            }
        case MenuChoice.Contact:
            return {
                title: 'CONTACT',
                backgroundImage: vineyard,
                number: choice,
                link: 'contact'
            }
    }
}

class Home extends React.Component<RouteComponentProps, HomeState> {
    public toggleTwice: boolean = false;
    public toggleTwiceRender: boolean = false;
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            title: getMenuItem(this.props.location.state | 0).title,
            active: this.props.location.state | 0,
            changeTo: -1,
            changeDirection: ChangeDirection.UP,
            hover: false,
        };
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
                this.changeDown();
            } else {
                this.changeUp();
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
                this.changeDown();
            } else if (e.keyCode === 38) {
                this.changeUp();
            }
        }
    }

    public changeDown = () => {
        const nextChange = (this.state.active + 1) % numItems
        this.setState({
            changeTo: nextChange, 
            changeDirection: ChangeDirection.DOWN
        });
        this.delayChange(nextChange);
    }

    public changeUp = () => {
        const nextChange = (this.state.active + (numItems-1)) % numItems
        this.setState({
            changeTo: nextChange,
            changeDirection: ChangeDirection.UP,
        });
        this.delayChange(nextChange);
    }

    public delayChange = (nextChange: MenuChoice) => {
        setTimeout(() => this.setState({title: getMenuItem(nextChange).title}), animTime/2)
        setTimeout(() => {
            this.setState({active: nextChange});
            setTimeout(() => this.setState({changeTo: -1}), 500);
        }, animTime);
    }

    public getClassName = (choice: MenuChoice) => {
        if (this.state.changeTo !== -1 && this.state.active !== this.state.changeTo && (this.state.changeTo === choice || this.state.active === choice)) {
            // getting swapped from or to
            if (this.state.active === 0 && this.state.changeTo === numItems-1) {
                // special case for from 0 to last
                return (choice === 0 ? "bgAnimDownFirst" : "bgAnimDownLast");
            } else if (this.state.active === numItems-1 && this.state.changeTo === 0) {
                // special case for from last to 0
                return (choice === 0 ? "bgAnimUpFirst" : "bgAnimUpLast");
            }
            return (this.state.changeDirection !== ChangeDirection.UP ? "bgAnimUp" : "bgAnimDown");
        } else {
            // active or not
            return (this.state.active === choice ? "" : "hidden")
        }
    }

    public clickedChoice = (choice: MenuChoice) => {
        if (this.state.active + 1 === choice) {
            this.changeDown();
        } else if (this.state.active - 1 === choice) {
            this.changeUp();
        } else {
            this.setState({
                changeTo: choice,
                changeDirection: choice < this.state.active ? ChangeDirection.UP : ChangeDirection.DOWN,
            });
            this.delayChange(choice);
        }
    } 

    public doubleClickedChoice = (choice: MenuChoice) => {
        this.props.history.push(getMenuItem(choice).link);
    }

    public render() {
        return <div
            className="flex-1 max-h-full relative overflow-hidden"
            style={{
                height: 'calc(100vh - 3rem)'
            }}
        >
            {Array.from(Array(numItems).keys()).map(choice => {
                return <BackgroundImage
                    key={choice}
                    backgroundImage={getMenuItem(choice).backgroundImage}
                    className={this.getClassName(getMenuItem(choice).number)}
                />
            })}
            <div className="absolute z-10 pin">
                <div className="flex text-white h-full">
                    <div className="flex-1 flex flex-col">
                        <Socials 
                            className="flex-1"
                        />
                        <NoStyleLink 
                            to={getMenuItem(this.state.active).link}
                            className="flex-5 pl-16 cursor-pointer flex flex-col justify-end"
                            onMouseEnter={() => this.setState({hover: true})}
                            onMouseLeave={() => this.setState({hover: false})}
                        >
                             <div 
                                className={"flex-no-grow text-5xl tracking-tighter font-bold flex fadeIn" + 
                                (this.state.changeTo !== -1 
                                    ? "fadeOutIn"
                                    : ""
                                )
                            }>
                                <div className="flex-no-grow">
                                        {this.state.title}
                                    <div className={"bg-white h-3 hoverBar " + (this.state.hover ? "w-full": "w-0") } />
                                </div>
                                <div className="flex-1"/>
                            </div>
                        </NoStyleLink>
                        <div className="flex-1"/>
                    </div>
                    <MenuList 
                        className="flex-no-grow"
                        onClick={this.clickedChoice}
                        onDoubleClick={this.doubleClickedChoice}
                        titles={Array.from(Array(numItems).keys()).map(choice => getMenuItem(choice).title)}
                        active={this.state.changeTo === -1 ? this.state.active : this.state.changeTo}
                    />
                </div>
            </div>
        </div>
    }
}


export default Home;