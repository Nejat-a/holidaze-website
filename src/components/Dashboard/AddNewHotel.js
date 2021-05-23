import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL } from "../../constants/Api";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const schema = yup.object().shape({
  name: yup.string().required("Please enter hotel name"),
  location: yup.string().required("Please enter hotel"),

  descriptions: yup
    .string()
    .required("please add some description")
    .min(5, "descriptions should be at least 5 charecters"),
  price: yup
    .number()
    .required("please add price per night")
    .positive()
    .integer(),
  rating: yup
    .number()
    .required("please add price per night")
    .positive()
    .integer()
    .lessThan(6, "rating should be between 1 and 5"),
  type: yup.string(),
});
export const AddNewHotel = () => {
  const addHotelURL = BASE_URL + "/hotels";
  const history = useHistory();
  const [successMsg, setSuccessMsg] = useState("");
  const [auth] = useContext(AuthContext);

  if (!auth) {
    history.push("/signin");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (info) => {
    console.log(info);
    async function postMsg() {
      await axios.post(
        addHotelURL,
        {
          name: info.name,
          location: info.location,
          descriptions: info.descriptions,
          Type: info.type,
          price: parseFloat(info.price),
          rating: parseFloat(info.rating),
        },
        {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
    }
    postMsg();
    setSuccessMsg(`Thank you ! You have successfuly added new hotel!`);
  };

  return (
    <div className="add-new-hotel-container">
      <form
        className="contact-form"
        id="contactForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-group">
          <div className="form-control">
            <label>Hotel Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Name of the new hotel"
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div className="form-control">
            <label>Location</label>
            <input
              type="text"
              {...register("location")}
              placeholder="Location of the hotel"
            />
            {errors.location && <span>{errors.location.message}</span>}
          </div>
        </div>
        <div className="form-group">
          <div className="form-control">
            <label>Descriptions</label>
            <textarea
              {...register("descriptions")}
              placeholder="Descriptions of the hotel"
            ></textarea>
            {errors.descriptions && <span>{errors.descriptions.message}</span>}
          </div>
          <div className="form-control">
            <label>Type of hotel</label>
            <select name="type" {...register("type")}>
              <option value="hotel">Hotel</option>
              <option value="guesthouse">GuestHouse</option>
              <option value="bandb">B&B</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="form-control">
            <label>Price</label>
            <input type="number" {...register("price")} />
            {errors.price && <span>{errors.price.message}</span>}
          </div>
          <div className="form-control">
            <label>Rating</label>
            <input type="number" {...register("rating")} />
            {errors.rating && <span>{errors.rating.message}</span>}
          </div>
        </div>
        <p className="booking-form-footer">
          *Please recheck evrything before submitting the form.
        </p>
        <p className="successMsg">{successMsg}</p>
        <Button>Save</Button>
      </form>
    </div>
  );
};
