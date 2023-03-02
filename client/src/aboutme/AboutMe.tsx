import me from 'src/resources/images/me.jpg';
import logoblack from 'src/resources/images/logoblack.png';
import { Link } from 'react-router-dom';

const AboutMe = () => {
  return (
    <>
      <div className="flex xs:m-2 sm:m-4">
        <div className="flex-no-grow">
          <img
            src={me}
            alt="me"
            className=" border border-black xs:h-32 sm:h-64"
          />
        </div>
        <div className="flex-1 pl-4">
          <p className="xs:text-lg sm:text-xl text-grey-dark pb-2">Who am I?</p>
          <p>
            My name is Anton Stagge. I am a social, outgoing and happy guy.
            Right now, I'm working for the fintech company Quickbit where I get
            to build payment solutions with crypto currency support.
          </p>
          <br />
          <p>
            I'm a very meticulous person that always strives for perfection. It
            is easy for me to learn new things quickly, but I still always want,
            and try, to understand everything in detail. It is then I perform at
            my best; one could say that I am a full stack thinker.
          </p>
          <br />
          <p>
            I believe that my love for programming and problem solving started
            very early on in my life. I've always been fascinated by how things
            work. At the age of 16 I bought an old motorcycle and took it apart
            in order to learn how a combustion engine worked. Then put it back
            together, and it worked even better.
          </p>
        </div>
      </div>
      <div className="flex xs:m-2 sm:m-4 ">
        <div className="flex-1 pr-4">
          <p>
            The first time a got to try programming was when I studied a year at
            college in Silicon Valley. Ever since I took the course Introduction
            to Programming in C++ there, I have devoted most of my waking hours
            to programming - in school, work, and during my spare time with
            countless small side projects I've started.
          </p>
          <br />
          <p>
            Now, I have a master's degree in engineering and computer science
            from the Royal Institute of Technology in Stockholm, Sweden. My
            masters thesis was on the subject of applying time-series
            forecasting techniques on the queue wait-time prediction problem. I
            compared the performance of a Temporal Convolutional Network (TCN),
            a LSTM and other ML-models to a simulation algorithm. In the end, a
            self designed combination model had the best performance.
          </p>
          <div className="mt-1">
            My thesis can be found here:
            <a href="http://urn.kb.se/resolve?urn=urn:nbn:se:kth:diva-279291">
              http://urn.kb.se/resolve?urn=urn:nbn:se:kth:diva-279291
            </a>
          </div>
          <br />
          <p>
            I will always strive to learn more in the field and art of
            programming and computer science. I don't think my motivation to do
            so will ever fade, because the field is ever growing and there are
            so many things and skills that I want to learn and master. The
            fullfilling sensation you get when creating something from scratch
            is too good to ever stop chasing after.
          </p>
          <br />
          <p>
            If you want to get to know me better, don't hesitate to reach out{' '}
            <Link to="/contact">here</Link> or to my email address.
          </p>
        </div>
        <div className="flex-no-grow ">
          <img src={logoblack} alt="logo" className="xs:h-32 sm:h-64" />
        </div>
      </div>
    </>
  );
};
export default AboutMe;
