import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import defaultImage from "../assets/images/defaultprofilelady.jpg";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ChatsPage = () => {
  const user = useSelector((state) => state.user?.user);

  const [chats, setChats] = useState([]);

  const navigate = useNavigate();

  const [fetching, setFetching] = useState(false);

  const [num, setNum] = useState(0);

  async function fetchChats() {
    setFetching(true);

    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/get_chats/`, {
          user_id: user?.id,
        })
        .catch((_) => {})
        .then((response) => {
          if (response && response.status === 200) {
            setChats(response.data);
          }
        });
    } catch (_) {}

    setFetching(false);
  }

  useEffect(() => {
    let ticker = setInterval(() => {
      setNum(num + 1);
      fetchChats();
    }, 1500);
    return () => {
      clearInterval(ticker);
    };

    // eslint-disable-next-line
  }, [user, num]);

  return (
    <div className="chats_page">
      {chats.length < 1 && fetching ? <p>Fetching ...</p> : <></>}
      {chats.map((chat, index) => {
        let chatWith =
          chat?.party_a?.id === user?.id ? chat?.party_b : chat?.party_a;
        return (
          <div
            key={index}
            className="chat_list_tile row"
            onClick={() =>
              navigate(
                `/${
                  user?.user_type === "nanny" ? "dashboard_nanny" : "dashboard"
                }/chats/${chat?.id}`
              )
            }
          >
            <Col sm={2}>
              <div className="chat_avatar">
                {chatWith?.image ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}${chatWith.image}`}
                    alt="profile"
                  />
                ) : (
                  <img src={defaultImage} alt="profile" />
                )}
              </div>
            </Col>
            <Col className="chat_content_display" sm={9}>
              <div className="chat_content_display_header">
                <b>
                  {chatWith?.first_name} {chatWith?.last_name}{" "}
                </b>
                <span
                  style={{
                    fontSize: "13px",
                    color: "salmon",
                  }}
                >
                  {new Date(chat.date_modified_gmt).toLocaleDateString(
                    undefined,
                    {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                      weekday: "short",
                      hour: "2-digit",
                      hour12: true,
                      minute: "2-digit",
                    }
                  )}
                </span>
              </div>

              <div className="chat_content_display_latest">
                <p>
                  {
                    chat?.notifications[chat?.notifications?.length - 1]
                      .notification
                  }
                </p>
              </div>
            </Col>
            {chat?.notifications[chat?.notifications?.length - 1].read ? (
              <></>
            ) : chat?.notifications[chat?.notifications?.length - 1].receiver
                ?.id === user?.id ? (
              <Col sm={1} className="new_notification_alert"></Col>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatsPage;
