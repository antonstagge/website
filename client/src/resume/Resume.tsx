import * as React from 'react';
import { MenuChoice, numItems , getMenuItem} from 'src/home/Home';
import { RouteComponentProps } from 'react-router-dom';
import Header from 'src/shared/Header';

const Resume: React.SFC<RouteComponentProps> = ({history}) => {
    
    const CVItem = (name: string, place:string, year:string, comment?:string, optional?:string) => <div className="flex">
            <div className="w-4/5">
                <div className="flex text-xl">
                    <div className="font-bold">{name}</div>
                    <div>,&nbsp;</div>
                    <div className="italic">{place}</div>
                    {optional !== undefined ? <div>,&nbsp;</div> : null}
                    {optional !== undefined ? <div className="">{optional}</div> : null}
                </div>
                <div className="pb-4 text-lg">
                    {comment}
                </div>
            </div>
            <div className="w-1/5">
                <div className="text-right font-bold whitespace-no-wrap">{year}</div>
            </div>     
        </div>

    return (<Header 
            type={MenuChoice.Resume}
            titles={Array.from(Array(numItems).keys()).map(choice => getMenuItem(choice).title)}
            route={history.push}
        >
            <div className="m-4">
                <div className="text-3xl pt-2 pb-4 text-grey-dark">Education</div>
                {CVItem('KTH', 'Royal Institute of Technology', '2015-',
                        "Currently in my fouth year doing my masters in computer science with a track in Data analysis.", "Computer Science and Engineering"
                    )}
                {CVItem('Foothill College', 'Community college in California (USA)', '2014-2015',
                        "Intermediate and advanced cource in C++, pre-calculus and Introduction to engineering."
                    )}
                {CVItem('Åva gymnasium', 'Natural science programme', '2011-2014')}
                

                <div className="text-3xl pt-8 pb-4 text-grey-dark">Experience</div>
                {CVItem('Software developer/consultant', 'Decerno' , 'Summer 2018',
                    "I was a fullstack developer, working as a consultant. I made a web application using a C# back-end with Domain Driven Design and a React front-end using redux."
                )}
                {CVItem('Software developer', 'Windfall VR' , 'Summer 2017',
                    "Developed a game in VR using Unity Engine and C#. was the early phases of the game."
                )}
                {CVItem('Software developer', 'SIPRI - Stockholm International Peace Research Institute' , 'Spring 2016',
                    "As part of a school project to recreate a database and web application used at SIPRI, I was front-end lead. We created the front-end using React."
                )}
                

                <div className="text-3xl pt-8 pb-4 text-grey-dark">Volunteer Experience</div>
                {CVItem('Reception', 'KTH' , 'Summer 2017',
                    "I was part of the 1 month long reception for the new students to KTH. I was a mentor to a group of 13 new students."
                )}

                <div className="text-3xl pt-8 pb-4 text-grey-dark">Computer languages, frameworks and general skills</div>
                <div className="text-xl font-bold">
                    Java,
                    C++,
                    SQL,
                    Python,
                    JavaScript,
                    TypeScript,
                    React Redux
                </div>
                <div className="text-xl text-grey-dark py-2">Also familiar with:</div>
                <div className="flex text-xl font-bold">
                    Haskell,
                    Prolog,
                    Unity Engine,
                    C#,
                    C
                </div>
                <div className="text-xl text-grey-dark py-2">General skills:</div>
                <div className="flex text-xl font-bold">
                    Github,
                    Bash,
                    Latex
                </div>
                <div className="pt-4 text-right text-grey-dark">
                    References can be provided upon request.
                </div>
            </div>
        </Header>
    )
}
export default Resume;