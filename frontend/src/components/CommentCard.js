import {useContext} from "react";
import {UserContext} from "../userContext";
import toast from "react-hot-toast";

function CommentCard(props) {
    const userContext = useContext(UserContext);

    async function handleOnClickDeleteBtn() {
        const commentId = props.comment._id;
        const url = "http://localhost:3001/comments/" + commentId;

        try {
            const res = await fetch(url, {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ photoId: props.photoId })
            });

            if (res.ok) {
                toast.success("Comment deleted!");
                props.onDelete(commentId);
            } else {
                toast.error("Failed to delete comment.");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the comment.");
            console.error(error);
        }
    }



    const isUserAuthenticated = userContext.user && userContext.user._id !== null;
const isUserAuthor =
    props.comment.postedBy._id === props.postAuthor ||
    userContext.user?._id === props.comment.postedBy._id ||
    userContext.user?._id === props.postAuthor;

return (
    <>
        <div className="card mt-3" key={props.comment._id}>
            <div className="card-body">
                <h5 className="card-title">{props.comment.title}</h5>
                <span className="text-muted">{props.comment.postedBy.username}</span>
                {isUserAuthenticated && isUserAuthor && (
                    <button
                        onClick={handleOnClickDeleteBtn}
                        className="btn border-0 text-decoration-underline text-muted float-end"
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    </>
);
}

export default CommentCard;
