import { useState } from 'react';
import githubmarkLight from 'src/resources/logos/githubmarklight.png';
import githubmark from 'src/resources/logos/githubmark.png';
import linkedinwhite from 'src/resources/logos/linkedinwhite.png';
import linkedincolor from 'src/resources/logos/linkedincolor.png';

enum SocialType {
  github,
  linkedin,
}

interface SocialsProps {
  className?: string;
}

const Socials = ({ className }: SocialsProps) => {
  const [hover, setHover] = useState<SocialType>();
  return (
    <div className={className + ' fadeIn flex'}>
      <a
        href="https://www.linkedin.com/in/anton-stagge-763290168/"
        className="mr-4"
      >
        <img
          src={hover === SocialType.linkedin ? linkedincolor : linkedinwhite}
          alt="linkedin"
          onMouseEnter={() => setHover(SocialType.linkedin)}
          onMouseLeave={() => setHover(undefined)}
          className={'cursor-pointer xs:h-6 sm:h-auto'}
        />
      </a>
      <a href="https://github.com/antonstagge" className="">
        <img
          src={hover === SocialType.github ? githubmark : githubmarkLight}
          alt="github"
          onMouseEnter={() => setHover(SocialType.github)}
          onMouseLeave={() => setHover(undefined)}
          className={
            'cursor-pointer xs:h-6 sm:h-auto rounded ' +
            (hover === SocialType.github ? 'bg-white' : '')
          }
        />
      </a>
    </div>
  );
};
export default Socials;
