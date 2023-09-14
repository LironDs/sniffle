import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { deleteCard, getCards } from "../services/cardsServices";
import { Link, useNavigate } from "react-router-dom";
import { addOrRemoveCard, updateFav } from "../services/favServices";
import { successMsg } from "../services/feedbacksServices";

interface HomeProps {
  userInfo: any;
}

const Home: FunctionComponent<HomeProps> = ({ userInfo }) => {
  let [cards, setCards] = useState<Card[]>([]);
  let [cardsChanged, setCardsChanged] = useState<boolean>(false);

  let navigate = useNavigate();

  let render = () => {
    setCardsChanged(!cardsChanged);
  };
  useEffect(() => {
    getCards()
      .then((res) => setCards(res.data))
      .catch((err) => console.log(err));
  }, [cardsChanged]);

  let handleAddRemoveFromFav = (card: Card) => {
    addOrRemoveCard(card)
      .then((res) => {})
      .catch((err) => {});
  };
  let handleDelete = (card: Card) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      deleteCard(card._id as string)
        .then((res) => {
          successMsg("Card removed successfully");

          render();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="container-fluid pb-5" style={{ maxHeight: "87vh" }}>
        <div className="container text-center my-3">
          <h1>Welcome to Sniffle!</h1>
          <h3>Here you can check our best friends</h3>
        </div>
        {cards.length ? (
          <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center ">
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
                        {userInfo.role === "admin" && (
                          <>
                            <Link to="/" onClick={() => handleDelete(card)}>
                              <i className="bi bi-trash3-fill" style={{ fontSize: "22px" }}></i>
                            </Link>
                            <Link to={`/cards/update/${card._id}`}>
                              <i
                                className="bi bi-pencil-square p-auto"
                                style={{ fontSize: "22px" }}
                              ></i>
                            </Link>
                          </>
                        )}
                        {userInfo.role && (
                          <Link to="" onClick={() => handleAddRemoveFromFav(card)}>
                            <i
                              className="bi bi-heart-fill"
                              style={{ color: "#df0c0c", fontSize: "22px" }}
                            />
                          </Link>
                        )}
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
          <h3>No cards to display</h3>
        )}
      </div>
    </>
  );
};

export default Home;
