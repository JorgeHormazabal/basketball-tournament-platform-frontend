import { TailSpin } from "react-loader-spinner";

export default function Spinner() {
  return (
    <TailSpin
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{ justifyContent: "center", paddingTop: "30vh" }}
      wrapperClass=""
      visible={true}
    />
  );
}
