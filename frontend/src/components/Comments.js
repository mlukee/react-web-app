import {UserContext} from "../userContext";
import {useState, useEffect} from "react";
import CommentCard from "./CommentCard";

function Comments(props) {
    const [comment, setComment] = useState([]);
    const [comments, setComments] = useState([]);

    const handleDeleteComment = (commentId) => {
        setComments(preComments => preComments.filter(comment => comment._id !== commentId));
    };

    async function Comment(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/comments", {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: comment,
                photoId: props.photoId
            })
        });
        const data = await res.json();
        if (data._id !== undefined) {
            setComment("");
            setComments([...comments, data]);
        }
    }

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`http://localhost:3001/photos/${props.photoId}/comments`);
                const data = await res.json();
                setComments(data);
            } catch (error) {
                console.error(error);
            }
        };

        getComments();
    }, []);

    return (
        <div className="mb-5">
            <h1>Komentarji</h1>
            <UserContext.Consumer>
                {context => (
                    context.user ?
                        <>
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <div className="d-flex">
                                        <div className="form-floating me-3">
                                            <input type="text" className="form-control" name="comment"
                                                   id="floatingInput" placeholder="Vnesi komentar" value={comment}
                                                   onChange={(e) => setComment(e.target.value)}/>
                                            <label htmlFor="floatingInput">Komentar</label>
                                        </div>
                                        <button onClick={Comment} className="btn btn-primary">Komentiraj</button>
                                    </div>
                                </div>
                            </div>

                        </>
                        :
                        <>                       </>
                )}

            </UserContext.Consumer>
            <>
                {comments.map((comment) => (
                    <CommentCard photoId={props.photoId} comment={comment} postAuthor={props.postAuthor._id} onDelete={handleDeleteComment} key={comment._id}/>
                ))}
            </>
        </div>
    )
}

export default Comments;