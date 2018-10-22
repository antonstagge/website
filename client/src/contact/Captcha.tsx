import * as React from 'react'; 
import * as api from 'src/api/api';
import Button from 'src/shared/Button';
import { debounce } from 'ts-debounce';
import check from 'src/resources/images/check.png';

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
    }


    public componentDidMount() {
        this.reCaptcha()
    }

    public reCaptcha = () => {
        api.get('generate_captcha').then(resp => {
            this.setState({captcha: resp.data, valid: false, error: null});
        })
    }

    public tryCaptcha = () => {
        api.post('generate_captcha', {key: this.state.input}).then(resp => {
            this.setState({valid: true, error: null});
            this.props.setCaptchaValid(true);
        }, badResp => {
            this.setState({
                error: badResp.response.data.error,
                valid: false,
            });
            this.props.setCaptchaValid(false);
        })
    }
    public handleInput = (value: string) => {
        this.setState({input: value});
    }


    public render() {
        return(<div className={this.props.className + " flex-1 flex justify-center "}>
            <div className="pr-2 text-sm flex-1 flex flex-col justify-end">
                <label htmlFor={"captcha"} className="text-sm text-grey-dark flex">
                    {"CAPTCHA"}&nbsp;
                    {(!this.state.valid)
                        ? <div className="text-red-light text-xs flex flex-col justify-center">(required)</div>
                        : null
                    }
                </label>
                <input type="text" id={"captcha"}
                    placeholder="Are you a robot?"
                    className="border border-black "
                    onChange={(e) => this.handleInput(e.target.value)}
                />
                <div className="flex justify-between">
                    <div className="flex-1 text-red flex flex-col justify-center">
                        <div className="flex justify-center">
                            {this.state.valid
                                ? <img src={check} alt="Hello human!"
                                    className="h-6 w-6 fadeIn"
                                />
                                : this.state.error}
                        </div>
                    </div>
                    <div className="flex-no-grow flex">
                        <div className="flex flex-col justify-end pr-2">
                            <Button
                                className="text-xs"
                                valid={true}
                                onClick={this.reCaptcha}
                            >
                                Another
                            </Button>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                className="text-xs mt-1"
                                valid={true}
                                onClick={this.tryCaptcha}
                            >
                                Validate
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center flex-1 bg-black">
                <pre className="text-xxs font-bold  text-white tracking-normal">
                    {this.state.captcha === null 
                        ? <div className="text-lg pt-6">
                            Loading...
                            </div> 
                        : this.state.captcha}
                </pre>
            </div>
            
        </div>)
    }

}
export default Captcha;