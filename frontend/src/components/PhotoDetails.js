import {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import FormattedDate from "./FormattedDate";
import Comments from "./Comments";
import {AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike} from "react-icons/ai";
import toast from "react-hot-toast";
import {UserContext} from "../userContext";


function PhotoDetails() {
    const [photo, setPhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [likes, setLikes] = useState(0);

    const params = useParams();
    const userContext = useContext(UserContext);
    console.log(userContext);

    useEffect(() => {
        const getPhoto = async () => {
            try {
                const res = await fetch(`http://localhost:3001/photos/${params.id}`);
                const data = await res.json();
                setPhoto(data);
                setIsLoading(false); // Mark the initial loading as completed
                setLikes(data.likes)
                if (userContext.user !== null) {

                    if (data.likedBy.includes(userContext.user._id)) {
                        setIsLiked(true);
                    }
                    if (data.dislikedBy.includes(userContext.user._id)) {
                        setIsDisliked(true);
                    }
                }
            } catch (error) {
                toast.error(error);
            }
        };

        getPhoto();
    }, [params.id, userContext]); // Include userContext as a dependency


    if (isLoading || !photo) {
        // Render a loading state or "Photo not found" message while loading or if the photo data is null
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 fw-bold">
                {isLoading ? "Loading..." : "Photo not found"}

            </div>

        );
    }

    async function likeEventHandler() {
        if(userContext.user === null) return;
        if (isDisliked === false) {
            try {
                if (isLiked) {
                    await fetch(`http://localhost:3001/photos/${photo._id}/unlike`, {
                        method: 'PUT',
                        credentials: 'include',
                        headers: {'Content-Type': 'application/json'},
                    });
                    setLikes((likes) => likes - 1);
                    setIsLiked(false);
                } else {
                    await fetch(`http://localhost:3001/photos/${photo._id}/like`, {
                        method: 'PUT',
                        credentials: 'include',
                        headers: {'Content-Type': 'application/json'},
                    });
                    setLikes((likes) => likes + 1);
                    setIsLiked(true);
                }
            } catch (error) {
                console.error('Error in likeEventHandler:', error);
                toast.error('Failed to perform like operation.');
            }
        }
    }

    async function dislikeEventHandler() {
        if(userContext.user === null) return;
        if (isLiked === false) {
            try {
                if (isDisliked) {
                    await fetch(`http://localhost:3001/photos/${photo._id}/undislike`, {
                        method: 'PUT',
                        credentials: 'include',
                        headers: {'Content-Type': 'application/json'},
                    });
                    setIsDisliked(false);
                } else {
                    await fetch(`http://localhost:3001/photos/${photo._id}/dislike`, {
                        method: 'PUT',
                        credentials: 'include',
                        headers: {'Content-Type': 'application/json'},
                    });
                    setIsDisliked(true);
                }
            } catch (error) {
                console.error('Error in dislikeEventHandler:', error);
                toast.error('Failed to perform dislike operation.');
            }
        }
    }


    return (
        <div className="container mt-4">
            <h1>{photo.name}</h1>
            <div className="row mb-3">
                <div className="col-md-2">
                    <span className="text-muted">Posted: {photo.postedBy.username}</span>
                </div>
                <div className="col-md-3 text-muted">
                    <FormattedDate date={photo.date}/>
                </div>
                <div className={"col-md-6 text-end"}>
                    <span className="text-muted">Views: {photo.views}</span>
                </div>
            </div>
            <img src={"http://localhost:3001/" + photo.path} alt={photo.name} className="img-fluid" width="800"
                 height="800"/>
            <br/>
            <div className="border rounded p-1 bg-light fs-3 mt-3 d-inline-block">
                <div className="border-0 mx-1">
                    {isLiked ? <AiFillLike onClick={likeEventHandler}/> : <AiOutlineLike onClick={likeEventHandler}/>}
                    <span className="fs-5 mx-2">{likes}</span>|
                    <span className="mx-2">
                        {isDisliked ? <AiFillDislike onClick={dislikeEventHandler}/> :
                            <AiOutlineDislike onClick={dislikeEventHandler}/>}
                    </span>
                </div>
            </div>
            <div className="mt-3">
                <Comments photoId={photo._id} postAuthor={photo.postedBy}/>
            </div>
        </div>
    )
        ;
}

export default PhotoDetails;
