import Home from 'src/home/Home';
import AboutMe from 'src/aboutme/AboutMe';
import Resume from 'src/resume/Resume';
import Portfolio from 'src/portfolio/Portfolio';
import Contact from 'src/contact/Contact';
import { HashRouter as Router, Route } from "react-router-dom";
import * as React from 'react'; 
import './font-faces.css';

const App: React.SFC<{}> = () => {
    return (<div className="min-h-screen xs:pb-0 xs:p-3 lg:p-6 lg:pb-0 select-none font-default flex flex-col">
        <Router>
            <div className="flex-1 flex flex-col border border-black shadow-md">
                <Route exact={true} path="/" component={Home} />
                <Route path="/aboutme" component={AboutMe} />
                <Route path="/resume" component={Resume} />
                <Route path="/portfolio" component={Portfolio} />
                <Route path="/contact" component={Contact} />   
            </div>
        </Router>
        <div className="lg:h-6-2px sm:h-3 flex-no-grow text-grey text-right xs:text-xs lg:text-sm ">
            Copyright &copy; 2018 Anton Stagge 
        </div>
    </div>
    );
}
export default App;
