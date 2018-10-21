import * as React from 'react';
import vineyard from 'src/resources/images/vineyard.jpg';
import BackgroundImage from 'src/home/BackgroundImage';
import Menu from 'src/shared/Menu';
import { MenuChoice, numItems , getMenuItem} from 'src/home/Home';
import { RouteComponentProps } from 'react-router-dom';

interface ContactState {
}

class Contact extends React.Component<RouteComponentProps, ContactState> {
    constructor(props: RouteComponentProps) {
        super(props);
    }

    public listItem = (title: string, descr:string) => <div className="flex py-1 pl-2">
            <div className="font-bold">{title}:</div>
            <div>&nbsp;{descr}</div>
        </div>

    public render() {
        return <div className="flex-1 flex flex-col relative">
            <div className="overflow-hidden shrinkHeight">
                <BackgroundImage 
                    backgroundImage={vineyard}
                />
            </div>
           
            <div className="absolute text-white text-5xl tracking-tighter font-bold pin-t pin-l z-10 pt-6 pl-16 fadeIn">
                {'CONTACT'}
            </div>
            <Menu 
                changeLocation={this.props.history.push}
                active={MenuChoice.Contact}
                titles={Array.from(Array(numItems).keys()).map(choice => getMenuItem(choice).title)}
            />
            <div>
                contact
            </div>
        </div>
    }
}

export default Contact;