import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import download from "src/resources/logos/download.png";
import downloadwhite from "src/resources/logos/downloadwhite.png";
import Button from "src/shared/Button";
import { CVItem } from "./CVItem";
import * as api from "src/api/api";

const PersonalDetails = () => (
  <table className="mb-6">
    <tbody>
      <tr>
        <td className="w-48">
          <img
            src={"IMAGE_PATH"}
            alt="me"
            className="h-48 border border-black object-cover"
          />
        </td>
        <td className="pb-0">
          <div className=" pt-24 pl-10">
            <div className="font-header text-4xl">Anton Stagge</div>
            <div >Telephone: 0702412556</div>
            <div >Email: antonstagge95@gmail.se</div>
            <div >Website: antonstagge.com</div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
);

interface ResumeState {
  download: boolean | null | undefined;
}

class Resume extends React.Component<{}, ResumeState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      download: undefined,
    };
  }
  public clickDownload = (data: any) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "AntonStaggeResume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  public downloadResume = () => {
    this.setState({ download: null });
    const resumeText = document.getElementById("resume-text");

    if (resumeText) {
      const personalData = ReactDOMServer.renderToString(<PersonalDetails />);
      let resumeData = resumeText.innerHTML;

      resumeData = resumeData.replace(/sm:text-base/g, "text-xs");
      resumeData = resumeData.replace(/sm:text-xl/g, "text-sm");
      resumeData = resumeData.replace(/sm:text-2xl/g, "text-base");
      resumeData = resumeData.replace(/sm:text-3xl/g, "text-xl");

      resumeData = resumeData.replace(/xs:text-xs/g, "");
      resumeData = resumeData.replace(/xs:text-xl/g, "");
      resumeData = resumeData.replace(/xs:text-sm/g, "");

      api
        .downloadCV({
          personal: personalData,
          resume: resumeData,
        } as api.PDFdata)
        .then(
          (resp) => {
            this.clickDownload(resp.data);
            this.setState({ download: true });
          },
          (badResp) => {
            console.error(badResp);
            this.setState({ download: false });
          }
        );
    }
  };

  public render() {
    return (
      <>
        <div className="m-4">
          <div id="resume-text">
            <div className="xs:text-xl sm:text-3xl pb-3 text-grey-dark">
              Experience
            </div>
            <CVItem 
              name="Senior Software Engineer"
              place="Quickbit"
              year="2022-"
              comment="Team Tech lead, Scrum Master and Fullstack developer. Designed microservice architecture. Built payment solutions with crypto currency support."
            />
            <CVItem
              name="Software Engineer"
              place="Kry/Livi AB"
              year="2019-2022"
              comment="Fullstack developer, on the clinician side of the product. I worked in the physical team, which focused on the web tools used in the care-facilities and Krys' physical offering."
            />
            <CVItem
              name="Software developer/consultant"
              place="Decerno"
              year="Summer 2018"
              comment="I was a fullstack developer, working as a consultant. I made a web application using a C# back-end with Domain Driven Design and a React front-end using redux."
            />
            <CVItem
              name="Software developer"
              place="Windfall VR"
              year="Summer 2017"
              comment="Developed a game in VR using Unity Engine and C#. It was the early phases of the game, and I got to develop some of the core mechanics."
            />
            <CVItem
              name="Software developer"
              place="SIPRI - Stockholm International Peace Research Institute"
              year="Spring 2016"
              comment="As part of a school project to recreate a database and web application used at SIPRI, I was front-end lead. We created the front-end using React."
            />

            <div className="xs:text-xl sm:text-3xl pt-8 pb-3 text-grey-dark">
              Education
            </div>
            <CVItem
              name="KTH"
              place="Royal Institute of Technology"
              year="2018-2020"
              comment="Master of Science degree in Computer Science and Engineering. Specialization in data science and machine learning."
            />
            <CVItem
              name="KTH"
              place="Royal Institute of Technology"
              year="2015-2018"
              comment="Bachelor of Science degree in Computer Science and Engineering."
            />
            <CVItem
              name="Foothill College"
              place="Silicon Valley, California, (USA)"
              year="2014-2015"
              comment="Intermediate and advanced courses in C++, pre-calculus and Introduction to Engineering."
            />

            <div className="xs:text-xl sm:text-3xl pt-8 pb-3 text-grey-dark">
              Volunteer Experience
            </div>
            <CVItem
              name="Reception"
              place="KTH"
              year="Summer 2017"
              comment="I was part of the 1 month long reception for the new students at KTH. I was a mentor to a group of 13 new students."
            />

            <div className="xs:text-xl sm:text-3xl pt-8 pb-3 text-grey-dark">
              Computer languages, frameworks and general skills
            </div>
            <div className="xs:text-xs sm:text-xl font-bold">
              Java, SQL, Python, JavaScript, TypeScript, React, Redux, FastAPI, Django, Next.js, Node, express
            </div>
            <div className="xs:text-sm sm:text-xl text-grey-dark py-2">
              Also familiar with:
            </div>
            <div className="xs:text-xs sm:text-xl font-bold">
              Haskell, Prolog, Unity Engine, C#, .Net, C++
            </div>
            <div className="xs:text-sm sm:text-xl text-grey-dark py-2">
              General skills:
            </div>
            <div className="xs:text-xs sm:text-xl font-bold">
              Git, Building Design Systems, Microservices architecture
              <div className="text-grey-dark xs:text-xs sm:text-base pt-2">
                References can be provided upon request.
              </div>
            </div>
          </div>
          <div className="flex justify-end items-end">
            <div className="pr-2">Download as PDF</div>
            <div className="">
              {this.state.download === undefined ? (
                <Button
                  valid={true}
                  className=""
                  childNormal={
                    <img
                      src={downloadwhite}
                      alt="Download"
                      className="xs:h-6 sm:h-12"
                    />
                  }
                  childHover={
                    <img
                      src={download}
                      alt="Download"
                      className="xs:h-6 sm:h-12"
                    />
                  }
                  onClick={this.downloadResume}
                />
              ) : this.state.download === null ? (
                <div>Loading...</div>
              ) : this.state.download ? (
                <div className="text-green">Success!</div>
              ) : (
                <div className="text-red">Failure.</div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Resume;
