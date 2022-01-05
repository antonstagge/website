interface BackButtonProps {
  hover: boolean;
}

export const BackButton = ({ hover }: BackButtonProps) => (
  <div
    className="absolute pin-t pin-l pin-r flex justify-center pointer-events-none fadeIn"
    style={{ bottom: "62%" }}
  >
    <div className="text-white text-lg cursor-pointer flex pb-2 ">
      <div className={"flex flex-col justify-center"}>
        <div className="flex-no-grow">
          {"BACK"}
          <div
            className={"bg-white h-1 hoverBar " + (hover ? "w-full" : "w-0")}
          />
        </div>
      </div>
    </div>
  </div>
);
