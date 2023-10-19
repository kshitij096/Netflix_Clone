/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import { UserAuth } from "../context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };

const Movie = ({ item }) => {
  const [likes, setLikes] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [saved, setSaved] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLikes(!likes);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item?.id,
          title: item?.title,
          img: item?.poster_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };
  const opts = {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
    placeContent: "center",
  };

  const handleMovieTrailer = (item) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(item?.name || item?.title || item?.original_name || "")
        .then((url) => {
          // https://www.youtube.com/watch?v=j-BTk1gC6CA here v = j-BTk1gC6CA
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div
      onClick={() => handleMovieTrailer(item)}
      className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
    >
      <img
        className="w-[300px] h-[300px] inline-block cursor-pointer"
        src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
        alt={item?.title}
        value={item?.name}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        {user?.email ? (
          <p className="white-space-normal text-xs overflow-hidden md:text-sm font-bold flex justify-center items-center h-full text-center">
            {item?.title}
          </p>
        ) : (
          <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
            {item?.title}
          </p>
        )}

        {user?.email ? (
          <p onClick={saveShow}>
            {likes ? (
              <FaHeart className="absolute top-4 left-4 text-gray-300" />
            ) : (
              <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
            )}
          </p>
        ) : (
          ""
        )}
      </div>
      {trailerUrl && (
        <div className="mt-2">
          <Youtube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
};

export default Movie;
