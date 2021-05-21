import "./Contact.css";
import { Button } from "../Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(10, "The message must be at least 10 characters"),
});
export const Contact = () => {
  function getdata(e) {
    console.log(e.target.value);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [successMsg, setSuccessMsg] = useState("");

  const onSubmit = (info) => {
    async function postMsg() {
      await axios.post("http://localhost:1337/messages", {
        name: info.name,
        email: info.email,
        message: info.message,
      });
    }

    postMsg();

    setSuccessMsg(`Thank you ${info.name}! Message is sent.`);
  };
  return (
    <div className="contact-container">
      <div className="page-inner">
        <div className="contact-content">
          <div className="contact-row">
            <div className="contact-info">
              <h1>Conatct Us</h1>
              <p className="contact-info-p">
                Holidaze is one of the biggest hotel Company in Bergen, Norway.
                We have hundreds of hotels, Guesthouses and B&Bs. If you have
                any question, Please contact us.
              </p>
              <div className="contact-contact-icons">
                <div className="contact-contact-icons-left">
                  <i className="fas fa-phone-alt"></i> Phone
                </div>
                <div className="contact-contact-icons-right">
                  +47 88 99 00 00
                </div>
              </div>
              <div className="contact-contact-icons">
                <div className="contact-contact-icons-left">
                  <i className="far fa-envelope"></i> Email
                </div>
                <div className="contact-contact-icons-right">
                  helpdesk@holidaze.com
                </div>
              </div>
              <div className="contact-contact-icons">
                <div className="contact-contact-icons-left">
                  <i className="fas fa-map-marker-alt"></i> Address
                </div>
                <div className="contact-contact-icons-right">
                  Tufteveien 4, Bergen
                </div>
              </div>
            </div>
            <form
              className="contact-form"
              id="contactForm"
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className="successMsg">{successMsg}</p>
              <div className="form-control">
                <label>Name</label>
                <input type="text" {...register("name")} />
                {errors.name && <span>{errors.name.message}</span>}
              </div>
              <div className="form-control">
                <label>Email</label>
                <input type="email" {...register("email")} />
                {errors.email && <span>{errors.email.message}</span>}
              </div>
              <input type="file" onChange={(e) => getdata(e)} />
              <div className="form-control">
                <label>Message</label>
                <textarea {...register("message")} />
                {errors.message && <span>{errors.message.message}</span>}
              </div>
              <Button>Send</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
