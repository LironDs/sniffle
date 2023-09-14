import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { addUser, getTokenDetails } from "../services/usersServices";
import { useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbacksServices";
import jwt_decode from "jwt-decode";

interface RegisterProps {
  setUserInfo: Function;
}

const Register: FunctionComponent<RegisterProps> = ({ setUserInfo }) => {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      imageUrl: "",
      imageAlt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: 0,
      role: "user",
    },
    validationSchema: yup.object({
      firstName: yup.string().min(2, "Please enter a valid name").required(),
      middleName: yup.string().min(2),
      lastName: yup.string().min(2, "Please enter a valid name").required(),
      phone: yup.string().min(6, "Please enter a valid Phone number").required(),
      email: yup.string().email().required(),
      password: yup
        .string()
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d.*\d.*\d)(?=.*[!@#$%^&*-_]).{8,}$/,
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, at least 4 numbers, and one special character"
        )
        .required(),
      imageUrl: yup.string().min(2).required(),
      imageAlt: yup.string().min(2).required(),
      state: yup.string(),
      country: yup.string().min(2).required(),
      city: yup.string().min(2).required(),
      street: yup.string().min(2).required(),
      houseNumber: yup.string().min(1, "Please enter a valid House number").required(),
      zip: yup.number(),
    }),
    onSubmit(values) {
      console.log(typeof values.houseNumber);

      addUser(values)
        .then((res) => {
          navigate("/");
          successMsg(`You have registered successfully and logged in as ${values.email}`);
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
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <div className="container-fluid col-md-9 p-5">
        {/***** form *******/}
        <form
          className="text-center p-2 border border-info border-5 rounded-3"
          onSubmit={formik.handleSubmit}
        >
          <h3 className="display-3 bg-info">Register</h3>
          <div className="row">
            <div className="form-floating mb-3 col">
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Your first name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="firstName">First Name</label>
              {formik.touched.firstName && formik.errors.firstName && (
                <small className="text-danger">{formik.errors.firstName}</small>
              )}
            </div>
            <div className="form-floating mb-3 col">
              <input
                type="text"
                className="form-control"
                id="middleName"
                placeholder="Your middle name"
                name="middleName"
                value={formik.values.middleName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="middleName">Middle Name</label>
              {formik.touched.middleName && formik.errors.middleName && (
                <small className="text-danger">{formik.errors.middleName}</small>
              )}
            </div>
            <div className="form-floating mb-3 col">
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Your lastName name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="lastName">lastName</label>
              {formik.touched.lastName && formik.errors.lastName && (
                <small className="text-danger">{formik.errors.lastName}</small>
              )}
            </div>
            <div className="row"></div>
            <div className="form-floating mb-3 col">
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="lastName">phone</label>
              {formik.touched.phone && formik.errors.phone && (
                <small className="text-danger">{formik.errors.phone}</small>
              )}
            </div>
            <div className="form-floating mb-3 col">
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
          </div>
          <div className="row">
            <div className="form-floating mb-3 col">
              <input
                type="text"
                className="form-control"
                id="imageUrl"
                placeholder="imageUrl"
                name="imageUrl"
                value={formik.values.imageUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="imageUrl">image Url</label>
              {formik.touched.imageUrl && formik.errors.imageUrl && (
                <small className="text-danger">{formik.errors.imageUrl}</small>
              )}
            </div>
            <div className="form-floating mb-3 col">
              <input
                type="text"
                className="form-control"
                id="imageAlt"
                placeholder="imageAlt"
                name="imageAlt"
                value={formik.values.imageAlt}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="imageAlt">image Alt</label>
              {formik.touched.imageAlt && formik.errors.imageAlt && (
                <small className="text-danger">{formik.errors.imageAlt}</small>
              )}
            </div>
          </div>
          <div className="row">
            <div className="form-floating mb-3 col">
              <input
                type="text"
                className="form-control"
                id="state"
                placeholder="state"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="state">state</label>
              {formik.touched.state && formik.errors.state && (
                <small className="text-danger">{formik.errors.state}</small>
              )}
            </div>
            <div className="form-floating mb-3 col">
              <input
                type="text"
                className="form-control"
                id="country"
                placeholder="country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="country">country</label>
              {formik.touched.country && formik.errors.country && (
                <small className="text-danger">{formik.errors.country}</small>
              )}
            </div>
            <div className="form-floating mb-3 col">
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="City"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="city">City</label>
              {formik.touched.city && formik.errors.city && (
                <small className="text-danger">{formik.errors.city}</small>
              )}
            </div>
          </div>
          <div className="row">
            <div className="form-floating mb-3 col">
              <input
                type="text"
                className="form-control"
                id="street"
                placeholder="street"
                name="street"
                value={formik.values.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="street">street</label>
              {formik.touched.street && formik.errors.street && (
                <small className="text-danger">{formik.errors.street}</small>
              )}
            </div>
            <div className="form-floating mb-3 col">
              <input
                type="string"
                className="form-control"
                id="houseNumber"
                placeholder="houseNumber"
                name="houseNumber"
                value={formik.values.houseNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="houseNumber">house Number</label>
              {formik.touched.houseNumber && formik.errors.houseNumber && (
                <small className="text-danger">{formik.errors.houseNumber}</small>
              )}
            </div>
            <div className="form-floating mb-3 col">
              <input
                type="number"
                className="form-control"
                id="zip"
                placeholder="zip"
                name="zip"
                value={formik.values.zip}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="zip">Zip</label>
              {formik.touched.zip && formik.errors.zip && (
                <small className="text-danger">{formik.errors.zip}</small>
              )}
            </div>
          </div>
          <div className="custom-control custom-checkbox ">
            <input
              type="checkbox"
              className="custom-control-input"
              id="role"
              name="role"
              value={formik.values.role}
              checked={formik.values.role === "business"}
              onChange={(e) => {
                formik.setFieldValue("role", e.target.checked ? "business" : "user");
              }}
            />
            <label className="custom-control-label" htmlFor="defaultRegisterFormNewsletter">
              Are you a business client?
            </label>
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
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
