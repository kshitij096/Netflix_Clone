/* eslint-disable react/prop-types */

import {
  useState,
  Youtube,
  movieTrailer,
  UserAuth,
  arrayUnion,
  doc,
  updateDoc,
  db,
  toast,
  Button,
  Modal,
} from "../Components/index";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "400px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  // Adjust the margin value as needed
};

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

  const handleOpen = async (item) => {
    if (!user?.email) {
      toast.success("Please LogIn or SignUp to Play", {
        theme: "dark",
      });
      return;
    }
    if (!trailerUrl) {
      try {
        const url = await movieTrailer(
          item?.name || item?.title || item?.original_title || ""
        );
        const urlParams = new URLSearchParams(new URL(url).search);
        const newTrailerUrl = urlParams.get("v");
        if (newTrailerUrl) {
          setTrailerUrl(newTrailerUrl);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClose = () => {
    setTrailerUrl("");
  };

  return (
    <div className="w-[180px] sm:w-[200px] md:w-[240px] lg:w-[260px] inline-block cursor-pointer relative p-2">
      <Modal
        open={!!trailerUrl}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="relative aspect-w-16 aspect-h-9 top-1/2 left-1/2 mr-3 transform -translate-x-1/2 -translate-y-1/2  sm:w-3/4 sm:h-2/5 md:h-1/2 lg:w-2/3 lg:h-1/2 xl:w-3/4 xl:h-2/3">
          {trailerUrl && <Youtube videoId={trailerUrl} opts={style} />}
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal>
      <img
        className="  sm:w-[300px] sm:h-[300px] inline-block cursor-pointer"
        src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
        alt={item?.title}
        value={item?.name}
      />
      <div className="absolute top-0 left-0 w-full h-full  hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        {user?.email ? (
          <p
            onClick={() => handleOpen(item)}
            className=" whitespace-pre-line text-xs  p-2 overflow-hidden md:text-sm font-bold flex justify-center items-center  h-full text-center"
          >
            {item?.title}
          </p>
        ) : (
          <p
            onClick={() => handleOpen(item)}
            className="whitespace-pre-line p-2 text-xs md:text-sm font-bold flex justify-center items-center h-full text-center"
          >
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
    </div>
  );
};

export default Movie;
