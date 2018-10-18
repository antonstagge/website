import Home from 'src/home/Home';
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
        return (<div className="h-screen w-full p-8 select-none font-default">
            <div className="h-full relative">
                <Router>
                    <Route exact={true} path="/" component={Home} />
                </Router>
            </div>
        </div>
        );
    }
}

export default App;
