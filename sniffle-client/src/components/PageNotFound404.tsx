import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface PageNotFound404Props {}

const PageNotFound404: FunctionComponent<PageNotFound404Props> = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className="container text-center">
        <h1>Well this is embarrassing...</h1>
        <h3>we cant seem to find what you are looking for</h3>
        <img
          src="https://media.istockphoto.com/id/488938489/photo/dog-looking-through-binoculars.jpg?s=612x612&w=0&k=20&c=F1kSC-1h-1MNLMHBHCmTLIEE8BF30oyJcyvkn0XW0a4="
          alt="Dog searching"
        />
        <br />
        <br />
        <button type="button" className="btn btn-success" onClick={() => navigate(-1)}>
          Take me back!
        </button>
      </div>
    </>
  );
};

export default PageNotFound404;
