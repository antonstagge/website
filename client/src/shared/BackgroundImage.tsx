import * as React from 'react';
import fadeframe from 'src/resources/images/fade_frame.png';
interface BackgroundImageProps {
    backgroundImage: string;
    className?: string;
}

const BackgroundImage: React.SFC<BackgroundImageProps> = ({backgroundImage, className}) => {
    return (<div className={className + " relative"}>
        <img 
            src={fadeframe} alt="fadeframe"
            className="absolute z-10 w-full xs:h-middle sm:h-middle "
            style={{
                opacity: 0.6
            }}
        />
        <img 
            src={backgroundImage} alt="background"
            className="min-w-full xs:h-middle sm:h-middle "
            style={{
                maxWidth: 'unset'
            }}
            />
        
    </div>)
}

export default BackgroundImage;