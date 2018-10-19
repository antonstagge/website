import * as React from 'react';

interface MenuListProps {
    titles: string[];
    active: number;
}

const BackgroundImage: React.SFC<MenuListProps> = ({titles, active}) => {

    return (<div className="flex-no-grow pr-10 flex flex-col justify-center text-right">
        {titles.map((title, index) => (
            <div 
            key={"menulist_" + index}
            className={"flex-no-grow tracking-tighter font-semibold MenuList " +
            (active === index
                ? "text-3xl"
                : "text-half"
            )
        }>
            {title}
        </div>
        ))}
</div>)
}

export default BackgroundImage;