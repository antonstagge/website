import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import downloadBlack from 'src/resources/logos/download.png';
import downloadwhite from 'src/resources/logos/downloadwhite.png';
import Button from 'src/shared/Button';
import { CVItem } from './CVItem';
import * as api from 'src/api/api';
import { PersonalDetails } from './PersonalDetails';

const Title = ({ first = false, text }: { first?: boolean; text: string }) => (
  <div
    className={
      'xs:text-xl sm:text-3xl pb-3 text-grey-dark ' + (!first ? 'pt-8' : '')
    }
  >
    {text}
  </div>
);

const SubTitle = ({ text }: { text: string }) => (
  <div className="xs:text-sm sm:text-xl text-grey-dark py-2">{text}</div>
);

const Text = ({ text }: { text: string }) => (
  <div className="xs:text-xs sm:text-xl font-bold">{text}</div>
);

const Resume = () => {
  const [download, setDownload] = React.useState<boolean | null | undefined>(
    undefined
  );

  const clickDownload = (data: any) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'AntonStaggeResume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadResume = () => {
    setDownload(null);
    const resumeText = document.getElementById('resume-text');

    if (resumeText) {
      const personalData = ReactDOMServer.renderToString(<PersonalDetails />);
      let resumeData = resumeText.innerHTML;

      resumeData = resumeData.replace(/sm:text-base/g, 'text-xs');
      resumeData = resumeData.replace(/sm:text-xl/g, 'text-sm');
      resumeData = resumeData.replace(/sm:text-2xl/g, 'text-base');
      resumeData = resumeData.replace(/sm:text-3xl/g, 'text-xl');

      resumeData = resumeData.replace(/xs:text-xs/g, '');
      resumeData = resumeData.replace(/xs:text-xl/g, '');
      resumeData = resumeData.replace(/xs:text-sm/g, '');

      api
        .downloadCV({
          personal: personalData,
          resume: resumeData,
        } as api.PDFdata)
        .then(
          (resp) => {
            clickDownload(resp.data);
            setDownload(true);
          },
          (badResp) => {
            console.error(badResp);
            setDownload(false);
          }
        );
    }
  };
  return (
    <>
      <div className="m-4">
        <div id="resume-text">
          <Title first={true} text="Experience" />
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

          <Title text="Education" />
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

          <Title text="Volunteer Experience" />
          <CVItem
            name="Reception"
            place="KTH"
            year="Summer 2017"
            comment="I was part of the 1 month long reception for the new students at KTH. I was a mentor to a group of 13 new students."
          />

          <Title text="Computer languages, frameworks and general skills" />
          <Text
            text={
              'Java, SQL, Python, JavaScript, TypeScript, React, Redux, FastAPI, Django, Next.js, Node, express'
            }
          />
          <SubTitle text="Also familiar with:" />
          <Text text="Haskell, Prolog, Unity Engine, C#, .Net, C++" />
          <SubTitle text="General skills:" />
          <Text text="Git, Building Design Systems, Microservices architecture" />
          <SubTitle text="References can be provided upon request." />
        </div>
        <div className="flex justify-end items-end">
          <div className="pr-2">Download as PDF</div>
          <div className="">
            {download === undefined ? (
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
                    src={downloadBlack}
                    alt="Download"
                    className="xs:h-6 sm:h-12"
                  />
                }
                onClick={downloadResume}
              />
            ) : download === null ? (
              <div>Loading...</div>
            ) : download ? (
              <div className="text-green">Success!</div>
            ) : (
              <div className="text-red">Failure.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Resume;
