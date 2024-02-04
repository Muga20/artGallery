import { Link, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../../middleware/Api";
import { AiFillHeart } from "react-icons/ai";


function LikedArts() {
  const [likedArts, setLikedArts] = useState([]);
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const refreshData = async () => {
    try {
      const response = await api(
        '/art/get_all_likes_by_user',
        "GET",
        {},
     
      );
      setLikedArts(response.arts);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    refreshData();
  }, [id]);

  const handleLike = async (artId) => {
    try {
      const response = await api(
        `/art/create_like`,
        "POST",
        {},
        { artId: artId }
      );

      // Update likes count and isLiked state for the specific artwork
      setLikesCount((prevLikes) => ({
        ...prevLikes,
        [artId]: prevLikes[artId] + 1,
      }));
      setIsLiked((prevLiked) => ({ ...prevLiked, [artId]: true }));
      refreshData();
    } catch (err) {
      console.error(err);
    }
  };

    
  return (
    <div className="p-4">
      <h2 className="text-2xl text-white font-semibold mb-4">Liked Arts </h2>
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 mt-10">
        {likedArts?.map((art) => (
          <div
          key={art.id}
          class="group border-gray-100/30  lg:mx-3 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-gray-700 shadow-md"
        >
          <Link
            to={`/single-art/${art.art.id}`}
            class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
          >
            <img
              class="peer absolute top-0 right-0 h-full w-full object-cover"
              src={art.art.image}
              alt="product image"
            />
          </Link>

            <div class="mt-4 px-5 pb-5">
            <div className="flex gap-3">
              <h5 class="text-lg  lg:text-md tracking-tight text-white">
                {art.art.name}
              </h5>
            
                <p className="text-gray-400 text-sm">
                {/* {art.likes.length} */}
                </p>
                  <button
                
                    class="text-sm text-gray-400 hover:text-gray-300"
                     // Triggers 'handleLike' function with the art ID
                  >
                    <AiFillHeart
                        onClick={() => handleLike(art.art.id)} 
                      className={`text-red-500 text-lg ml-2 cursor-pointer ${
                        isLiked[art.art.id] ? "text-red-500" : ""
                      }`}
                    />
                  </button>
          
            </div>
            <div class="mt-1 flex items-center justify-between">
              <p>
                <span class="text-sm  lg:text-lg font-bold text-white">
                  Ksh {art.art.price}
                </span>
              </p>
            </div>
            <div class="flex items-center justify-between pt-1">
              <Link
                to={`/single-art/${art.art.id}`}
                class="text-sm py-2 lg:py-1 px-2 lg:mr-2 rounded-lg border hover:border-slate-900 hover:bg-slate-900 lg:text-lg font-bold text-white mb-2 lg:mb-0"
              >
                More
              </Link>
              
            </div>
          </div>
          </div>
        ))}
  </div>
</div>
  );
}

export default LikedArts;