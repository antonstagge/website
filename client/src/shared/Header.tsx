import * as React from 'react';
import BackgroundImage from './BackgroundImage';
import { MenuChoice, getMenuItem } from 'src/home/Home';
import Menu from './Menu';

interface HeaderProps {
    type: MenuChoice;
    titles: string[];
    route(state: any):void;
}

const Header: React.SFC<HeaderProps> = ({type, titles, route}) => <div>
    <div className="overflow-hidden shrinkHeight">
        <BackgroundImage 
            backgroundImage={getMenuItem(type).backgroundImage}
        />
    </div>
    <div className="absolute text-white text-5xl tracking-tighter font-bold pin-t pin-l z-10 pt-6 pl-16 fadeIn">
            <div>
                {getMenuItem(type).title}
            </div>
            <div className="text-lg tracking-normal cursor-pointer"
                onClick={() => route({
                    pathname: "/",
                    state: type
                })}
            >
                {'back'}
            </div>
    </div>
    <Menu 
            changeLocation={route}
            active={type}
            titles={titles}
    />
</div>

export default Header;