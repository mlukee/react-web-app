import {Link} from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


import toast from "react-hot-toast";
import {useState} from "react";

dayjs.extend(relativeTime);

function UserProfilePost(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function onClickHandleDeleteBtn() {
        const photoId = props.photo._id;
        const url = "http://localhost:3001/photos/" + photoId;
        const res = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        }).catch(err => toast.error(err)).then(
            setShow(false),
            toast.success("Photo deleted!"),
            props.onDelete(photoId)
        )
    }

    return (
        <>
            <div className="card mb-3 w-full">
                <div className="row g-0">
                    <div className="col-md-3">
                        <Link to={"/photo/" + props.photo._id}>
                            <img src={"http://localhost:3001/" + props.photo.path} alt={props.photo.name}
                                 className="img-fluid rounded-start" width="320" height="320"/>
                        </Link>
                    </div>
                    <div className="col-md-9 d-flex flex-column justify-content-between">
                        <div className="card-body">
                            <Link to={"/photo/" + props.photo._id} className="text-decoration-none text-black">
                                <h5 className="card-title">{props.photo.name}</h5>
                            </Link>
                            <p className="card-text"><small
                                className="text-muted">Uploaded: {dayjs(props.photo.date).fromNow()}</small></p>
                        </div>
                        <div className="mt-auto">
                            <button onClick={handleShow}
                                    className="btn btn-danger btn-sm float-end mb-2">Delete
                            </button>
                            {/*TODO: npm start -> frontend; npm run dev -> backend*/}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete a post?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={onClickHandleDeleteBtn}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default UserProfilePost;