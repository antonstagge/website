import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { MenuChoice, numItems , getMenuItem} from 'src/home/Home';
import { RouteComponentProps } from 'react-router-dom';
import download from 'src/resources/logos/download.png';
import downloadwhite from 'src/resources/logos/downloadwhite.png';
import Header from 'src/shared/Header';
import Button from 'src/shared/Button';
import * as api from 'src/api/api';

interface ResumeState {
    download: boolean | null | undefined;
}

class Resume extends React.Component<RouteComponentProps, ResumeState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            download: undefined,
        }
    }
    public clickDownload = (data:any) => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'AntonStaggeResume.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    public downloadResume = () => {
        this.setState({download: null});
        const resumeText = document.getElementById("resume-text");

        const personalDetails = <table className="mb-6"><tbody>
        <tr>
            <td className="w-48">
                <img src="IMAGE_PATH" alt="me"
                    className="h-48 border border-black"
                />
            </td>
            <td className="pb-0">
                    <div className=" pt-20" >
                        <div className="font-header text-4xl">Anton Stagge</div>
                        <div className="font-bold">Telephone: 0702412556</div>
                        <div className="font-bold">Email: stagge@kth.se</div>
                        <div className="font-bold">Address: Slottsvägen 3, 18352 TÄBY</div>
                        <div className="font-bold">Website: antonstagge.com</div>
                    </div>
            </td>
        </tr>
        </tbody></table>

        if (resumeText) {
            const personalData = ReactDOMServer.renderToString(personalDetails);
            let resumeData = resumeText.innerHTML;
            
            resumeData = resumeData.replace(/sm:text-base/g, "text-xs");
            resumeData = resumeData.replace(/sm:text-xl/g, "text-sm");
            resumeData = resumeData.replace(/sm:text-2xl/g, "text-base");
            resumeData = resumeData.replace(/sm:text-3xl/g, "text-xl");

            resumeData = resumeData.replace(/xs:text-xs/g, "");
            resumeData = resumeData.replace(/xs:text-xl/g, "");
            resumeData = resumeData.replace(/xs:text-sm/g, "");
            
            api.downloadCV({
                personal: personalData,
                resume: resumeData,
            } as api.PDFdata).then(resp => {
                this.clickDownload(resp.data);
                this.setState({download: true});
            }, badResp => {
                console.error(badResp);
                this.setState({download: false});
            })
        }
    }

    public CVItem = (name: string, place:string, year:string, comment?:string, optional?:string) => <table className="w-full mb-2 xs:text-xs sm:text-2xl">
    <tbody>
        <tr>
            <td className="w-4/5">
            <span className="font-bold ">{name}</span>
            <span>,&nbsp;</span>
            <span className="italic ">{place}</span>
            {optional !== undefined ? <span>,&nbsp;</span> : null}
            {optional !== undefined ? <span className="">{optional}</span> : null}
            </td>
            <td className="w-1/5 text-right font-bold whitespace-no-wrap ">
                {year}
            </td>
        </tr>
        <tr className="pb-4 xs:text-xs sm:text-xl">
            <td className="w-4/5">
                {comment}
            </td>
            <td className="w-1/5 text-right font-bold whitespace-no-wrap ">
                &nbsp;
            </td>
        </tr>  
    </tbody>       
    </table>

    public render() { 
        return (<Header 
                type={MenuChoice.Resume}
                titles={Array.from(Array(numItems).keys()).map(choice => getMenuItem(choice).title)}
                route={this.props.history.push}
            >
                <div className="m-4">
                    <div id="resume-text">
                    <div className="xs:text-xl sm:text-3xl pb-3 text-grey-dark">Experience</div>
                    {this.CVItem('Software developer/consultant', 'Decerno' , 'Summer 2018',
                        "I was a fullstack developer, working as a consultant. I made a web application using a C# back-end with Domain Driven Design and a React front-end using redux."
                    )}
                    {this.CVItem('Software developer', 'Windfall VR' , 'Summer 2017',
                        "Developed a game in VR using Unity Engine and C#. It was the early phases of the game, and I got to develop some of the core mechanics."
                    )}
                    {this.CVItem('Software developer', 'SIPRI - Stockholm International Peace Research Institute' , 'Spring 2016',
                        "As part of a school project to recreate a database and web application used at SIPRI, I was front-end lead. We created the front-end using React."
                    )}

                    <div className="xs:text-xl sm:text-3xl pt-8 pb-3 text-grey-dark">Education</div>
                    {this.CVItem('KTH', 'Royal Institute of Technology', '2015-',
                            "Currently in my fourth year doing my masters in computer science with a track in Data analysis.", "Computer Science and Engineering"
                        )}
                    {this.CVItem('Foothill College', 'Silicon Valley, California, (USA)', '2014-2015',
                            "Intermediate and advanced courses in C++, pre-calculus and Introduction to Engineering."
                        )}
                    {this.CVItem('Åva gymnasium', 'Natural science programme', '2011-2014')}

                    <div className="xs:text-xl sm:text-3xl pt-8 pb-3 text-grey-dark">Volunteer Experience</div>
                    {this.CVItem('Reception', 'KTH' , 'Summer 2017',
                        "I was part of the 1 month long reception for the new students at KTH. I was a mentor to a group of 13 new students."
                    )}

                    <div className="xs:text-xl sm:text-3xl pt-8 pb-3 text-grey-dark">Computer languages, frameworks and general skills</div>
                    <div className="xs:text-xs sm:text-xl font-bold">
                        Java,
                        C++,
                        SQL,
                        Python,
                        JavaScript,
                        TypeScript,
                        React Redux
                    </div>
                    <div className="xs:text-sm sm:text-xl text-grey-dark py-2">Also familiar with:</div>
                    <div className="xs:text-xs sm:text-xl font-bold">
                        Haskell,
                        Prolog,
                        Unity Engine,
                        C#,
                        C
                    </div>
                    <div className="xs:text-sm sm:text-xl text-grey-dark py-2">General skills:</div>
                    <div className="xs:text-xs sm:text-xl font-bold">
                        Github,
                        Bash,
                        Latex
                        <div className="text-grey-dark xs:text-xs sm:text-base pt-2">
                            References can be provided upon request.
                        </div>
                    </div>
                    </div>
                    <div className="flex justify-end items-end">
                        <div className="pr-2">
                            Download as PDF
                        </div>
                        <div className="">
                            {this.state.download === undefined
                                ?   <Button
                                    valid={true}
                                    className=""
                                    childNormal={
                                        <img src={downloadwhite} alt="Download"
                                            className="xs:h-6 sm:h-12"
                                        />
                                    }
                                    childHover={
                                        <img src={download} alt="Download"
                                            className="xs:h-6 sm:h-12"
                                        />
                                    }
                                    onClick={this.downloadResume}
                                    />
                                : this.state.download === null 
                                    ? <div>Loading...</div>
                                    : this.state.download
                                        ? <div className="text-green">Success!</div>
                                        : <div className="text-red">Failure.</div>
                            }
                        </div>
                    </div>
                </div>
            </Header>
        )
    }
}
export default Resume;