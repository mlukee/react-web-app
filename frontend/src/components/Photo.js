import {Link} from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function Photo(props) {
    return (
        <div className="col">
            <div className="card h-100 d-flex flex-column">
                <span
                    className="position-absolute top-0 start-50 fs-6 translate-middle badge rounded-pill bg-success">{props.photo.views} 👀</span>
                <img src={"http://localhost:3001/" + props.photo.path} alt={props.photo.name} className="card-img-top"/>
                <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                        <div className="row">
                            <div className="col-md-8">
                                <span className="card-title fs-4 fw-bold">{props.photo.name}</span>
                            </div>
                            <div className="col-md-4">
                                {props.photo.category &&
                                <span className="rounded border border-info p-1 bg-info">{props.photo.category}</span> }
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-6">
                                <span className="card-text text-muted">@{props.photo.postedBy.username}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <Link to={"/photo/" + props.photo._id} className="btn btn-primary">Poglej vec</Link>
                    </div>
                </div>
                <div className="card-footer text-muted">
                    <span className="card-text text-muted float-start">{dayjs(props.photo.date).fromNow()}</span>

                </div>
            </div>
        </div>

    );
}

export default Photo;