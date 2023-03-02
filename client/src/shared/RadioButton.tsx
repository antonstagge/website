import { useState } from 'react';

interface RadioButtonProps {
  className?: string;
  choices: string[];
  defaultActive: number;
  onChange(active: number): void;
}

const RadioButton = ({
  className,
  choices,
  defaultActive,
  onChange,
}: RadioButtonProps) => {
  const [active, setActive] = useState(defaultActive);
  const [hovering, setHovering] = useState(-1);

  const handleChange = (index: number) => {
    setActive(index);
    onChange(index);
  };

  return (
    <div className={'flex cursor-pointer ' + className}>
      {choices.map((choice, index) => {
        return (
          <div key={'RadioBtn_' + index}>
            <div
              className={
                'h-px py-px ' + (active === index ? 'bg-green-light' : '')
              }
            />
            <div
              className={
                'flex-1 p-1 border border-black' +
                ' ' +
                (active === index
                  ? 'bg-black text-green-light shadow-md'
                  : hovering === index
                  ? 'underline'
                  : 'text-grey-dark')
              }
              onMouseEnter={() => setHovering(index)}
              onMouseLeave={() => setHovering(-1)}
              onClick={() => handleChange(index)}
            >
              {choice}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RadioButton;
