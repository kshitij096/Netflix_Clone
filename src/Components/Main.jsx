import {
  useEffect,
  useState,
  axios,
  requests,
  UserAuth,
  ToastContainer,
  toast,
  Youtube,
  movieTrailer,
  Button,
  Modal,
} from "../Components/index";
import "react-toastify/dist/ReactToastify.css";

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

const Main = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      // console.log(response.data.results);
      setMovies(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ]
      );
    });
  }, []);

  const truncateString = (str, num) => {
    return str?.length > num ? str.slice(0, num) + "..." : str;
  };

  const handleOpen = async () => {
    if (!user?.email) {
      toast.success("Please LogIn to Play", {
        theme: "dark",
      });
      return;
    }
    if (!trailerUrl) {
      try {
        const url = await movieTrailer(
          movies?.name || movies?.title || movies?.original_title || ""
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
    <div className="w-full h-[600px] text-white">
      <ToastContainer autoClose={2000} />
      <div className="w-full h-full">
        <div className="absolute w-full h-[600px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movies?.poster_path}`}
          alt={movies?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movies?.title}</h1>
          <div className="my-4">
            {user?.email ? (
              <Button variant="outlined" onClick={handleOpen}>
                Play Trailer
              </Button>
            ) : (
              <button
                onClick={handleOpen}
                className="border text-white border-gray-300 py-2 px-5  cursor-pointer hover:bg-blue-800 "
              >
                Play Trailer
              </button>
            )}
            {/* <Button variant="outlined" onClick={handleOpen}>
              Play Trailer
            </Button> */}
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

            <button className="border text-white border-gray-300 py-2 px-5 ml-4 cursor-default">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movies?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateString(movies?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
