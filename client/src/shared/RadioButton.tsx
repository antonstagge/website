import * as React from 'react';

interface RadioButtonProps {
    className?:string;
    choices: string[];
    defaultActive: number;
    onChange(active: number): void
}
interface RadioButtonState {
    active: number;
    hovering: number;
}
class RadioButton extends React.Component<RadioButtonProps, RadioButtonState> {
    constructor(props: RadioButtonProps) {
        super(props);
        this.state = {
            active: props.defaultActive,
            hovering: -1,
        }
    }

    public handleChange = (index: number) => {
        this.setState({
            active: index,
        });
        this.props.onChange(index);
    }

    public render() {
        const {className, choices} = this.props;

        return <div className={"flex cursor-pointer " + className}>
            {choices.map((choice, index) => {
                return <div key={"RadioBtn_" + index}>
                   <div className={"h-px py-px " + (this.state.active === index ? "bg-green-light" : "")}/>
                    <div 
                        className={"flex-1 p-1 border border-black" + " " + 
                            (this.state.active === index 
                                ? "bg-black text-green-light shadow-md" 
                                :(this.state.hovering === index 
                                    ? "underline" 
                                    : "text-grey-dark"
                                )
                            ) 
                        }
                        onMouseEnter={() => this.setState({hovering: index})}
                        onMouseLeave={() => this.setState({hovering: -1})}
                        onClick={() => this.handleChange(index)}
                    >
                        {choice}
                    </div>
                    {/* <div className={"h-px py-px " + (this.state.active === index ? "bg-green-light" : "")}/> */}
                </div> 
            })}
        </div>
    }
}

export default RadioButton;