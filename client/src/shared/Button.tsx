import * as React from 'react'; 

interface ButtonProps {
    className?: string;
    unvalidClassName?: string;
    valid: boolean;
    childNormal: string | JSX.Element;
    childHover: string | JSX.Element;
    onClick():void;
};
interface ButtonState {
    hover: boolean;
};
class Button extends React.Component<ButtonProps, ButtonState> {
    constructor(props: ButtonProps) {
        super(props);
        this.state = {
            hover: false
        }
    }

    public render() {
        const {valid, onClick, childHover, childNormal, className, unvalidClassName} = this.props;
        return (<div    
            className={"border border-black flex flex-col justify-center text-center font-semibold " +  
                (valid
                    ? "cursor-pointer " + (this.state.hover
                        ? "text-black bg-white"
                        : "bg-black text-white")
                    : ( unvalidClassName !== undefined ? unvalidClassName : "text-black bg-grey-lighter")
                )
                + " " + className 
            }
            onClick={() => valid ? onClick() : null}
            onMouseEnter={() => valid ? this.setState({hover: true}) : null}
            onMouseLeave={() => this.setState({hover: false})}
            >
                {this.state.hover
                    ? childHover
                    : childNormal
                }
            </div>)
    }
}

export default Button;