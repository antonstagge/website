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
            className="xs:text-sm sm:text-base"
        >
            <div className="flex xs:m-2 sm:m-4">
                <div className="flex-no-grow">
                    <img 
                        src={me} alt="me"
                        className=" border border-black xs:h-32 sm:h-64"
                    />
                </div>
                <div className="flex-1 pl-4">
                    <p className="xs:text-lg sm:text-xl text-grey-dark pb-2">Who am I?</p>
                    <p>
                    My name is Anton Stagge. I am a social, outgoing and happy guy. Right now, 
                    I am studying for my master's degree in 
                    engineering and computer science at the Royal Institute of Technology in Stockholm, Sweden. 
                    I have completed my bachelor's degree. My thesis was on the 
                    subject of applying machine learning techniques on Automated Guided Vehicles in 
                    Amazon warehouses. 
                    </p>
                    <p>&nbsp;</p>
                    <p>
                    I'm a very meticulous person that always strives for perfection. 
                    It is easy for me to learn new things quickly, but I still always want, and try, to understand 
                    everything in detail. It is then I perform at my best;
                    one could say that I am a full stack thinker. 
                    </p>
                    <p>&nbsp;</p>
                    <p>
                    I believe that my fascination and love for programming started already when I was a child 
                    playing with Legos. I also got a liking for math early on.
                    I like to view programming as a big Lego problem. You have to connect the correct pieces to 
                    build something new and exciting. 
                    </p>
                </div>
            </div>
            <div className="flex xs:m-2 sm:m-4 ">
                <div className="flex-1 pr-4">
                    <p>
                    The transition from Legos to actual programming took place when I studied a year at college 
                    in Silicon Valley. Ever since I took the course Introduction to Programming in C++
                    there, I have devoted most of my waking hours to programming - both in school and during spare
                    time with countless small side projects I've started. 
                    </p>
                    <p>&nbsp;</p>
                    <p>
                    I will always strive to learn more in the field and art of programming and computer science. 
                    I don't think my motivation to do so will ever fade, because the field is ever growing and 
                    there are so many things and skills that I want to learn and master. The fullfilling sensation you get when
                    creating something from scratch is too good to ever stop chasing after.
                    </p>
                </div>
                <div className="flex-no-grow ">
                    <img 
                        src={logoblack} alt="logo"
                        className="xs:h-32 sm:h-64"
                    />
                </div>
            </div>
        </Header>
    )
}
export default AboutMe;