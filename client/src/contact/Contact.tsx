import * as React from 'react';
import vineyard from 'src/resources/images/vineyard.jpg';
import BackgroundImage from 'src/home/BackgroundImage';
import Menu from 'src/shared/Menu';
import { MenuChoice, numItems , getMenuItem} from 'src/home/Home';
import { RouteComponentProps } from 'react-router-dom';
import * as api from 'src/api/api';

enum InputType {
    Name,
    Email,
    Message
}

interface ContactState {
    name: string;
    email: string;
    message: string;
    hover: boolean;
    sending: boolean;
    success: boolean | null;
    error: string;
}

class Contact extends React.Component<RouteComponentProps, ContactState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            hover: false,
            sending: false,
            success: null,
            error: '',
        }
    }

    public sendMessage = () => {
        if (this.state.sending) {return;}
        this.setState({sending: true});
        api.post('send_message', this.state).then((resp) => {
            this.setState({sending: false, success: true})
        }).catch((badResp) => {
            this.setState({sending: false, success: false, error: badResp.response.data.error})
        })
    }

    public handleInput = (type: InputType, value: string) => {
        switch(type) {
            case InputType.Name:
                this.setState({name: value});
                return;
            case InputType.Email:
                this.setState({email: value});
                return;
            case InputType.Message:
                this.setState({message: value});
                return;
        }
    }

    public listItem = (title: string, descr:string) => <div className="flex py-1 pl-2">
            <div className="font-bold">{title}:</div>
            <div>&nbsp;{descr}</div>
        </div>

    public render() {
        return <div className="flex-1 flex flex-col relative">
            <div className="overflow-hidden shrinkHeight">
                <BackgroundImage 
                    backgroundImage={vineyard}
                />
            </div>
           
            <div className="absolute text-white text-5xl tracking-tighter font-bold pin-t pin-l z-10 pt-6 pl-16 fadeIn">
                <div>
                    {'CONTACT'}
                </div>
                <div className="text-lg tracking-normal cursor-pointer"
                    onClick={() => this.props.history.push("/")}
                >
                    {'back'}
                </div>
            </div>
            <Menu 
                changeLocation={this.props.history.push}
                active={MenuChoice.Contact}
                titles={Array.from(Array(numItems).keys()).map(choice => getMenuItem(choice).title)}
            />
            <div className="m-4 text-lg flex">
                <div  className="w-1/5"/>
                <div className="w-3/5">
                    <div className="text-3xl text-grey-dark">
                        Contact info
                    </div>
                    <div className="flex text-lg py-2">
                        <div>
                            Email:&nbsp;
                        </div>
                        <div className="select-text font-bold"
                            onClick={e => {
                                const selection = window.getSelection();
                                const range = document.createRange();
                                range.selectNodeContents(e.currentTarget);
                                selection.removeAllRanges();
                                selection.addRange(range);
                                // add to clipboard.
                                document.execCommand('copy');
                            }}
                        >
                            stagge@kth.se
                        </div>
                    </div>
                    <div className="flex text-lg py-2">
                        <div>
                            Secondary email:&nbsp;
                        </div>
                        <div className="select-text font-bold"
                            onClick={e => {
                                const selection = window.getSelection();
                                const range = document.createRange();
                                range.selectNodeContents(e.currentTarget);
                                selection.removeAllRanges();
                                selection.addRange(range);
                                // add to clipboard.
                                document.execCommand('copy');
                            }}
                        >
                            antonstagge95@gmail.com
                        </div>
                    </div>
                    <div className="text-3xl text-grey-dark pt-4 pb-2">
                        Reach out to me here
                    </div>
                    <div className="flex">
                        <div className="flex-1 flex flex-col pr-4">
                            <label htmlFor="name" className="text-sm text-grey-dark">Name</label>
                            <input type="text" id="name"
                                className="border border-black "
                                onChange={(e) => this.handleInput(InputType.Name, e.target.value)}
                            />
                        </div>
                        <div className="flex-1 flex flex-col pl-4">
                            <label htmlFor="email" className="text-sm text-grey-dark">Email</label>
                            <input type="text" id="email"
                                className="border border-black "
                                onChange={(e) => this.handleInput(InputType.Email, e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="pt-2 flex flex-col">
                        <label htmlFor="message" className="text-sm text-grey-dark">Message</label>
                        <textarea name="message" id="message"
                            maxLength={249} 
                            className="border border-black resize-none h-32"
                            onChange={(e) => this.handleInput(InputType.Message, e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center pt-2">
                        {this.state.sending
                            ? <div>sending...</div>
                            : this.state.success === null
                                ? <div    
                                    className={"w-16 h-10 cursor-pointer border border-black flex flex-col justify-center text-center font-semibold " + 
                                        (this.state.hover
                                            ? "text-black bg-white"
                                            : "bg-black text-white")
                                    }
                                    onClick={this.sendMessage}
                                    onMouseEnter={() => this.setState({hover: true})}
                                    onMouseLeave={() => this.setState({hover: false})}
                                    >
                                        Send
                                    </div>
                                : this.state.success
                                    ? <div className="text-lg h-10 text-green-dark flex flex-col justify-center text-center font-semibold">
                                        Success!
                                    </div>
                                    : <div className="text-lg h-10 text-red flex flex-col justify-center text-center font-semibold">
                                        {this.state.error}
                                    </div>
                        }
                    </div>
                </div>
                <div  className="w-1/5"/>
            </div>
        </div>
    }
}

export default Contact;