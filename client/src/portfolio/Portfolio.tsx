import onepong from 'src/resources/images/onepong.gif';
import Steganography from './Steganography';

const ListItem = ({ title, descr }: { title: string; descr: string }) => (
  <div className="flex py-1 pl-2">
    <div className="font-bold">{title}:</div>
    <div>&nbsp;{descr}</div>
  </div>
);

const Portfolio = () => {
  return (
    <>
      <div className="m-4 xs:text-sm sm:text-lg">
        <div className="flex">
          <div className="flex-1" />
          <div className="flex-1 xs:text-xl sm:text-3xl pt-2 pb-4 text-grey-dark">
            Double Deep Q-Learning Onepong
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="flex-1 pr-4 min-w-48">
            <img src={onepong} alt="onepong" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div>
              <p>
                This is a Double Deep Q-learning Network with an implementation
                of a small game I made called Onepong. Onepong is very much like
                pong except that it's only for one player. Much like playing
                tennis against a wall.
              </p>
              <p>&nbsp;</p>
              <p className="pb-2">
                I created the DQN without any python libraries such as
                Tensorflow or anything the like. The DQN and network files are
                not dependent on the game Onepong, and can potentially be used
                to train an AI into playing or doing whatever you want. All you
                need to provide is 4 functions:
              </p>
              <ListItem
                title="initialize"
                descr="A constructor to init and return the game"
              />
              <ListItem
                title="play_one_iteration"
                descr="Move game forward one step using parameter action"
              />
              <ListItem title="get_observation" descr="Return a input vecor" />
              <ListItem
                title="get_reward"
                descr="Return the reward for a state."
              />
              <p className="py-2">
                For more information, or to try yourself, check out the&nbsp;
                <a href="https://github.com/antonstagge/onepong">
                  source code on git.
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="xs:text-xl sm:text-3xl pt-10 pb-4 text-grey-dark">
          This website
        </div>
        <div className="flex flex-wrap pb-8">
          <div className="flex-1">
            <p>
              This project was supposed to be a single page with my resume only,
              but as usual I had too much fun and got carried away. I even
              implemented my own CAPTCHA. The downloadable resume is generated
              from the information on this website and styled using the same CSS
              aswell. If you want to check out the source code you can find
              it&nbsp;<a href="https://github.com/antonstagge/website">here.</a>
            </p>
          </div>
          <div className="xs:flex-no-grow sm:flex-1" />
        </div>

        <Steganography className="" />

        <div className="xs:text-xl sm:text-3xl pt-10 pb-4 text-grey-dark">
          My Master Thesis
        </div>
        <div className="flex flex-wrap pb-8">
          <div className="flex-1">
            <p>
              The paper is titled A time series forecasting approach for queue
              wait-time prediction, and the full paper can be found&nbsp;
              <a href="http://urn.kb.se/resolve?urn=urn:nbn:se:kth:diva-279291">
                here.
              </a>
            </p>
          </div>
          <div className="xs:flex-no-grow sm:flex-1" />
        </div>
      </div>
    </>
  );
};
export default Portfolio;
