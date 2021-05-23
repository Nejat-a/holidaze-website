import { Button } from "../components/Button";
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
  checkInDate: yup.date().default(function () {
    return new Date();
  }),
  checkOutDate: yup.date().default(function () {
    return new Date();
  }),
  children: yup.string(),
  adults: yup.string(),
});
export const BookNow = ({ hotels }) => {
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
      await axios.post("http://localhost:1337/bookings", {
        name: info.name,
        email: info.email,
        checkInDate: info.checkInDate,
        checkOutDate: info.checkOutDate,
        adults: parseFloat(info.adults),
        children: parseFloat(info.children),
      });
    }
    postMsg();
    setSuccessMsg(
      `Thank you ${info.name}! You have successfuly booked your room!`
    );
  };

  return (
    <div className="book-now-container">
      <div className="page-inner">
        <header className="book-now-header">
          <p className="book-now-p">
            Excellent choice! Please fill in the form to complete your booking
            for <span>{hotels.name}</span>
          </p>
        </header>

        <form
          className="contact-form"
          id="contactForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <div className="form-control">
              <label>Full Name</label>
              <input
                type="text"
                {...register("name")}
                placeholder="Enter your full name"
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div className="form-control">
              <label>Email</label>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
          </div>
          <div className="form-group">
            <div className="form-control">
              <label>Check in date</label>
              <input
                type="date"
                className="date-input"
                {...register("checkInDate")}
              />
              {errors.checkInDate && <span>{errors.checkInDate.message}</span>}
            </div>
            <div className="form-control">
              <label>Check out date</label>
              <input
                type="date"
                className="date-input"
                {...register("checkOutDate")}
              />
              {errors.checkOutDate && (
                <span>{errors.checkOutDate.message}</span>
              )}
            </div>
          </div>
          <div className="form-group">
            <div className="form-control">
              <label>Adults</label>
              <select name="adults" {...register("adults")}>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <div className="form-control">
              <label>Children</label>
              <select name="children" {...register("children")}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>
          <p className="booking-form-footer">
            *Please recheck evrything before submitting the form. We wish you a
            pleasant stay in our hotel.
          </p>
          <p className="successMsg">{successMsg}</p>
          <Button>Confirm booking</Button>
        </form>
      </div>
    </div>
  );
};
