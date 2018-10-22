import * as React from 'react';
import * as api from 'src/api/api';
import Captcha from './Captcha';
import { MenuChoice, numItems , getMenuItem} from 'src/home/Home';
import { RouteComponentProps } from 'react-router-dom';
import { debounce } from 'ts-debounce';
import Header from 'src/shared/Header';
import Button from 'src/shared/Button';

enum InputType {
    Name,
    Email,
    Message,
}

export enum CanSend {
    True = 0,
    NameMissing = 1 << 0,
    EmailMissing = 1 << 1,
    MessageMissing = 1 << 2,
    Captcha = 1 << 3,
}

interface ContactState {
    name: string;
    email: string;
    message: string;
    hover: boolean;
    sending: boolean;
    success: boolean | null;
    error: string;
    canSend: CanSend;
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
            canSend: CanSend.NameMissing | CanSend.EmailMissing | CanSend.MessageMissing | CanSend.Captcha,
        }

        this.handleInput = debounce(this.handleInput, 200);
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
        value = value.trim()
        switch(type) {
            case InputType.Name:
                this.setState({
                    name: value,
                    canSend: value !== "" ? this.state.canSend & ~CanSend.NameMissing : this.state.canSend | CanSend.NameMissing
                });
                return;
            case InputType.Email:
                this.setState({
                    email: value,
                    canSend: value.includes('@') ? this.state.canSend & ~CanSend.EmailMissing : this.state.canSend | CanSend.EmailMissing
                });
                return;
            case InputType.Message:
                this.setState({
                    message: value,
                    canSend: value !== "" ? this.state.canSend & ~CanSend.MessageMissing : this.state.canSend | CanSend.MessageMissing
                });
                return;
        }
    }

    public listItem = (title: string, descr:string) => 
        <div className="flex py-1 pl-2">
            <div className="font-bold">{title}:</div>
            <div>&nbsp;{descr}</div>
        </div>

    public styledInput = (title: string, type: InputType, canSendValue: CanSend, className: string) => 
        <div className={"flex-1 flex flex-col pr-4 " + className}>
            <label htmlFor={title} className="text-sm text-grey-dark flex">
                {title}&nbsp;
                {(this.state.canSend & canSendValue)
                    ? <div className="text-red-light text-xs flex flex-col justify-center">(required)</div>
                    : null
                }
            </label>
            <input type="text" id={title}
                className="border border-black "
                onChange={(e) => this.handleInput(type, e.target.value)}
            />
        </div>

    public copyText = (e: React.MouseEvent) => {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(e.currentTarget);
        selection.removeAllRanges();
        selection.addRange(range);
        // add to clipboard.
        document.execCommand('copy');
    }

    public render() {
        return <div className="flex-1 flex flex-col relative">
            <Header 
                type={MenuChoice.Contact}
                titles={Array.from(Array(numItems).keys()).map(choice => getMenuItem(choice).title)}
                route={this.props.history.push}
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
                            onClick={this.copyText}
                        >
                            stagge@kth.se
                        </div>
                    </div>
                    <div className="text-3xl text-grey-dark pt-4 pb-2">
                        Reach out to me here
                    </div>
                    <div className="flex">
                        {this.styledInput("Name", InputType.Name, CanSend.NameMissing, "pr-4")}
                        {this.styledInput("Email", InputType.Email, CanSend.EmailMissing, "pl-4")}
                    </div>
                    <div className="pt-2 flex flex-col">
                        <label htmlFor={"Message"} className="text-sm text-grey-dark flex">
                            {"Message"}&nbsp;
                            {(this.state.canSend & CanSend.MessageMissing)
                                ? <div className="text-red-light text-xs flex flex-col justify-center">(required)</div>
                                : null
                            }
                        </label>
                        <textarea name="Message" id="Message"
                            maxLength={249} 
                            className="border border-black resize-none h-32"
                            onChange={(e) => this.handleInput(InputType.Message, e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between pt-2">
                        <Captcha 
                            setCaptchaValid={(valid) => {
                                if (valid) {
                                    this.setState({canSend: this.state.canSend & ~CanSend.Captcha})
                                } else {
                                    this.setState({canSend: this.state.canSend | CanSend.Captcha});
                                }
                                
                            }}
                        />
                    </div>
                    <div className="flex justify-end">
                        {this.state.sending
                            ? <div>sending...</div>
                            : this.state.success === null
                                ? <Button
                                    className="mt-2 w-1/4"
                                    valid={this.state.canSend === CanSend.True}
                                    onClick={() => this.state.canSend === CanSend.True ? this.sendMessage() : null}
                                    >
                                        Send
                                    </Button>
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