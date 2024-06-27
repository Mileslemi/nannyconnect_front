import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import defaultImage from "../assets/images/defaultprofilelady.jpg";
import sendIcon from "../assets/icons/send-fill.svg";
import check from "../assets/icons/check2.svg";
import doubleCheck from "../assets/icons/check2-all.svg";

const chatModel = {
  id: null,
  date_created_gmt: null,
  date_modified_gmt: null,
  party_a: null,
  party_b: null,
  notifications: [],
};

const chatWithModel = {
  id: null,
  first_name: null,
  last_name: null,
  image: null,
};

const MessagingPage = () => {
  const { id } = useParams();

  const user = useSelector((state) => state.user?.user);

  const [chatDetail, setChatDetail] = useState(chatModel);

  const [chatWith, setChatWith] = useState(chatWithModel);

  const [message, setMessage] = useState(null);

  const [num, setNum] = useState(0);

  async function fetchChatDetail() {
    try {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/chats/${id}/`)
        .catch((_) => {})
        .then((response) => {
          if (response && response.status === 200) {
            setChatDetail(response.data);
          }
        });
    } catch (_) {}
  }

  async function sendMessage() {
    if (message && message.length > 0) {
      try {
        await axios
          .post(`${process.env.REACT_APP_API_URL}/notifications/`, {
            sender: user?.id,
            receiver: chatWith?.id,
            notification: message,
          })
          .catch((_) => {})
          .then((response) => {
            if (response && response.status === 200) {
              setMessage("");
              fetchChatDetail();
            }
          });
      } catch (_) {}
    }
  }

  async function updateAsRead(params) {
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/update_notifications/`, {
          receiver: user?.id,
          sender: chatWith?.id,
        })
        .catch((_) => {})
        .then((response) => {});
    } catch (_) {}
  }

  useEffect(() => {
    setChatWith(
      chatDetail?.party_a?.id === user?.id
        ? chatDetail?.party_b
        : chatDetail?.party_a
    );
  }, [chatDetail, user]);

  // useEffect(() => {
  //   fetchChatDetail();
  //   // eslint-disable-next-line
  // }, [id]);

  useEffect(() => {
    let ticker = setInterval(() => {
      setNum(num + 1);
      fetchChatDetail();
      updateAsRead();
    }, 1000);
    return () => {
      clearInterval(ticker);
    };
    // eslint-disable-next-line
  }, [id, num]);

  return (
    <div className="messaging_page">
      <Container>
        <Row>
          <Col sm={3}></Col>
          {chatDetail?.id !== null ? (
            <Col sm={5} className="messaging_div">
              <div className="messaging_header">
                <div className="messaging_chat_avatar">
                  {chatWith?.image ? (
                    <img
                      src={`${process.env.REACT_APP_API_URL}${chatWith.image}`}
                      alt="profile"
                    />
                  ) : (
                    <img src={defaultImage} alt="profile" />
                  )}
                </div>
                <div className="messaging_chat_name">
                  <b>
                    {chatWith?.first_name} {chatWith?.last_name}
                  </b>
                </div>
              </div>
              <div className="chat_content">
                {chatDetail.notifications.map((notif, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        notif?.sender?.id === user?.id
                          ? "single_notif single_notif_sender"
                          : "single_notif single_notif_receiver"
                      }
                    >
                      <p>{notif.notification}</p>
                      <div className="notif_info">
                        <span style={{ fontSize: "10px", color: "#449ed4" }}>
                          {new Date(notif.date_created_gmt).toLocaleDateString(
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
                        <span>
                          <img
                            src={notif.read ? doubleCheck : check}
                            alt="bootstrap"
                            width="15"
                            height="15"
                          />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="messaging_footer">
                <div className="messaging_input">
                  <textarea
                    placeholder="Send message ..."
                    name="message"
                    className="form-control"
                    maxLength={256}
                    value={message}
                    rows={3}
                    onChange={(e) => setMessage(e.target.value.trimStart())}
                  ></textarea>
                </div>
                <div className="messaging_send_btn">
                  <Button onClick={() => sendMessage()}>
                    <img
                      src={sendIcon}
                      alt="bootstrap"
                      width="25"
                      height="25"
                    />
                  </Button>
                </div>
              </div>
            </Col>
          ) : (
            <center>No Messages</center>
          )}
          <Col sm={3}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default MessagingPage;
