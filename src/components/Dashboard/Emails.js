import "../../App.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { BASE_URL } from "../../constants/Api";
const emailURL = BASE_URL + "/messages";

export const Emails = () => {
  const [loading, setloading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [showMessageContent, setshowMessageContent] = useState(false);
  const [auth] = useContext(AuthContext);

  const showMsgContent = () => {
    setshowMessageContent(!showMessageContent);
  };
  useEffect(() => {
    if (!auth) {
      return;
    }
    async function getMessages() {
      const token = auth.jwt;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await axios.get(emailURL, { headers });
        console.log(response.data);
        setMessages(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setloading(false);
      }
    }
    getMessages();
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error has occured</div>;
  }
  if (messages.length === 0) {
    return <div className="empty-items">No incoming messages yet!</div>;
  }
  return (
    <>
      {messages.map((msg) => {
        return (
          <div key={msg.id} className="msg-container">
            <div className="msg-head" onClick={showMsgContent}>
              <div className="msg-head-col">
                <p>From {msg.email}</p>
                <p>Name: {msg.name}</p>
                <p>Date: {msg.created_at}</p>
              </div>
              <div className="msg-head-col">
                <i
                  className={
                    showMessageContent
                      ? "fas fa-minus-circle"
                      : "fas fa-plus-circle"
                  }
                ></i>
              </div>
            </div>
            <div>
              <p
                className={`msg-content ${
                  showMessageContent ? "extra-padding" : ""
                }`}
              >
                {showMessageContent ? `Message: ${msg.message}` : ""}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};
