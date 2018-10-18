import * as api from './api/api';
import './App.css';
import logo from './logo.svg';

import * as React from 'react';

interface Message {
  name: string;
  email: string;
  message: string;
}

interface AppProps {};
interface AppState {
  messages: Message[],
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      messages: []
    }
  }

  public componentDidMount() {
    api.get('get_all_messages', {}).then((resp: {data: Message[]}) => {
      this.setState({messages: resp.data})
    });

  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          {this.state.messages.map((msg, idx) => (<div key={'message_' + idx}>
              {msg.name} with email {msg.email} said: {msg.message}
            </div>))}
        </div>
      </div>
    );
  }
}

export default App;
