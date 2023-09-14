import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { checkUser, getTokenDetails } from "../services/usersServices";
import { useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbacksServices";
import User from "../interfaces/User";

type userLogin = Pick<User, "email" | "password">;

interface LoginProps {
  setUserInfo: Function;
  userInfo: any;
}

const Login: FunctionComponent<LoginProps> = ({ setUserInfo, userInfo }) => {
  let navigate = useNavigate();
  let formik = useFormik<userLogin>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required().email(),
      password: yup.string().required(),
    }),
    onSubmit(values) {
      checkUser(values)
        .then((res) => {
          navigate("/");
          successMsg(`You're logged in as ${values.email}`);
          sessionStorage.setItem(
            "token",

            JSON.stringify({
              token: res.data,
            })
          );

          sessionStorage.setItem(
            "userInfo",
            JSON.stringify({
              email: (getTokenDetails() as any).email,
              role: (getTokenDetails() as any).role,
              _id: (getTokenDetails() as any)._id,
            })
          );
          setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string));
        })
        .catch((err) => errorMsg("Wrong email or password"));
    },
  });
  return (
    <>
      <div className="container-fluid col-md-6 p-5">
        {/***** form *******/}
        <form
          className="text-center p-2 border border-info border-5 rounded-3"
          onSubmit={formik.handleSubmit}
        >
          <h3 className="display-3 bg-info">LOGIN</h3>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Email address</label>
            {formik.touched.email && formik.errors.email && (
              <small className="text-danger">{formik.errors.email}</small>
            )}
          </div>
          <div className="form-floating mb-3 col">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="password">password</label>
            {formik.touched.password && formik.errors.password && (
              <small className="text-danger">{formik.errors.password}</small>
            )}
          </div>

          <div className="row px-2">
            <button
              type="reset"
              className="btn btn-success col me-1"
              onClick={() => formik.resetForm()}
            >
              RESET FORM
            </button>
            <button type="button" className="btn btn-danger col" onClick={() => navigate(-1)}>
              CANCEL
            </button>
          </div>
          <div className="row p-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!formik.isValid || !formik.dirty}
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </>
  );

  return <>This is Login</>;
};

export default Login;
