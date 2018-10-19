import * as React from 'react';

interface MenuItemProps {
    title: string;
    backgroundImage: string;
    prevTitle: string;
    nextTitle: string;
    className?: string;
}

const MenuItem: React.SFC<MenuItemProps> = ({title, backgroundImage, className, prevTitle, nextTitle}) => {

    return (<div style={{backgroundImage: "url(" + backgroundImage + ")"}} className={"bg-cover h-full" + " " + className}>
        <div className="flex text-white h-full">
            <div className="flex-1 flex flex-col cursor-pointer">
                <div className="flex-2 invisible">
                    padding
                </div>
                <div className="flex-1 pl-16 text-title tracking-tighter font-bold">
                    {title}
                </div>
            </div>
            <div className="flex-no-grow pr-10 flex flex-col justify-center text-right">
                <div className="flex-no-grow text-half tracking-tighter font-semibold">
                    {prevTitle}
                </div>
                <div className="flex-no-grow text-3xl tracking-tighter font-semibold">
                    {title}
                </div>
                <div className="flex-no-grow text-half tracking-tighter font-semibold">
                    {nextTitle}
                </div>
            </div>
        </div>
    </div>)
}

export default MenuItem;