import * as React from 'react';
import onepong from 'src/resources/images/onepong.gif';
import { MenuChoice, numItems , getMenuItem} from 'src/home/Home';
import { RouteComponentProps } from 'react-router-dom';
import Header from 'src/shared/Header';

const Portfolio: React.SFC<RouteComponentProps> = ({history}) => {
    const listItem = (title: string, descr:string) => <div className="flex py-1 pl-2">
            <div className="font-bold">{title}:</div>
            <div>&nbsp;{descr}</div>
        </div>

    return (<Header 
            type={MenuChoice.Portfolio}
            titles={Array.from(Array(numItems).keys()).map(choice => getMenuItem(choice).title)}
            route={history.push}
        >
            <div className="m-4">
                <div className="text-3xl pt-2 pb-4 text-grey-dark">Double Deep Q-Learning Onepong</div>
                <div className="flex">
                    <div className="flex-1 pr-4">
                        <img src={onepong} alt="onepong"/>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <div>
                            <p>
                                This is a Double Deep Q-learning Network with a implementation of a small game I made called Onepong.
                                Onepong is very much like pong except that it's only for one player. Much like playing tennis against a wall.
                            </p>
                            <p>&nbsp;</p>
                            <p className="pb-2">
                                I created the DQN without any python libraries such as Tensorflow or anything the like.
                                The DQN and network files are not dependent on the game Onepong, and can potentially be used 
                                to train an AI into playing or doing whatever you want. All you need to provide is 4 functions:
                            </p>
                            {listItem("initialize", "A constructor to init and return the game")}
                            {listItem("play_one_iteration", "Move game forward one step using parameter action")}
                            {listItem("get_observation", "Return a input vecor")}
                            {listItem("get_reward", "Return the reward for a state.")}
                            <p className="py-2">
                                For more information, or to try yourself, check out the&nbsp; 
                                <a href="https://github.com/antonstagge/onepong">source code on git.</a> 
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-3xl pt-10 pb-4 text-grey-dark">This website</div>
                <div className="flex pb-8">
                    <div className="flex-1">
                        <p>
                            This project was supposed to be a single page with my resume only, 
                            but as usual I had too much fun and got carried away. I even implemented
                            my own CAPTCHA. If you want to check out the source code you can find 
                            it&nbsp;<a href="https://github.com/antonstagge/website">here.</a> 
                        </p>
                    </div>
                    <div className="flex-1"/>
                </div>
            </div>
        </Header>
    )
}
export default Portfolio;