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
    name: string; // Value of the name input.
    email: string; // Value of the email input.
    message: string; // Value of the message textarea.
    sending: boolean; // Value of the name input.
    status: boolean | null; // Status of message sending.
    error: string | null; // Error message if something goes wrong.
    canSend: CanSend; // Value of the name input.
}

class Contact extends React.Component<RouteComponentProps, ContactState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            sending: false,
            status: null,
            error: null,
            canSend: CanSend.NameMissing | CanSend.EmailMissing | CanSend.MessageMissing | CanSend.Captcha,
        }

        this.handleInput = debounce(this.handleInput, 200);
    }

    public sendMessage = () => {
        if (this.state.sending) {return;}
        this.setState({sending: true});
        api.post('send_message', this.state).then((resp) => {
            this.setState({sending: false, status: true})
        }).catch((badResp) => {
            if (badResp.response !== undefined) {
                this.setState({sending: false, status: false, error: badResp.response.data.error})
            } else {
                this.setState({sending: false, status: false, error: 'Could not reach server.'});
            }
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
        <div className={"flex-1 flex flex-col " + className}>
            <label htmlFor={title} className="xs:text-xs lg:text-sm text-grey-dark flex">
                {title}&nbsp;
                {(this.state.canSend & canSendValue)
                    ? <div className="text-red-light text-xs flex flex-col justify-center">*</div>
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
        return (<Header 
                type={MenuChoice.Contact}
                titles={Array.from(Array(numItems).keys()).map(choice => getMenuItem(choice).title)}
                route={this.props.history.push}
            >
                <div className="m-4 text-lg flex">
                    <div  className="xs:w-0 lg:w-1/5"/>
                    <div className="xs:w-full lg:w-3/5">
                        <div className="xs:text-lg lg:text-3xl text-grey-dark">
                            Contact info
                        </div>
                        <div className="flex xs:text-sm lg:text-lg py-2">
                            <div>
                                Email:&nbsp;
                            </div>
                            <div className="select-text font-bold"
                                onClick={this.copyText}
                            >
                                stagge@kth.se
                            </div>
                        </div>
                        <div className="xs:text-lg lg:text-3xl text-grey-dark pt-4 pb-2">
                            Reach out to me here
                        </div>
                        <div className="xs:text-xs lg:text-sm pb-2">
                            <div>
                                Your email will not be saved other than in my inbox.
                            </div>
                            <div>
                                Required and incomplete fields are marked with a {<span className="text-red">*</span>}.
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            {this.styledInput("Name", InputType.Name, CanSend.NameMissing, "xs:pr-0 lg:pr-8")}
                            {this.styledInput("Email", InputType.Email, CanSend.EmailMissing, "")}
                        </div>
                        <div className="pt-2 flex flex-col">
                            <label htmlFor={"Message"} className="xs:text-xs lg:text-sm text-grey-dark flex">
                                {"Message"}&nbsp;
                                {(this.state.canSend & CanSend.MessageMissing)
                                    ? <div className="text-red-light text-xs flex flex-col justify-center">*</div>
                                    : null
                                }
                            </label>
                            <textarea name="Message" id="Message"
                                maxLength={249} 
                                className="border border-black resize-none h-32"
                                onChange={(e) => this.handleInput(InputType.Message, e.target.value)}
                            />
                        </div>
                        <Captcha 
                            setCaptchaValid={(valid) => {
                                if (valid) {
                                    this.setState({canSend: this.state.canSend & ~CanSend.Captcha})
                                } else {
                                    this.setState({canSend: this.state.canSend | CanSend.Captcha});
                                }
                                
                            }}
                            className="pt-2 flex flex-wrap-reverse"
                        />
                        <div className="flex justify-end">
                            {this.state.sending
                                ? <div className="text-lg h-10 flex flex-col justify-center text-center font-semibold">Sending...</div>
                                : this.state.status === null
                                    ? <Button
                                        className="mt-2 w-1/4 py-2"
                                        valid={this.state.canSend === CanSend.True}
                                        onClick={() => this.state.canSend === CanSend.True ? this.sendMessage() : null}
                                        childHover="Send"
                                        childNormal="Send"
                                        />
                                    : this.state.status
                                        ? <div className="text-lg h-10 text-green-dark flex flex-col justify-center text-center font-semibold">
                                            Success!
                                        </div>
                                        : <div className="text-lg h-10 text-red flex flex-col justify-center text-center font-semibold">
                                            {this.state.error}
                                        </div>
                            }
                        </div>
                    </div>
                    <div  className="xs:w-0 lg:w-1/5"/>
                </div>
            </Header>
        )
    }
}

export default Contact;