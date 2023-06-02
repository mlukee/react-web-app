import {useContext, useEffect, useState} from 'react';
import {UserContext} from '../userContext';
import {Navigate} from 'react-router-dom';
import UserProfilePost from "./UserProfilePost";

function Profile() {
    const userContext = useContext(UserContext);
    const [profile, setProfile] = useState({});
    const [userPosts, setUserPosts] = useState([{}]);

    useEffect(function () {
        const getProfile = async function () {
            const res = await fetch("http://localhost:3001/users/profile", {credentials: "include"});
            const data = await res.json();
            setProfile(data);
        }
        const getUserPosts = async function () {
            const res = await fetch("http://localhost:3001/photos/user", {credentials: "include"});
            const data = await res.json();
            setUserPosts(data);
        }
        getProfile();
        getUserPosts();
    }, []);

    const handleDeletePost = (photoId) => {
        setUserPosts(prevUserPosts => prevUserPosts.filter(post => post._id !== photoId));
    };

    function getLikes(userPosts){
        let likes = 0;
        userPosts.forEach(post => {
            likes += post.likes;
        })
        return likes;
    }

    return (
        <>
            <div className="container mt-3">
                {!userContext.user ? <Navigate replace to="/login"/> : ""}
                <h1>User profile</h1>
                <div className="row">
                    <div className="col-md-6">
                        <span className="fw-bold">Username:</span><span> {profile.username}</span>
                    </div>
                    <div className="col-md-6">
                        <span className="fw-bold">Email: </span><span> {profile.email}</span>
                    </div>
                </div>
                    <hr/>
                <div className="row">
                    <span className="fs-2 fw-bold mb-2 col-md-6">Stevilo mojih objav: {userPosts.length}</span>
                    <span className="fs-2 fw-bold mb-2 col-md-6">Skupno stevilo vseckov: {getLikes(userPosts)}</span>
                </div>
                <div className="row">
                    {userPosts.map((post, index) => (
                        <UserProfilePost key={index} photo={post} onDelete={handleDeletePost}/>
                        ))}
                </div>
            </div>
        </>
    );
}

export default Profile;