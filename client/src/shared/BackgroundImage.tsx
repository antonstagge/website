import * as React from "react";
import fadeframe from "src/resources/images/fade_frame.png";
interface BackgroundImageProps {
  backgroundImage: string;
  className?: string;
  big?: boolean;
}

class BackgroundImage extends React.Component<BackgroundImageProps> {
  constructor(props: BackgroundImageProps) {
    super(props);
  }

  public render() {
    const { className, backgroundImage, big } = this.props;
    return (
      <div className={className + " relative " + (!big ? "-mt-02" : "")}>
        <div className="absolute z-10 w-full xs:h-middle sm:h-middle pointer-events-none" />
        <img
          src={fadeframe}
          alt="fadeframe"
          className="absolute w-full xs:h-middle sm:h-middle "
          style={{
            opacity: 0.3,
            pointerEvents: "none"
          }}
        />
        <img
          src={backgroundImage}
          alt="background"
          className={"min-w-full xs:h-middle sm:h-middle "}
          style={{
            maxWidth: "unset"
          }}
        />
      </div>
    );
  }
}

export default BackgroundImage;
