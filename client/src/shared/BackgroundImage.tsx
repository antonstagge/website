import * as React from 'react';

interface BackgroundImageProps {
    backgroundImage: string;
    className?: string;
}

const BackgroundImage: React.SFC<BackgroundImageProps> = ({backgroundImage, className}) => {
    return (<div className={className + " "}>
        <img 
            src={backgroundImage} alt=""
            className="w-full xs:h-middle lg:h-middle "
            />
    </div>)
}

export default BackgroundImage;