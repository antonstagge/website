import * as React from 'react';

interface BackgroundImageProps {
    backgroundImage: string;
    className: string;
}

const BackgroundImage: React.SFC<BackgroundImageProps> = ({backgroundImage, className}) => {
    return (<div 
        style={{
            backgroundImage: "url(" + backgroundImage + ") ",
        }} 
        className={"bg-cover h-full " + className}
        />)
}

export default BackgroundImage;