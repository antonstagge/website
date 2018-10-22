import * as React from 'react';
import { MenuChoice, numItems , getMenuItem} from 'src/home/Home';
import { RouteComponentProps } from 'react-router-dom';
import Header from 'src/shared/Header';

interface ResumeState {
}

class Resume extends React.Component<RouteComponentProps, ResumeState> {
    constructor(props: RouteComponentProps) {
        super(props);
    }

    public CVItem = (name: string, place:string, year:string, comment?:string, optional?:string) => <div className="flex">
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

    public render() {
        return <div className="flex-1 flex flex-col relative">
            <Header 
                type={MenuChoice.Resume}
                titles={Array.from(Array(numItems).keys()).map(choice => getMenuItem(choice).title)}
                route={this.props.history.push}
            />
           <div className="m-4">
               <div className="text-3xl pt-2 pb-4 text-grey-dark">Education</div>
               {this.CVItem('Åva gymnasium', 'Natural science programme', '2011-2014')}
               {this.CVItem('Foothill College', 'Community college in California (USA)', '2014-2015',
                    "Intermediate and advanced cource in C++, pre-calculus and Introduction to engineering."
                )}
               {this.CVItem('KTH', 'Royal Institute of Technology', '2015-',
                    "Currently in my fouth year doing my masters in computer science with a track in Data analysis.", "Computer Science and Engineering"
                )}

                <div className="text-3xl pt-8 pb-4 text-grey-dark">Experience</div>
                {this.CVItem('Software developer', 'SIPRI - Stockholm International Peace Research Institute' , 'spring 2016',
                    "As part of a school project to recreate a database and web application used at SIPRI, I was front-end lead. We created the front-end using React."
                )}
                {this.CVItem('Software developer', 'Windfall VR' , 'summer 2017',
                    "Developed a game in VR using Unity Engine and C#. This was the early phases of the game."
                )}
                {this.CVItem('Software developer/consultant', 'Decerno' , 'summer 2018',
                    "I was a fullstack developer, working as a summer consultant. I made a web application using a C# back-end with Domain Driven Design and a React front-end using redux."
                )}

                <div className="text-3xl pt-8 pb-4 text-grey-dark">Volunteer Experience</div>
                {this.CVItem('Reception', 'KTH' , 'summer 2017',
                    "I was part of the 1 month long reception for the new students to KTH. I was a mentor to a group of 13 new students."
                )}

                <div className="text-3xl pt-8 pb-4 text-grey-dark">Computer languages, frameworks and general skills</div>
                <div className="flex text-xl">
                    <div className="font-bold">Java,&nbsp;</div>
                    <div className="font-bold">C++,&nbsp;</div>
                    <div className="font-bold">SQL,&nbsp;</div>
                    <div className="font-bold">Python,&nbsp;</div>
                    <div className="font-bold">JavaScript,&nbsp;</div>
                    <div className="font-bold">TypeScript,&nbsp;</div>
                    <div className="font-bold">React Redux&nbsp;</div>
                </div>
                <div className="text-xl text-grey-dark py-2">Also familiar with:</div>
                <div className="flex text-xl">
                    <div className="font-bold">Haskell,&nbsp;</div>
                    <div className="font-bold">Prolog,&nbsp;</div>
                    <div className="font-bold">Unity Engine,&nbsp;</div>
                    <div className="font-bold">C#,&nbsp;</div>
                    <div className="font-bold">C&nbsp;</div>
                </div>
                <div className="text-xl text-grey-dark py-2">General skills:</div>
                <div className="flex text-xl">
                    <div className="font-bold">Github,&nbsp;</div>
                    <div className="font-bold">Bash,&nbsp;</div>
                    <div className="font-bold">Latex&nbsp;</div>
                </div>
                <div className="pt-4 text-right text-grey-dark">
                    References can be provided upon request.
                </div>
           </div>
        </div>
    }
}

export default Resume;