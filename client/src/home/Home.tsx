import * as React from 'react';
import mainimage from './images/main.jpg';
import oland from './images/oland.jpg';
import computer from './images/computer.jpg';
// import { debounce } from 'ts-debounce';
import MenuItem from './MenuItem';

enum MenuChoice {
    AboutMe = 0, 
    Resume = 1,
    Projects = 2,
}

enum ChangeDirection {
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
    active: MenuChoice;
    changeTo: MenuChoice | -1;
    changeDirection: ChangeDirection;
};

const animTime = 1000;

class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            active: 0,
            changeTo: -1,
            changeDirection: ChangeDirection.UP,
        };
        // this.handleScroll = debounce(this.handleScroll, 300);
    }

    public componentDidMount() {
        window.addEventListener('wheel', this.handleScroll);
        window.addEventListener('keydown', this.handleKeyDown);
    }

    public componentWillUnmount() {
        window.removeEventListener('wheel', this.handleScroll);
        window.removeEventListener('keydown', this.handleKeyDown);
    }


    public changeUp = () => {
        const nextChange = (this.state.active + 1) % 3
        this.setState({
            changeTo: nextChange, 
            changeDirection: ChangeDirection.UP
        });
        setTimeout(()=>this.setState({active: nextChange, changeTo: -1}), animTime);
    }

    public changeDown = () => {
        const nextChange = (this.state.active + 2) % 3
        this.setState({
            changeTo: nextChange,
            changeDirection: ChangeDirection.DOWN,
        });
        setTimeout(() => this.setState({active: nextChange, changeTo: -1}), animTime);
    }
    public handleScroll = (e: WheelEvent) => {
        if (this.state.changeTo === -1) {
            if (e.deltaY > 0) {
                this.changeUp();
            } else {
                this.changeDown();
            }
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
        }
    }

    public getClassName = (choice: MenuChoice) => {
        return (this.state.changeTo === choice 
            ? (this.state.changeDirection === ChangeDirection.UP ? "bgAnimUp" : "bgAnimDown")
            : this.state.active === choice && this.state.changeTo !== -1
            ? (this.state.changeDirection === ChangeDirection.UP ? "bgAnimUp" : "bgAnimDown") 
            : this.state.active === choice ? "" : "hidden")
    } 

    public render() {

        console.log(this.state);

        // const prev = this.getMenuItem((this.state.active + 2) % 3);
        // const current = this.getMenuItem(this.state.active);
        // const next = this.getMenuItem((this.state.active + 1) % 3);

        return <div
            className="h-full"
        >
            <MenuItem 
                key={"prev" + this.state.active}
                title={'ABOUT ME'}
                backgroundImage={oland}
                nextTitle={'RESUME'}
                prevTitle={'PROJECTS'}
                className={this.getClassName(MenuChoice.AboutMe)}
            />
            <MenuItem 
                key={"current" + this.state.active}
                title={'RESUME'}
                backgroundImage={mainimage}
                nextTitle={'PROJECTS'}
                prevTitle={'ABOUT ME'}
                className={this.getClassName(MenuChoice.Resume)}
            />
            <MenuItem 
                key={"next" + this.state.active}
                title={'PROJECTS'}
                backgroundImage={computer}
                nextTitle={'ABOUT ME'}
                prevTitle={'RESUME'}
                className={this.getClassName(MenuChoice.Projects)}
            />
        </div>
    }
}


export default Home;