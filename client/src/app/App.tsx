import Home from "src/home/Home";
import AboutMe from "src/aboutme/AboutMe";
import Resume from "src/resume/Resume";
import Portfolio from "src/portfolio/Portfolio";
import Contact from "src/contact/Contact";
import { Route, Switch } from "react-router-dom";
import "./font-faces.css";
import { PageWrapper } from "src/shared/PageWrapper";

const App = () => {
  return (
    <div className="min-h-screen xs:pb-0 xs:p-3 sm:p-6 sm:pb-0 select-none font-default flex flex-col">
      <div className="flex-1 flex flex-col border border-black shadow-md relative">
        <Home />
        <Switch>
          <Route
            path="/aboutme"
            render={() => (
              <PageWrapper>
                <AboutMe />
              </PageWrapper>
            )}
          />
          <Route
            path="/resume"
            render={() => (
              <PageWrapper>
                <Resume />
              </PageWrapper>
            )}
          />
          <Route
            path="/portfolio"
            render={() => (
              <PageWrapper>
                <Portfolio />
              </PageWrapper>
            )}
          />
          <Route
            path="/contact"
            render={() => (
              <PageWrapper>
                <Contact />
              </PageWrapper>
            )}
          />
        </Switch>
      </div>
      <div className="sm:h-6-2px sm:h-3 flex-no-grow text-grey text-right xs:text-xs sm:text-sm ">
        Copyright &copy; 2018 Anton Stagge
      </div>
    </div>
  );
};
export default App;
