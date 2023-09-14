import { FunctionComponent, useEffect, useState } from "react";
import { deleteCard, getCardsByUserId } from "../services/cardsServices";
import { Link, useNavigate } from "react-router-dom";
import Card from "../interfaces/Card";
import { successMsg } from "../services/feedbacksServices";

interface UserCardsProps {
  userInfo: any;
}

const UserCards: FunctionComponent<UserCardsProps> = ({ userInfo }) => {
  let navigate = useNavigate();
  let [cards, setCards] = useState<Card[]>([]);
  let [cardsChanged, setCardsChanged] = useState<boolean>(false);

  let render = () => {
    setCardsChanged(!cardsChanged);
  };
  useEffect(() => {
    console.log();

    getCardsByUserId(userInfo._id)
      .then((res) => setCards(res.data))
      .catch((err) => console.log(err));
  }, [cardsChanged]);
  let handleDelete = (card: Card) => {
    deleteCard(card._id as string)
      .then((res) => {
        console.log(card._id);

        successMsg("Card deleted successfully!");
        render();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container">
        {cards.length ? (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {cards.map((card: Card) => (
              <div
                key={card._id}
                className="card mb-3 mx-2"
                style={{ maxWidth: "340px", maxHeight: "500px" }}
              >
                <div className=" g-0 mx-auto align-content-between">
                  <div className="text-center">
                    <img
                      src={card.imageUrl}
                      className="rounded-start p-1 object-fit-contain "
                      alt={card.imageAlt}
                      width={"200px"}
                      height={"150px"}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{card.title}</h5>
                      <p className="card-text">{card.description}</p>
                      <hr />
                      <p className="card-text">Phone: {card.phone}</p>
                      <p className="card-text">Email: {card.email}</p>
                      <p className="card-text">City: {card.city}</p>
                      <div className="container d-flex justify-content-around">
                        <Link to="/" onClick={() => handleDelete(card)}>
                          <i className="bi bi-trash3-fill" style={{ fontSize: "22px" }}></i>
                        </Link>
                        <Link to={`/cards/update/${card._id}`}>
                          <i
                            className="bi bi-pencil-square p-auto"
                            style={{ fontSize: "22px" }}
                          ></i>
                        </Link>

                        <i
                          className="bi bi-info-circle"
                          style={{ fontSize: "22px" }}
                          onClick={() => navigate(`/cards/${card._id}`)}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3>It seems like you have not created cards yet</h3>
        )}
        <button type="button" className="btn btn-primary" onClick={() => navigate("/cards/new")}>
          Add card
        </button>
      </div>
    </>
  );
};

export default UserCards;
