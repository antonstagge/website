import * as React from "react";
import githubmarkLight from "src/resources/logos/githubmarklight.png";
import githubmark from "src/resources/logos/githubmark.png";
import linkedinwhite from "src/resources/logos/linkedinwhite.png";
import linkedincolor from "src/resources/logos/linkedincolor.png";

enum SocialType {
  github,
  linkedin,
}

interface SocialsProps {
  className?: string;
}
interface SocialsState {
  hover: SocialType | null;
}
class Socials extends React.Component<SocialsProps, SocialsState> {
  constructor(props: SocialsProps) {
    super(props);
    this.state = {
      hover: null,
    };
  }

  public render() {
    return (
      <div className={this.props.className + " fadeIn flex"}>
        <a
          href="https://www.linkedin.com/in/anton-stagge-763290168/"
          className="mr-4"
        >
          <img
            src={
              this.state.hover === SocialType.linkedin
                ? linkedincolor
                : linkedinwhite
            }
            alt="linkedin"
            onMouseEnter={() => this.setState({ hover: SocialType.linkedin })}
            onMouseLeave={() => this.setState({ hover: null })}
            className={"cursor-pointer xs:h-6 sm:h-auto"}
          />
        </a>
        <a href="https://github.com/antonstagge" className="">
          <img
            src={
              this.state.hover === SocialType.github
                ? githubmark
                : githubmarkLight
            }
            alt="github"
            onMouseEnter={() => this.setState({ hover: SocialType.github })}
            onMouseLeave={() => this.setState({ hover: null })}
            className={
              "cursor-pointer xs:h-6 sm:h-auto rounded " +
              (this.state.hover === SocialType.github ? "bg-white" : "")
            }
          />
        </a>
      </div>
    );
  }
}
export default Socials;
