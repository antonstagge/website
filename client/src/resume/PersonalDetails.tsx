export const PersonalDetails = () => (
  <table className="mb-6">
    <tbody>
      <tr>
        <td className="w-48">
          <img
            src={'IMAGE_PATH'}
            alt="me"
            className="h-48 border border-black object-cover"
          />
        </td>
        <td className="pb-0">
          <div className=" pt-24 pl-10">
            <div className="font-header text-4xl">Anton Stagge</div>
            <div>Telephone: 0702412556</div>
            <div>Email: antonstagge95@gmail.se</div>
            <div>Website: antonstagge.com</div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
);
