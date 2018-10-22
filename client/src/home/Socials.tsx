import * as React from 'react';
import githubmarkLight from 'src/resources/images/githubmarklight.png';
import githubmark from 'src/resources/images/githubmark.png';
import linkedinwhite from 'src/resources/images/linkedinwhite.png';
import linkedincolor from 'src/resources/images/linkedincolor.png';

enum SocialType {
    github,
    linkedin,
}

interface SocialsProps {
    className?: string;
}
interface SocialsState {
    hover: SocialType | null,
}

class Socials extends React.Component<SocialsProps, SocialsState> {
    constructor(props: SocialsProps) {
        super(props);
        this.state = {
            hover: null,
        }
    }

    public render() {
        return (<div className={this.props.className + " pl-16 pt-6 fadeIn"}>
            <a 
                href="https://github.com/antonstagge"
                className="mr-4"
            >
                <img 
                    src={this.state.hover === SocialType.github ? githubmark : githubmarkLight}
                    alt="github"
                    onMouseEnter={() => this.setState({hover: SocialType.github})}
                    onMouseLeave={() => this.setState({hover: null})}
                    className={"cursor-pointer rounded " + (this.state.hover === SocialType.github ? "bg-white" : "")}
                />
            </a>
            <a 
                href="https://www.linkedin.com/in/anton-stagge-763290168/"
                className="mr-4"
            >
                <img 
                    src={this.state.hover === SocialType.linkedin ? linkedincolor : linkedinwhite}
                    alt="linkedin"
                    onMouseEnter={() => this.setState({hover: SocialType.linkedin})}
                    onMouseLeave={() => this.setState({hover: null})}
                    className={"cursor-pointer "}
                />
            </a>
        </div>)
    }
}
export default Socials;