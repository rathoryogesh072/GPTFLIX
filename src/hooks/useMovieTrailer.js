import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer=(movieId)=>{
    const dispatch=useDispatch();
    const trailerVideos=useSelector(store=>store.movies.trailerVideos);
    const getMovieVideos=async()=>{
        const data=await fetch(`https://api.themoviedb.org/3/movie/${movieId}$/videos?language=en-US`, API_OPTIONS);
        const json=await data.json();
        const filterdata=json.results.filter((video)=>(video.type==='Trailer'));
        const trailer=filterdata.length!==0?filterdata[0]:json.results[0];
        // console.log(trailer);
        dispatch(addTrailerVideo(trailer))
    }
    useEffect(()=>{
        if(!trailerVideos){
        getMovieVideos();
        }
    },[])
}

export default useMovieTrailer;