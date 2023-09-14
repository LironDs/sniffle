import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../interfaces/Card";
import { getCardById } from "../services/cardsServices";

interface CardInfoProps {}

const CardInfo: FunctionComponent<CardInfoProps> = () => {
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
    console.log(_id);
    getCardById(String(_id))
      .then((res) => {
        console.log(res.data);
        setCard(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="container mt-4">
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={card.imageUrl} className="card-img" alt={card.imageAlt} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title display-6">
                  <strong>{card.title}</strong>
                </h5>
                <h5 className="card-text">{card.subTitle}</h5>
                <p className="card-text">{card.description}</p>
                <p className="card-text">Call us: {card.phone}</p>

                <p className="card-text">{card.email}</p>
                <p className="card-text">{card.web}</p>
                <p className="card-text">
                  Our Address:
                  {card.country}
                </p>
                <p className="card-text">
                  {card.city}, {card.street}
                  {card.houseNumber}, {card.zip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardInfo;
