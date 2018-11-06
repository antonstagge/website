import * as React from 'react';
import grassoland from 'src/resources/images/grassoland.jpg';
import oland from 'src/resources/images/oland_no_border.jpg';

import vineyard from 'src/resources/images/vineyard.jpg';

import computer from 'src/resources/images/computer.jpg';

import logowhite from 'src/resources/images/logowhite.png';
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
interface MenuItem {
    title: string;
    backgroundImage: string;
    number: MenuChoice;
    link: string;
}
export const animTime:number = 1000;
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
                backgroundImage: grassoland,
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

enum ChangeDirection {
    UP,
    DOWN,
}
interface HomeState {
    title: string;
    active: MenuChoice;
    changeTo: MenuChoice | -1;
    changeDirection: ChangeDirection;
    hover: boolean;
};
class Home extends React.Component<RouteComponentProps, HomeState> {
    private toggleTwice: boolean = false;
    private firstTimeOutId = setTimeout(() => {/**/}, 0) as unknown as number;
    private pStart = {x: 0, y:0};
    private pStop = {x:0, y:0};
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


    public swipeStart = (e:any) => {
        if (typeof e.targetTouches !== "undefined"){
            const touch = e.targetTouches[0];
            this.pStart.x = touch.screenX;
            this.pStart.y = touch.screenY;
        } else {
            this.pStart.x = e.screenX;
            this.pStart.y = e.screenY;
        }
    }

    public swipeEnd = (e:any) => {
        if (e.changedTouches !== "undefined"){
            const touch = e.changedTouches[0];
            this.pStop.x = touch.screenX;
            this.pStop.y = touch.screenY;
        } else {
            this.pStop.x = e.screenX;
            this.pStop.y = e.screenY;
        }

        this.swipeCheck();
    }

    public swipeCheck=() =>{
        const changeY = this.pStart.y - this.pStop.y;
        if (this.state.changeTo === -1) {
            if (changeY < -50) {
                this.changeUp()
            } else if (changeY > 50) {
                this.changeDown();
            }
        }
    }

    public componentDidMount() {
        window.addEventListener('wheel', this.handleScroll, {passive: true});
        window.addEventListener('keydown', this.handleKeyDown, {passive: true});
        window.addEventListener('touchstart', this.swipeStart, false);
        window.addEventListener('touchend', this.swipeEnd, false);
    }

    public componentWillUnmount() {
        window.removeEventListener('wheel', this.handleScroll);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('touchstart', this.swipeStart, false);
        window.removeEventListener('touchend', this.swipeEnd, false);
        const lastTimeOutId = setTimeout(() => {/**/}, 0) as unknown as number;
        while (this.firstTimeOutId !== lastTimeOutId) {
            clearTimeout(++this.firstTimeOutId);
        }
    }

    public handleScroll = (e: WheelEvent) => {
        if (this.state.changeTo === -1 && this.toggleTwice) {
            this.toggleTwice = false;
            if (e.deltaY > 0) {
                this.changeDown();
            } else {
                this.changeUp();
            }
        } else {
            this.state.changeTo === -1 ? this.toggleTwice = true : this.toggleTwice = false;
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
        setTimeout(() => this.setState({title: getMenuItem(nextChange).title}), animTime/2);
        
        setTimeout(() => {
            this.setState({active: nextChange});
            setTimeout(() => this.setState({changeTo: -1}), animTime/2);
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
            className="flex-1 max-h-full relative overflow-hidden font-header xs:h-middle lg:h-middle"
        >
            {Array.from(Array(numItems).keys()).map(choice => {
                return <BackgroundImage
                    key={choice}
                    backgroundImage={getMenuItem(choice).backgroundImage}
                    className={this.getClassName(getMenuItem(choice).number)}
                />
            })}
            <div className="absolute z-10 pin overflow-hidden">
                <div className="flex text-white h-full">
                    <div className="flex-1 flex flex-col xs:pl-8 lg:pl-16">
                        <div className="fadeIn flex-no-grow flex items-center overflow-visible pt-6">
                            <img src={logowhite} alt=""
                                className="xs:h-16 lg:h-32"
                            />
                            <div className="flex">
                                <div className="xs:w-px xs:px-px lg:px-0 lg:w-1 xs:ml-1 lg:ml-2 bg-white"/>
                                <div className="flex flex-col justify-end pl-px xs:text-xs lg:text-xl font-semibold">
                                    <div className="flex-no-grow -mb-1 leading-normal">
                                        ANTON 
                                    </div>
                                    <div className="flex-no-grow">
                                        STAGGE
                                    </div>
                                </div>
                            </div>
                        </div>
                        <NoStyleLink 
                            to={getMenuItem(this.state.active).link}
                            className="flex-1 cursor-pointer flex flex-col justify-end mb-16"
                            onMouseEnter={() => this.setState({hover: true})}
                            onMouseLeave={() => this.setState({hover: false})}
                        >
                             <div 
                                className={"flex-no-grow xs:text-4xl lg:text-7xl font-bold flex " + 
                                (this.state.changeTo !== -1 
                                    ? "fadeOutIn"
                                    : ""
                                )
                            }>
                                <div className="flex-no-grow fadeIn ">
                                    <div className="-mb-2">{this.state.title}</div>
                                    <div className={"bg-white h-3 hoverBar " + (this.state.hover ? "w-full": "w-0") } />
                                </div>
                                <div className="flex-1"/>
                            </div>
                        </NoStyleLink>
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
            <Socials 
                className="absolute pin-t pin-r xs:pr-5 lg:pr-10 pt-10 xs:mt-1 lg:mt-0 z-10"
            />
        </div>
    }
}


export default Home;