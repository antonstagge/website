import * as React from 'react';
import me from 'src/resources/images/me.jpg';
import { MenuChoice, numItems , getMenuItem, animTime} from 'src/home/Home';
import { RouteComponentProps } from 'react-router-dom';
import Header from 'src/shared/Header';

interface AboutMeState {
    headerAnim: boolean;
}

class AboutMe extends React.Component<RouteComponentProps, AboutMeState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            headerAnim: true,
        }
    }

    public componentDidMount() {
        setTimeout(() => this.setState({headerAnim: false}), animTime/2);
    }

    public route = (location: any) => {
        this.setState({headerAnim: true});
        setTimeout(() => this.props.history.push(location), animTime/2);
    }

    public render() {
        return <div className="flex-1 flex flex-col relative "
            style={this.state.headerAnim
                ? {
                    height: 'calc(100vh - 3rem)',
                    overflow: 'hidden',
                }
                : {}}
        >
            <Header 
                type={MenuChoice.AboutMe}
                titles={Array.from(Array(numItems).keys()).map(choice => getMenuItem(choice).title)}
                route={this.route}
            />
            <div className="flex m-4">
                <div className="flex-no-grow">
                    <img 
                        src={me} alt="me"
                        className="m-1 border border-black w-32"
                    />
                </div>
                <div className="flex-1 pl-4 text-lg">
                    <p>
                    My name is Anton Stagge and I'm a social, outgoing and happy guy and I'm at the moment doing my masters studies in 
                    engineering and computer science at the Royal Institute of Technology. 
                    I've completed my bachelors degree, where I did a bachelors thesis about on the 
                    subject of applying machine learning techniques on Automated Guided Vehicles in 
                    Amazon warehouses. 
                    </p>
                    <p>&nbsp;</p>
                    <p>
                    I'm a very meticulous person that always strives after perfection. 
                    It is easy for me to learn new things quickly, but I always want, and try, to understand 
                    everything in detail. It is then that I can perform best, 
                    one could say that I'm a fullstack thinker. 
                    </p>
                    <p>&nbsp;</p>
                    <p>
                    I believe that my fascination and love for programming started when I was a child 
                    playing with legos, bionicles and puzzles as well as getting a liking for math early on.
                    I like to view programming as a big lego problem or puzzle. You have to connect the pieces together to 
                    build something new and exciting. 
                    </p>
                    <p>
                    The transition from legos to actual programming took place when I studied a year at a college 
                    in Silicon Valley after graduation. Ever since my first introduction to programming in C++ course
                    there, I've devoted most of my waking hours to programming. Both the time I spend in school and the
                    countless of small side projects I've started up on myself. 
                    </p>
                    <p>&nbsp;</p>
                    <p>
                    I will always continue to learn more in the field and art of programming and computer science. 
                    I don not think my motivation to do so will ever die out, because the field is ever growing and 
                    there are so many things and skills that I want to learn and master. And the sensation you get when
                    creating something from scratch is too good to ever stop chasing after.
                    </p>
                </div>
           </div>
        </div>
    }
}

export default AboutMe;