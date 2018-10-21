import * as React from 'react';
import oland from 'src/resources/images/oland.jpg';
import me from 'src/resources/images/me.jpg';
import BackgroundImage from 'src/home/BackgroundImage';
import Menu from 'src/shared/Menu';
import { MenuChoice, numItems , getMenuItem} from 'src/home/Home';
import { RouteComponentProps } from 'react-router-dom';

interface AboutMeState {
}

class AboutMe extends React.Component<RouteComponentProps, AboutMeState> {
    constructor(props: RouteComponentProps) {
        super(props);
    }

    public render() {
        return <div className="flex-1 flex flex-col relative">
            <div className="overflow-hidden shrinkHeight">
                <BackgroundImage 
                    backgroundImage={oland}
                />
            </div>
           
           <div className="absolute text-white text-5xl tracking-tighter font-bold pin-t pin-l z-10 pt-6 pl-16 fadeIn">
                {'ABOUT ME'}
           </div>
           <Menu 
                changeLocation={this.props.history.push}
                active={MenuChoice.AboutMe}
                titles={Array.from(Array(numItems).keys()).map(choice => getMenuItem(choice).title)}
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
                    I'm a social and happy guy and I'm at the moment doing my masters studies in 
                    engineering and computer science at the Royal Institute of Technology. 
                    I've completed my bachelors degree, where I did a bachelors thesis about on the 
                    subject of applying machine learning techniques on Automated Guided Vehicles in 
                    Amazon warehouses. 
                    </p>
                    <p>&nbsp;</p>
                    <p>
                    I'm a very meticulous person that always strives after perfection. 
                    I've it easy for me to learn new things fast, but I always want and try to understand 
                    every detail. Because it's then that I can perform at my best, 
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