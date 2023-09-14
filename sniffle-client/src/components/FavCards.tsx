import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { addOrRemoveCard, getFav, updateFav } from "../services/favServices";
import { Link, useNavigate } from "react-router-dom";

interface FavCardsProps {
  userInfo: any;
}

const FavCards: FunctionComponent<FavCardsProps> = ({ userInfo }) => {
  let navigate = useNavigate();

  let [favCards, setFavCards] = useState<Card[]>([]);
  let [favCardsChanged, setFavCardsChanged] = useState<boolean>(false);

  useEffect(() => {
    getFav(userInfo._id)
      .then((res) => {
        setFavCards(res.data);
      })
      .catch((err) => console.log(err));
  }, [favCardsChanged]);

  const handleDeleteFromFav = (card: Card) => {
    if (window.confirm("Are you sure you want to remove this card from favorites?")) {
      addOrRemoveCard(card)
        .then((res) => {
          setFavCardsChanged(!favCardsChanged);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="container">
        {favCards && favCards.length ? (
          <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center ">
            {favCards.map((card: Card) => (
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
                        <Link to="" onClick={() => handleDeleteFromFav(card)}>
                          <i
                            className="bi bi-heart-fill"
                            style={{ color: "#df0c0c", fontSize: "22px" }}
                          />
                        </Link>
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
export default FavCards;
