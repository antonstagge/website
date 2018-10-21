import * as React from 'react';
import oland from 'src/resources/images/oland.jpg';
import BackgroundImage from 'src/home/BackgroundImage';
import Menu from 'src/shared/Menu';
import { MenuChoice, numItems , getMenuItem} from 'src/home/Home';
import { RouteComponentProps } from 'react-router-dom';

interface AboutMeState {
}

class AboutMe extends React.Component<RouteComponentProps, AboutMeState> {
    constructor(props: RouteComponentProps) {
        super(props);
    }

    public render() {
        return <div className="flex-1 flex flex-col relative">
            <div className="overflow-hidden shrinkHeight">
                <BackgroundImage 
                    backgroundImage={oland}
                />
            </div>
           
           <div className="absolute text-white text-5xl tracking-tighter font-bold pin-t pin-l z-10 pt-6 pl-16 fadeIn">
                {'ABOUT ME'}
           </div>
           <Menu 
                changeLocation={this.props.history.push}
                active={MenuChoice.AboutMe}
                titles={Array.from(Array(numItems).keys()).map(choice => getMenuItem(choice).title)}
           />
           {Array.from(Array(99).keys()).map((idx) => <div key={idx}>test</div>)}
        </div>
    }
}

export default AboutMe;