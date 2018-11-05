import * as React from 'react';
import me from 'src/resources/images/me.jpg';
import logoblack from 'src/resources/images/logoblack.png';
import { MenuChoice, numItems , getMenuItem} from 'src/home/Home';
import { RouteComponentProps } from 'react-router-dom';
import Header from 'src/shared/Header';

const AboutMe: React.SFC<RouteComponentProps>  = ({history}) => {
    return (
        <Header 
            type={MenuChoice.AboutMe}
            titles={Array.from(Array(numItems).keys()).map(choice => getMenuItem(choice).title)}
            route={history.push}
        >
            <div className="flex m-4 ">
                <div className="flex-no-grow">
                    <img 
                        src={me} alt="me"
                        className=" border border-black h-64"
                    />
                </div>
                <div className="flex-1 pl-4">
                    <p className="text-xl text-grey-dark pb-2">Who am I?</p>
                    <p>
                    My name is Anton Stagge and I'm a social, outgoing and happy guy. At the moment, I am doing my masters studies in 
                    engineering and computer science at the Royal Institute of Technology. 
                    I've completed my bachelors degree, where I did a bachelors thesis on the 
                    subject of applying machine learning techniques on Automated Guided Vehicles in 
                    Amazon warehouses. 
                    </p>
                    <p>&nbsp;</p>
                    <p>
                    I'm a very meticulous person that always strives for perfection. 
                    It is easy for me to learn new things quickly, but I always want, and try, to understand 
                    everything in detail. It is then I perform at my best;
                    one could say that I'm a fullstack thinker. 
                    </p>
                    <p>&nbsp;</p>
                    <p>
                    I believe that my fascination and love for programming started when I was a child 
                    playing with legos, bionicles and puzzles as well as getting a liking for math early on.
                    I like to view programming as a big lego problem or puzzle. You have to connect the pieces together to 
                    build something new and exciting. 
                    </p>
                </div>
            </div>
            <div className="flex m-4 ">
                <div className="flex-1 pr-4">
                    <p>
                    The transition from legos to actual programming took place when I studied a year at a college 
                    in Silicon Valley after graduation. Ever since I took the course Introduction to Programming in C++
                    there, I've devoted most of my waking hours to programming - both the time I spend in school and the
                    countless of small side projects I've started myself. 
                    </p>
                    <p>&nbsp;</p>
                    <p>
                    I will always continue to learn more in the field and art of programming and computer science. 
                    I don't think my motivation to do so will ever fade, because the field is ever growing and 
                    there are so many things and skills that I want to learn and master. And the sensation you get when
                    creating something from scratch is too good to ever stop chasing after.
                    </p>
                </div>
                <div className="flex-no-grow border border-black">
                    <img 
                        src={logoblack} alt="logo"
                        className="h-64 px-4"
                    />
                </div>
            </div>
        </Header>
    )
}
export default AboutMe;