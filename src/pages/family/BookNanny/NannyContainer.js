import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import defaultImage from "../../../assets/images/defaultprofilelady.jpg";
import { useNavigate } from "react-router-dom";
import star from "../../../assets/icons/star.svg";
import starFill from "../../../assets/icons/star-fill.svg";

const NannyContainer = ({ nanny }) => {
  const { id, hourly_rate, user, bio, reviews } = nanny;

  const [rating, setRating] = useState(4.7);

  const navigate = useNavigate();

  useEffect(() => {
    let ratingCount = 0;
    let ratingSum = 0.0;

    for (const review of reviews) {
      ratingCount++;
      ratingSum += review.rating;
    }

    if (ratingCount > 0) {
      setRating(ratingSum / ratingCount);
    }
  }, [reviews]);

  return (
    <div
      className="row nannyContainer"
      onClick={() => navigate(`/dashboard/booknanny/${id}`)}
    >
      <Col sm={2}>
        <div className="avatar">
          {user.image ? (
            <img
              src={`${process.env.REACT_APP_API_URL}${user.image}`}
              name="current-image"
              alt=""
            />
          ) : (
            <img src={defaultImage} name="current-image" alt="" />
          )}
        </div>
      </Col>
      <Col sm={4} className="nannydetails">
        <p>
          <b>{user.first_name + " " + user.last_name}</b>
        </p>
        <p>
          {user.location.address +
            ", " +
            user.location.town +
            ", " +
            user.location.county}{" "}
        </p>
        <p>
          <b>Ksh. {hourly_rate}</b>/hr{" "}
        </p>
      </Col>
      <Col sm={6}>
        <div>
          {[1, 2, 3, 4, 5].map((e, i) => (
            <span key={i} className="star-rating">
              <img
                src={i + 1 <= rating ? starFill : star}
                alt="bootstrap"
                width="25"
                height="25"
              />{" "}
            </span>
          ))}
        </div>
        <div className="bioDiv">
          <p>{bio ?? ""}</p>
        </div>
      </Col>
    </div>
  );
};

export default NannyContainer;
