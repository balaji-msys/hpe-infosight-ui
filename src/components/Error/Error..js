import { Link } from "react-router-dom";

export const Error = ({ err }) => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="p-3 mb-2 alert alert-danger text-center">
        <p>Something went wrong!</p>
        <Link onClick={() => window.location.reload()}>Please try again!</Link>
      </div>
    </div>
  );
};
