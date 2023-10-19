import { useEffect, useState } from "react";
import requests from "../Request";
import axios from "axios";
import { UserAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Main() {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const [trailerUrl, setTrailerUrl] = useState("");
  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const truncateString = (str, num) => {
    return str?.length > num ? str.slice(0, num) + "..." : str;
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = async () => {
    if (!user?.email) {
      toast.success("Please LogIn or SignUp to Play", {
        theme: "dark",
      });
      return;
    }

    setIsOpen(true);
    if (!trailerUrl) {
      try {
        const url = await movieTrailer(
          movie?.name || movie?.title || movie?.original_title || ""
        );
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      } catch (error) {
        console.log(error);
      }
    } else {
      setTrailerUrl("");
    }
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full h-[600px] text-white">
      <ToastContainer autoClose={2000} />
      <div className="w-full h-full">
        <div className="absolute w-full h-[600px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button
              onClick={openModal}
              className="border text-white border-gray-300 py-2 px-5 ml-4"
            >
              Play Trailer
            </button>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
              {trailerUrl && (
                <div className="mt-2">
                  <Youtube videoId={trailerUrl} opts={customStyles} />
                </div>
              )}
            </Modal>
            <button className="border text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
