import axios from "axios";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export interface Listing {
  _id: string;
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
  numberOfReviews: number;
  rating: number;
  amenities: string[];
  images: Image;
  hostInfo: Host;
  location: Location;
  address: Address;
  rules: string;
}

interface Image {
  pictureUrl: string;
  thumbnailUrl: string;
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
  id: number;
  address: Address;
  contactNo: string;
  hostIdentityVerified: boolean;
}

interface Location {
  lat: string;
  lng: string;
}

interface ListingsContextProps {
  listings: Listing[];
  displayListings: Listing[];
  addListing: (listing: Listing) => void;
  removeListing: (id: number) => void;
  setListings: Dispatch<SetStateAction<Listing[]>>;
  filterListings: (searchTerm: string) => void;
}

export const ListingsContext = createContext<ListingsContextProps>({
  // listings: [
  //   {
  //     id: 1,
  //     name: "Luxury Suite in NYC",
  //     image: "https://picsum.photos/800/600",
  //     description: "Gorgeous suite in heart of NYC",
  //     location: "New York",
  //     rating: 4.9,
  //   },
  //   {
  //     id: 2,
  //     name: "Beach House in Miami",
  //     image: "https://picsum.photos/300/200",
  //     description: "Relaxing beachfront property",
  //     location: "Miami",
  //     rating: 4.8,
  //   },
  //   {
  //     id: 3,
  //     name: "Mountain Cabin in Aspen",
  //     image: "https://picsum.photos/300/200",
  //     description: "Cozy cabin with scenic views",
  //     location: "Aspen",
  //     rating: 4.7,
  //   },
  //   {
  //     id: 4,
  //     name: "City Loft in Chicago",
  //     image: "https://picsum.photos/300/200",
  //     description: "Stylish loft in bustling Chicago",
  //     location: "Chicago",
  //     rating: 4.6,
  //   },
  //   {
  //     id: 5,
  //     name: "Lakeside Retreat in Toronto",
  //     image: "https://picsum.photos/300/200",
  //     description: "Peaceful retreat by the lake",
  //     location: "Toronto",
  //     rating: 4.5,
  //   },
  //   {
  //     id: 6,
  //     name: "Luxury Villa in Los Angeles",
  //     image: "https://picsum.photos/300/200",
  //     description: "Luxurious villa in LA",
  //     location: "Los Angeles",
  //     rating: 4.9,
  //   },
  //   {
  //     id: 7,
  //     name: "Rustic Cottage in Seattle",
  //     image: "https://picsum.photos/300/200",
  //     description: "Charming cottage in Seattle",
  //     location: "Seattle",
  //     rating: 4.8,
  //   },
  //   {
  //     id: 8,
  //     name: "Beachfront Condo in San Diego",
  //     image: "https://picsum.photos/300/200",
  //     description: "Stunning beachfront condo",
  //     location: "San Diego",
  //     rating: 4.7,
  //   },
  //   {
  //     id: 9,
  //     name: "Contemporary Home in Dallas",
  //     image: "https://picsum.photos/300/200",
  //     description: "Modern home in bustling Dallas",
  //     location: "Dallas",
  //     rating: 4.6,
  //   },
  //   {
  //     id: 10,
  //     name: "Chic Apartment in Montreal",
  //     image: "https://picsum.photos/300/200",
  //     description: "Elegant apartment in Montreal",
  //     location: "Montreal",
  //     rating: 4.5,
  //   },
  // ],
  listings: [],
  displayListings: [],
  addListing: () => {},
  removeListing: () => {},
  setListings: () => {},
  filterListings: () => {},
});

const ListingsContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [displayListings, setDisplayListings] = useState<Listing[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5500/api/properties").then((res) => {
      setListings(() => {
        return res.data;
      });
      setDisplayListings(() => {
        return res.data;
      });
      console.log(res.data);
    });
  }, []);

  const filterListings = (searchTerm: string) => {
    setDisplayListings(
      listings.filter((item) => {
        const itemName = item.name.toLowerCase();
        const itemDescription = item.description.toLowerCase();
        const search = searchTerm.toLowerCase();
        return (
          itemName.includes(searchTerm) || itemDescription.includes(search)
        );
      })
    );
  };

  const addListing = (listing: Listing) => {
    setListings([...listings, listing]);
  };

  const removeListing = (id: number) => {
    setListings(listings.filter((listing) => listing.id !== id));
  };

  return (
    <ListingsContext.Provider
      value={{
        listings,
        displayListings,
        addListing,
        removeListing,
        setListings,
        filterListings,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};

export default ListingsContextProvider;
