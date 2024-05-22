import "./Spinner.css";
import Loader from "react-js-loader";

export const Spinner = () => {
  return (
    <div className="container">
      <Loader
        type="spinner-default"
        bgColor="blue"
        color="grey"
        size={70}
        title={"loading..."}
      />
    </div>
  );
};
