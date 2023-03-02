import { useState } from 'react';
import { MenuItem } from 'src/home/Home';
import arrowUp from 'src/resources/logos/arrow-up.png';
import NoStyleLink from 'src/shared/NoStyleLink';

interface MenuListProps {
  menuItems: MenuItem[];
  active: number;
  className?: string;
  showArrows?: boolean;
}

const MenuList = ({
  menuItems,
  active,
  className,
  showArrows,
}: MenuListProps) => {
  const [hover, setHover] = useState(-1);
  return (
    <div
      className={'flex flex-col justify-center text-right fadeIn ' + className}
    >
      {showArrows && (
        <div className="flex justify-end mb-12 mr-6 sm:mr-12">
          <img
            src={arrowUp}
            width={20}
            style={{
              height: '12px',
            }}
          />
        </div>
      )}
      {menuItems.map((item, index) => (
        <NoStyleLink to={item.link} key={index}>
          <div
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(-1)}
            className={'flex-no-grow xs:h-6 sm:h-8 flex cursor-pointer '}
          >
            <div className="flex-1 flex flex-col justify-center">
              <div
                className={
                  'flex-no-grow font-semibold whitespace-no-wrap MenuList ' +
                  (hover === -1
                    ? index === active
                      ? 'xs:text-lg sm:text-4xl'
                      : 'xs:text-xs sm:text-half'
                    : index === hover
                    ? 'xs:text-lg sm:text-4xl'
                    : 'xs:text-xs sm:text-half')
                }
              >
                {item.title}
              </div>
            </div>
            <div className="flex-no-grow xs:w-5 sm:w-10 flex flex-col justify-center">
              <div
                className={
                  'xs:pr-1 sm:pr-3 flex-no-grow text-xl font-bold ' +
                  (hover === -1
                    ? index === active
                      ? ''
                      : 'invisible'
                    : index === hover
                    ? ''
                    : 'invisible')
                }
              >
                {'<'}
              </div>
            </div>
          </div>
        </NoStyleLink>
      ))}
      {showArrows && (
        <div className="flex justify-end mt-12 mr-6 sm:mr-12">
          <img
            src={arrowUp}
            width={20}
            className=""
            style={{
              transform: 'rotate(180deg)',
              height: '12px',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MenuList;
