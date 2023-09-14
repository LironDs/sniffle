import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbacksServices";

interface NavbarProps {
  setUserInfo: Function;
  userInfo: any;
}

const Navbar: FunctionComponent<NavbarProps> = ({ setUserInfo, userInfo }) => {
  let navigate = useNavigate();
  let render = () => setUserInfo(!userInfo);

  let logout = () => {
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("token");
    navigate("/");
    successMsg("You have logged out!");
    render();
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <NavLink to={"/"} className="navbar-brand">
            <img src="/logo.png" alt="Logo in navbar" width="60" height="44" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/aboutSniffle">
                  About Sniffle
                </NavLink>
              </li>

              {/**** business user menu****/}
              {(userInfo.role === "business" || userInfo.role === "admin") && (
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/user-cards">
                    My cards
                  </NavLink>
                </li>
              )}
              {userInfo.role === "admin" && (
                <li className="nav-item">
                  <NavLink className="nav-link " aria-current="page" to="crm">
                    CRM
                  </NavLink>
                </li>
              )}

              {userInfo.role && (
                <li className="nav-item">
                  <NavLink className="nav-link " aria-current="page" to="favorites">
                    My favorite
                  </NavLink>
                </li>
              )}
            </ul>

            <ul className="navbar-nav  justify-content-end">
              {!userInfo.role && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
              {/***** only registered user *******/}
              {userInfo._id && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={`users/user-profile/${userInfo._id}`}>
                      Hello {userInfo.email}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/"} onClick={logout}>
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
              <form className="">
                <div className="input-group  d-flex">
                  <div id="navbar-search-autocomplete" className="form-outline">
                    <input type="search" id="form1" className="form-control" placeholder="Search" />
                  </div>
                  <button type="button" className="btn btn-primary">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
