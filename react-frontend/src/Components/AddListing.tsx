import { useState, ChangeEvent, FormEvent } from "react";
import plus from "../assets/plus.png";
import minus from "../assets/minus.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormState {
  id: number;
  name: string;
  description: string;
  propertyType: string;
  cancellationPolicy: string;
  accommodates: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  price: number;
  guestsIncluded: number;
  space: string;
  rules: string;
  numberOfReviews: number;
  rating: number;
  amenities: string[];
  host: Host;
  address: Address;
  images: Images
}

interface Images{
  pictureUrl: string;
}

interface Address {
  building: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

interface Host {
  name: string;
  address: string;
  contactNo: string;
}

const AddListing = () => {
  const initialFormData = {
    id: 0,
    name: "",
    description: "",
    propertyType: "",
    cancellationPolicy: "",
    accommodates: 0,
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
    price: 0,
    guestsIncluded: 0,
    space: "",
    rules: "",
    numberOfReviews: 0,
    rating: 0,
    amenities: [],
    host: {
      name: "",
      address: "",
      contactNo: "",
    },
    images: {
      pictureUrl: ""
    },
    address: {
      building: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    },
  };
  const [formData, setFormData] = useState<FormState>(initialFormData);

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Check if the field is part of the nested address object
    const nameParts = name.split(".");
    if (nameParts.length === 2 && nameParts[0] === "address") {
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [nameParts[1]]: value,
        },
      }));
    } if (nameParts.length === 2 && nameParts[0] === "images") {
      setFormData((prevState) => ({
        ...prevState,
        images: {
          ...prevState.images,
          [nameParts[1]]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const increment = (fieldName: keyof FormState) => {
    setFormData((prevState) => {
      const prevValue = prevState[fieldName];
      if (typeof prevValue === "number") {
        return {
          ...prevState,
          [fieldName]: prevValue + 1,
        };
      } else {
        return prevState;
      }
    });
  };

  const decrement = (fieldName: keyof FormState) => {
  
    setFormData((prevState) => {
      const prevValue = prevState[fieldName];
      if (typeof prevValue === "number") {
        return {
          ...prevState,
          [fieldName]: Math.max(prevValue - 1, 0),
        };
      } else {
        return prevState;
      }
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle form submission here
    axios
      .post("http://localhost:5500/api/properties", formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      });
    console.log(formData);
    //setFormData(initialFormData);
  };

  return (
    <div className="overflow-y-scroll w-full">
      <form onSubmit={handleSubmit}  className="p-8 w-3/5 m-auto">
        {/* <div className="mb-4">
          <label htmlFor="id" className="block font-medium text-gray-700 mb-2">
            ID
          </label>
          <input
            type="number"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div> */}

        <div className="mb-4 flex align-middle justify-between mt-4">
          <label
            htmlFor="name"
            className="block font-medium text-xl text-gray-700 mr-4 pt-1"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Cozy Cottage in the Woods"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* <div className="mb-4">
          <label
            htmlFor="propertyType"
            className="block font-medium text-gray-700 mb-2"
          >
            Property Type
          </label>
          <input
            type="text"
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div> */}

        <div className="flex justify-between align-middle mt-12">
          <div className="mb-4 flex align-middle justify-start">
            <label
              htmlFor="name"
              className="block font-medium text-lg text-gray-700  pt-1"
            >
              Property Type:
            </label>

            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="px-4 py-2 bg-white border border-gray-300 ml-2 rounded-lg"
            >
              <option value="">Select</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Villa">Villa</option>
            </select>
            {/* <input
            type="text"
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          /> */}
          </div>

          <div className="mb-4 flex">
            <label
              htmlFor="cancellationPolicy"
              className="block font-medium text-lg text-gray-700  pt-1"
            >
              Cancellation Policy
            </label>
            <select
              name="cancellationPolicy"
              value={formData.cancellationPolicy}
              onChange={handleChange}
              className="px-4 py-2 bg-white border border-gray-300 ml-2 rounded-lg"
            >
              <option value="flexible">Flexible</option>
              <option value="moderate">Moderate</option>
              <option value="strict">Strict</option>
              <option value="super_strict_30">Super Strict 30 Days</option>
              <option value="super_strict_60">Super Strict 60 Days</option>
              <option value="strict_14_with_grace_period">
                Strict 14 Days with Grace Period
              </option>
            </select>

            {/* <input
            type="text"
            id="cancellationPolicy"
            name="cancellationPolicy"
            value={formData.cancellationPolicy}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          /> */}
          </div>
        </div>
        <div className="mb-4 mt-8">
          <label
            htmlFor="description"
            className="block font-medium text-xl text-gray-700 mr-4 mb-2  pt-1"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Escape to this charming cottage nestled in the woods. With two cozy bedrooms and a fully equipped kitchen, this cottage is perfect for a romantic getaway or a family vacation."
            className="w-full border rounded-lg border-gray-300 p-2 h-32"
          />
        </div>

        <div className="flex justify-between align-middle mt-12">
          <div className="mb-4 flex align-middle border border-gray-300 px-3">
            <label
              htmlFor="id"
              className="block text-lg  pt-[8px] font-medium text-gray-700 mb-2"
            >
              Accomodates:
            </label>

            <div className="flex align-middle">
              <button
                onClick={() => decrement("accommodates")}
                className="w-8  m-2"
                type="button"
              >
                <img src={minus} alt="minus" />
              </button>
              <span className="py-2  text-lg">{formData.accommodates}</span>
              <button
                onClick={() => increment("accommodates")}
                className="w-8 m-2"
                type="button"
              >
                <img src={plus} alt="plus" />
              </button>
            </div>
          </div>

          <div className="mb-4 flex align-middle border  border-gray-200 px-3">
            <label
              htmlFor="id"
              className="block  text-lg pt-[8px] font-medium text-gray-700 mb-2"
            >
              Bedrooms:
            </label>

            <div className="flex align-middle">
              <button
                onClick={() => decrement("bedrooms")}
                className="w-8  m-2"
                type="button"
              >
                <img src={minus} alt="minus" />
              </button>
              <span className="py-2 text-lg">{formData.bedrooms}</span>
              <button onClick={() => increment("bedrooms")} type="button" className="w-8 m-2">
                <img src={plus} alt="plus" />
              </button>
            </div>
          </div>

          <div className="mb-4 flex align-middle border border-gray-200 px-3">
            <label
              htmlFor="id"
              className="block text-lg pt-[8px] font-medium text-gray-700 mb-2"
            >
              Beds:
            </label>

            <div className="flex align-middle">
              <button onClick={() => decrement("beds")} type="button" className="w-8  m-2">
                <img src={minus} alt="minus" />
              </button>
              <span className="py-2 text-lg">{formData.beds}</span>
              <button onClick={() => increment("beds")} type="button" className="w-8 m-2">
                <img src={plus} alt="plus" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-12">
          <div className="mb-4 flex align-middle border border-gray-200 px-3">
            <label
              htmlFor="id"
              className="block text-lg pt-[8px] font-medium text-gray-700 mb-2"
            >
              Bathrooms:
            </label>

            <div className="flex align-middle">
              <button
                onClick={() => decrement("bathrooms")}
                className="w-8  m-2"
                type="button"
              >
                <img src={minus} alt="minus" />
              </button>
              <span className="py-2 text-lg">{formData.bathrooms}</span>
              <button
                onClick={() => increment("bathrooms")}
                className="w-8 m-2"
                type="button"
              >
                <img src={plus} alt="plus" />
              </button>
            </div>
          </div>
          <div className="mb-4 flex align-middle justify-between">
            <label
              htmlFor="name"
              className="block font-medium text-xl text-gray-700 mr-4 pt-2"
            >
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-1"
            />
          </div>
        </div>

        {/* <div className="mb-4">
          <label htmlFor="id" className="block font-medium text-gray-700 mb-2">
            GuestsIncluded
          </label>
          <input
            type="number"
            id="guestsIncluded"
            name="guestsIncluded"
            value={formData.guestsIncluded}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div> */}

        {/* <div className="mb-4">
          <label
            htmlFor="cancellationPolicy"
            className="block font-medium text-gray-700 mb-2"
          >
            Space
          </label>
          <input
            type="text"
            id="space"
            name="space"
            value={formData.space}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div> */}

        {/* <div className="mb-4">
          <label
            htmlFor="cancellationPolicy"
            className="block font-medium text-gray-700 mb-2"
          >
            Notes
          </label>
          <input
            type="text"
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="cancellationPolicy"
            className="block font-medium text-gray-700 mb-2"
          >
            Transit
          </label>
          <input
            type="text"
            id="transit"
            name="transit"
            value={formData.transit}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div> */}

        {/* <div className="mb-4">
          <label
            htmlFor="cancellationPolicy"
            className="block font-medium text-gray-700 mb-2"
          >
            Access
          </label>
          <input
            type="text"
            id="access"
            name="access"
            value={formData.access}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="cancellationPolicy"
            className="block font-medium text-gray-700 mb-2"
          >
            Interaction
          </label>
          <input
            type="text"
            id="interaction"
            name="interaction"
            value={formData.interaction}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div> */}

        <div className="mb-4 mt-12 flex align-middle">
          <label
            htmlFor="cancellationPolicy"
            className="block font-medium text-gray-700 mb-2 text-lg mr-4 pt-2"
          >
            Rules:
          </label>
          <input
            type="text"
            id="rules"
            name="rules"
            value={formData.rules}
            onChange={handleChange}
            placeholder="No smoking / No pets / Quiet hours after 10pm"
            className="w-full border border-gray-400 p-2 rounded-lg"
          />
        </div>

        <div className="mb-4 mt-12 flex align-middle">
          <label
            htmlFor="images.pictureUrl"
            className="block font-medium text-gray-700 mb-2 text-lg w-1/5 pt-2"
          >
            Image URL:
          </label>
          <input
            type="text"
            id="images.pictureUrl"
            name="images.pictureUrl"
            value={formData.images.pictureUrl}
            onChange={handleChange}
            placeholder="Paste Image URL"
            className="w-full border border-gray-400 p-2 rounded-lg"
          />
        </div>

        {/* <div className="mb-4">
          <label
            htmlFor="cancellationPolicy"
            className="block font-medium text-gray-700 mb-2"
          >
            LastScraped
          </label>
          <input
            type="text"
            id="lastScraped"
            name="lastScraped"
            value={formData.lastScraped}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div> */}

        {/* <div className="mb-4">
          <label
            htmlFor="cancellationPolicy"
            className="block font-medium text-gray-700 mb-2"
          >
            ListingUrl
          </label>
          <input
            type="text"
            id="listingUrl"
            name="listingUrl"
            value={formData.listingUrl}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div> */}

        {/* <div className="mb-4">
          <label
            htmlFor="cancellationPolicy"
            className="block font-medium text-gray-700 mb-2"
          >
            numberOfReviews
          </label>
          <input
            type="number"
            id="numberOfReviews"
            name="numberOfReviews"
            value={formData.numberOfReviews}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div> */}

        {/* <div className="mb-4">
          <label
            htmlFor="cancellationPolicy"
            className="block font-medium text-gray-700 mb-2"
          >
            rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2"
          />
        </div> */}

        {/* <div className="flex mt-12 justify-start align-middle">
          <div className="mb-4 flex align-middle justify-between mt-4">
            <label
              htmlFor="name"
              className="block font-medium text-xl text-gray-700 mr-4 pt-1"
            >
              Host Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Cozy Cottage in the Woods"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div> */}

        <div className="flex flex-wrap -mx-4 mt-12">
          <div className="mb-4 px-4 w-full md:w-1/2">
            <label
              htmlFor="building"
              className="block font-medium text-xl text-gray-700 mb-2"
            >
              Building:
            </label>
            <input
              type="text"
              id="building"
              name="address.building"
              placeholder="123 Main St"
              value={formData.address.building}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg py-2 px-4"
            />
          </div>

          <div className="mb-4 px-4 w-full md:w-1/2">
            <label
              htmlFor="street"
              className="block font-medium text-xl text-gray-700 mb-2"
            >
              Street:
            </label>
            <input
              type="text"
              id="street"
              name="address.street"
              placeholder="Oakwood Lane"
              value={formData.address.street}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg py-2 px-4"
            />
          </div>

          <div className="my-4 px-4 w-full md:w-1/3">
            <label
              htmlFor="city"
              className="block font-medium text-xl text-gray-700 mb-2"
            >
              City:
            </label>
            <input
              type="text"
              id="city"
              name="address.city"
              placeholder="San Francisco"
              value={formData.address.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg py-2 px-4"
            />
          </div>

          <div className="my-4 px-4 w-full md:w-1/3">
            <label
              htmlFor="state"
              className="block font-medium text-xl text-gray-700 mb-2"
            >
              State:
            </label>
            <input
              type="text"
              id="state"
              name="address.state"
              placeholder="CA"
              value={formData.address.state}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg py-2 px-2"
            />
          </div>

          <div className="my-4 px-4 w-full md:w-1/3">
            <label
              htmlFor="country"
              className="block font-medium text-xl text-gray-700 mb-2"
            >
              Country:
            </label>
            <select
              id="country"
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              className="w-full border bg-white border-gray-300 rounded-lg py-[11px] px-4"
            >
              <option value="">Select a country</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
              <option value="Australia">Australia</option>
              <option value="Japan">Japan</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className=" self-center text-center py-2 px-4 bg-red-500 text-white rounded-lg mt-8"
          >
            Add a Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
