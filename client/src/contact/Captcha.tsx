import * as React from 'react'; 
import * as api from 'src/api/api';
import Button from 'src/shared/Button';
import { debounce } from 'ts-debounce';
import check from 'src/resources/logos/check.png';
import redowhite from 'src/resources/logos/redowhite.png';
import redoblack from 'src/resources/logos/redoblack.png';

interface CaptchaProps {
    className?: string;
    setCaptchaValid(valid: boolean):void;
};
interface CaptchaState {
    captcha: string | null;
    input: string;
    valid: boolean;
    error: string | null;
};


enum CaptchaStrings {
    loadString = "loading",
    humanString = "human",
    errorString = "error",
}

class Captcha extends React.Component<CaptchaProps, CaptchaState> {
    constructor(props: CaptchaProps) {
        super(props);
        this.state = {
            captcha: null,
            input: '',
            valid: false,
            error: null,
        }
        this.handleInput = debounce(this.handleInput, 200);
        this.reCaptcha = debounce(this.reCaptcha, 200);
        this.tryCaptcha = debounce(this.tryCaptcha, 200);
    }


    public componentDidMount() {
        this.reCaptcha()
    }

    public reCaptcha = () => {
        this.setState({
            captcha: CaptchaStrings.loadString,
            error: null,
            valid: false,
        })
        api.get('generate_captcha').then(resp => {
            this.setState({captcha: resp.data, valid: false, error: null});
        }, badResp => {
            this.setState({
                captcha: CaptchaStrings.errorString,
                valid: false, 
                error: 'Could not reach server.'
            });
        })
    }

    public tryCaptcha = () => {
        this.setState({
            captcha: CaptchaStrings.loadString,
            error: null,
            valid: false,
        });
        api.post('generate_captcha', {key: this.state.input}).then(resp => {
            this.setState({
                valid: true, 
                error: null,
                captcha: CaptchaStrings.humanString,
            });
            this.props.setCaptchaValid(true);
        }, badResp => {
            if (badResp.response !== undefined) {
                this.setState({
                    error: badResp.response.data.error,
                    valid: false,
                    captcha: CaptchaStrings.errorString,
                });
            } else {
                this.setState({
                  error: 'Could not reach server.',
                  valid: false,
                  captcha: CaptchaStrings.errorString, 
                });
            }
            this.props.setCaptchaValid(false);
        })
    }
    public handleInput = (value: string) => {
        this.setState({input: value});
    }

    public captchaValue = () => {
        switch(this.state.captcha) {
            case CaptchaStrings.loadString:
                return <div>LOADING...</div>;
            case CaptchaStrings.humanString:
                return <div>HELLO HUMAN!</div>;
            case CaptchaStrings.errorString:
                return <div>ERROR</div>;
            default:
                return <div className="flex-no-grow flex-no-shrink text-captcha whitespace-pre font-bold">
                        {this.state.captcha}
                    </div>
        }
    }

    public render() {
        return(<div className={this.props.className + " -ml-8"}>
            <div className="flex-1 flex flex-col justify-end ml-8">
                <label htmlFor={"captcha"} className="text-sm text-grey-dark flex">
                    {"CAPTCHA"}&nbsp;
                    {(!this.state.valid)
                        ? <div className="text-red-light text-xs flex flex-col justify-center">*</div>
                        : null
                    }
                </label>
                <input type="text" id={"captcha"}
                    placeholder="Are you a robot?"
                    className="border border-black p-px"
                    onChange={(e) => this.handleInput(e.target.value)}
                />
                <div className="flex justify-between">
                    <div className="flex-1 text-red flex flex-col justify-center">
                        <div className="flex justify-center">
                            {this.state.valid
                                ? <img src={check} alt="Hello human!"
                                    className="h-6 w-6 fadeIn"
                                />
                                : <div className="text-sm">{this.state.error}</div>
                            }
                        </div>
                    </div>
                    <div className="flex-no-grow flex">
                        <div className="flex flex-col justify-end pr-2">
                            <Button
                                className="text-xs mt-1 py-1 px-2"
                                valid={true}
                                onClick={this.reCaptcha}
                                childNormal={<img src={redowhite} alt="redo"
                                    className="h-4 w-4"
                                />}
                                childHover={<img src={redoblack} alt="redo"
                                    className="h-4 w-4"
                                />}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                className="text-xs mt-1 py-1 px-2"
                                valid={true}
                                onClick={this.tryCaptcha}
                                childHover="Validate"
                                childNormal="Validate"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-black min-h-12 min-w-64 text-white ml-8 flex justify-center items-center">
                {this.captchaValue()}
            </div>
            
        </div>)
    }

}
export default Captcha;