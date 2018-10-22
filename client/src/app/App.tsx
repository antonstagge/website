import Home from 'src/home/Home';
import AboutMe from 'src/aboutme/AboutMe';
import Resume from 'src/resume/Resume';
import Portfolio from 'src/portfolio/Portfolio';
import Contact from 'src/contact/Contact';
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as React from 'react'; 
import './App.css';

interface AppProps {};
interface AppState {};

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
    }

    public render() {
        return (<div className="min-h-screen p-6 pb-0 select-none font-default flex flex-col">
            <Router>
                <div className="flex-1 flex flex-col border border-black shadow-md">
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/aboutme" component={AboutMe} />
                    <Route path="/resume" component={Resume} />
                    <Route path="/portfolio" component={Portfolio} />
                    <Route path="/contact" component={Contact} />   
                </div>
            </Router>
            <div className="h-6 flex-no-grow text-grey text-right text-sm">
                Copyright &copy; 2018 Anton Stagge 
            </div>
        </div>
        );
    }
}

export default App;
