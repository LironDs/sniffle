import { FunctionComponent, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { getCardById, updateCard } from "../services/cardsServices";
import * as yup from "yup";
import Card from "../interfaces/Card";
import { successMsg } from "../services/feedbacksServices";

interface UpdateCardProps {}

const UpdateCard: FunctionComponent<UpdateCardProps> = () => {
  let { _id } = useParams();
  let navigate = useNavigate();

  let [card, setCard] = useState<Card>({
    title: "",
    subTitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    imageUrl: "",
    imageAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: 0,
  });

  useEffect(() => {
    getCardById(String(_id))
      .then((res) => {
        setCard(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  let formik = useFormik({
    initialValues: {
      userId: card.userId,
      title: card.title,
      subTitle: card.subTitle,
      description: card.description,
      phone: card.phone,
      email: card.email,
      web: card.web,
      imageUrl: card.imageUrl,
      imageAlt: card.imageAlt,
      state: card.state,
      country: card.country,
      city: card.city,
      street: card.street,
      houseNumber: card.houseNumber,
      zip: card.zip,
    },
    enableReinitialize: true,

    validationSchema: yup.object({
      title: yup.string().required().min(2, "Please enter a valid title"),
      subTitle: yup.string().required().min(2),
      description: yup.string().min(2, "Please enter a valid name"),
      phone: yup.string().min(6, "Please enter a valid Phone number"),
      email: yup.string().email(),
      web: yup.string().url(),
      imageUrl: yup.string().url(),
      imageAlt: yup.string().min(2),
      state: yup.string(),
      country: yup.string(),
      city: yup.string(),
      street: yup.string(),
      houseNumber: yup.string(),
      zip: yup.number(),
    }),
    onSubmit: (values) => {
      updateCard(values, String(_id))
        .then((res) => {
          navigate(-1);
          successMsg("Card updated successfully!");
        })
        .catch((error) => console.log(error));
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
          <h3 className="display-3 bg-info">Update card</h3>
          <div className="row">
            <div className="form-floating mb-3 col">
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="firstName">Title</label>
              {formik.touched.title && formik.errors.title && (
                <small className="text-danger">{formik.errors.title}</small>
              )}
            </div>
            <div className="form-floating mb-3 col">
              <input
                type="text"
                className="form-control"
                id="subTitle"
                placeholder="subTitle"
                name="subTitle"
                value={formik.values.subTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="subTitle">subTitle</label>
              {formik.touched.subTitle && formik.errors.subTitle && (
                <small className="text-danger">{formik.errors.subTitle}</small>
              )}
            </div>
            <div className="form-floating mb-3 col">
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Your description name"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="description">description</label>
              {formik.touched.description && formik.errors.description && (
                <small className="text-danger">{formik.errors.description}</small>
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
              <label htmlFor="description">phone</label>
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
                type="web"
                className="form-control"
                id="web"
                placeholder="web"
                name="web"
                value={formik.values.web}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="web">web</label>
              {formik.touched.web && formik.errors.web && (
                <small className="text-danger">{formik.errors.web}</small>
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
                type="text"
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
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateCard;
