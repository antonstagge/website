import * as React from "react";
import logowhite from "src/resources/images/logowhite.png";

const LogoWithName: React.SFC<{}> = () => (
  <div className="fadeIn absolute pin-t pin-l flex items-center xs:pl-5 sm:pl-10 pt-6 ">
    <img src={logowhite} alt="" className="xs:h-16 sm:h-32" />
    <div className="flex">
      <div className="xs:w-px xs:px-px sm:px-0 sm:w-1 xs:ml-1 sm:ml-2 bg-white" />
      <div className="flex flex-col justify-end pl-px xs:text-xs sm:text-xl font-semibold text-white">
        <div className="flex-no-grow -mb-1 leading-normal">ANTON</div>
        <div className="flex-no-grow">STAGGE</div>
      </div>
    </div>
  </div>
);

export default LogoWithName;
