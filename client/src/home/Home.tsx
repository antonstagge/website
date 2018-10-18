import * as api from 'src/api/api';
import * as React from 'react';

interface Message {
    name: string;
    email: string;
    message: string;
}


interface HomeProps {};
interface HomeState {
    messages: Message[];
};

class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            messages: []
        };
    }

    public componentDidMount() {
        api.get('get_all_messages', {}).then((resp: {data: Message[]}) => {
            this.setState({messages: resp.data})
        });

    }
    public render() {

        return <div>
            {this.state.messages.map((msg, idx) => (<div key={'message_' + idx} className="bg-red">
                {msg.name} with email {msg.email} said: {msg.message}
            </div>))}
        </div>
    }
}


export default Home;