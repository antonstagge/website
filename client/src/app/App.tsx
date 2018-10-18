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
        return (<Router>
            <Route exact={true} path="/" component={Home} />
        </Router>
        );
    }
}

export default App;
