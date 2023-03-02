import { useState } from 'react';

interface ButtonProps {
  className?: string;
  unvalidClassName?: string;
  valid: boolean;
  childNormal: string | JSX.Element;
  childHover: string | JSX.Element;
  onClick(): void;
}
const Button = ({
  valid,
  onClick,
  childHover,
  childNormal,
  className,
  unvalidClassName,
}: ButtonProps) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={
        'border border-black flex flex-col justify-center text-center font-semibold ' +
        (valid
          ? 'cursor-pointer ' +
            (hover ? 'text-black bg-white' : 'bg-black text-white')
          : unvalidClassName !== undefined
          ? unvalidClassName
          : 'text-black bg-grey-lighter') +
        ' ' +
        className
      }
      onClick={() => (valid ? onClick() : null)}
      onMouseEnter={() => (valid ? setHover(true) : null)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? childHover : childNormal}
    </div>
  );
};

export default Button;
