import * as React from 'react'; 

interface ButtonProps {
    className?: string;
    valid: boolean;
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
        const {valid, onClick, children, className} = this.props;
        return (<div    
            className={className + " w-16 h-10 border border-black flex flex-col justify-center text-center font-semibold " + 
                (valid
                    ? "cursor-pointer " + (this.state.hover
                        ? "text-black bg-white"
                        : "bg-black text-white")
                    : "text-black bg-grey-lighter"
                )
            
            }
            onClick={onClick}
            onMouseEnter={() => this.setState({hover: true})}
            onMouseLeave={() => this.setState({hover: false})}
            >
                {children}
            </div>)
    }
}

export default Button;