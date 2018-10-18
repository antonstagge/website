import * as React from 'react';
import mainimage from './images/main.jpg';
import oland from './images/oland.jpg';
import computer from './images/computer.jpg';
// import { debounce } from 'ts-debounce';

enum MenuChoice {
    AboutMe = 0, 
    Resume = 1,
    Projects = 2,
}

interface MenuItem {
    title: string;
    backgroundImage: string;
}

interface HomeProps {};
interface HomeState {
    active: MenuChoice;
    canChange: boolean;
};

class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            active: 0,
            canChange: true,
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

    public handleScroll = (e: WheelEvent) => {
        if (this.state.canChange) {
            if (e.deltaY > 0) {
                this.setState({active: (this.state.active + 1) % 3, canChange: false})
            } else {
                this.setState({active: (this.state.active + 2) % 3, canChange: false})
            }
            setTimeout(() => this.setState({canChange: true}), 1500)
        }
    }

    public handleKeyDown = (e: KeyboardEvent) => {
        if (e.keyCode === 40) {
            // up
            this.setState({active: (this.state.active + 1) % 3, canChange: false})
        } else if (e.keyCode === 38) {
            // down
            this.setState({active: (this.state.active + 2) % 3, canChange: false})
        }
    }

    public getMenuItem = (choice: MenuChoice): MenuItem => {
        switch(choice) {
            case MenuChoice.AboutMe: 
                return {
                    title: 'ABOUT ME',
                    backgroundImage: oland,
                }
            case MenuChoice.Resume:
                return {
                    title: 'RESUME',
                    backgroundImage: mainimage,
                }
            case MenuChoice.Projects:
                return {
                    title: 'PROJECTS',
                    backgroundImage: computer,
                }
        }
    }

    public render() {

        const prevMenuItem = this.getMenuItem((this.state.active + 2) % 3);
        const menuItem = this.getMenuItem(this.state.active);
        const nextMenuItem = this.getMenuItem((this.state.active + 1) % 3);

        return <div 
            style={{backgroundImage: "url(" + menuItem.backgroundImage + ")"}} 
            className="h-full bg-cover"
        >
            <div className="flex text-white h-full">
                <div className="flex-1 flex flex-col cursor-pointer">
                    <div className="flex-2 invisible">
                        padding
                    </div>
                    <div className="flex-1 pl-16 text-title tracking-tighter font-bold">
                        {menuItem.title}
                    </div>
                </div>
                <div className="flex-no-grow pr-10 flex flex-col justify-center text-right">
                    <div className="flex-no-grow text-half tracking-tighter font-semibold">
                        {prevMenuItem.title}
                    </div>
                    <div className="flex-no-grow text-3xl tracking-tighter font-semibold">
                        {menuItem.title}
                    </div>
                    <div className="flex-no-grow text-half tracking-tighter font-semibold">
                        {nextMenuItem.title}
                    </div>
                </div>
            </div>
        </div>
    }
}


export default Home;