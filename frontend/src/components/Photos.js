import React, {useState, useEffect} from 'react';
import Photo from './Photo';
import toast from "react-hot-toast";

function Photos() {
    const [photos, setPhotos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const getPhotos = async () => {
            const res = await fetch('http://localhost:3001/photos');
            const data = await res.json();
            setPhotos(data);
        };
        getPhotos();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredPhotos = photos.filter((photo) =>
        searchQuery !== "" ?
            photo && photo.category && photo.category.toLowerCase().includes(searchQuery.toLowerCase())
            :
            true
    );

    return (
        <div className="container mt-3 mb-5">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h1 className="fs-1 mb-0">Photos</h1>
                <input
                    type="text"
                    className="form-control w-25 float-end"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            {photos.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {filteredPhotos.map((photo) => (
                        <Photo photo={photo} key={photo._id}/>
                    ))}
                </div>
            ) : (
                <p>No posts...</p>
            )}
        </div>
    );
}

export default Photos;