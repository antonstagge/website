interface Props {
  name: string;
  place: string;
  year: string;
  comment?: string;
  optional?: string;
}

export const CVItem = ({ name, place, year, comment, optional }: Props) => {
  return (
    <table className="w-full mb-2 xs:text-xs sm:text-2xl">
      <tbody>
        <tr>
          <td className="w-4/5">
            <span className="font-bold ">{name}</span>
            <span>,&nbsp;</span>
            <span className="italic ">{place}</span>
            {optional !== undefined ? <span>,&nbsp;</span> : null}
            {optional !== undefined ? (
              <span className="">{optional}</span>
            ) : null}
          </td>
          <td className="w-1/5 text-right font-bold whitespace-no-wrap ">
            {year}
          </td>
        </tr>
        <tr className="pb-4 xs:text-xs sm:text-xl">
          <td className="w-4/5">{comment}</td>
          <td className="w-1/5 text-right font-bold whitespace-no-wrap ">
            &nbsp;
          </td>
        </tr>
      </tbody>
    </table>
  );
};
