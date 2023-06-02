import React, {useContext, useState} from 'react'
import {Navigate} from 'react-router';
import {UserContext} from '../userContext';
function AddPhoto(props) {

    const userContext = useContext(UserContext);
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [uploaded, setUploaded] = useState(false);
    const [selected, setSelected] = useState("Avtomobili");

    async function onSubmit(e) {
        e.preventDefault();

        if (!name) {
            alert("Vnesite ime!");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', file);
        formData.append('category', selected);
        const res = await fetch('http://localhost:3001/photos', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const data = await res.json();

        setUploaded(true);
    }

    return (
        <div className="container mt-3">
            <h1 className="mb-3">Dodaj sliko</h1>
            <form className="form-group" onSubmit={onSubmit}>
                {!userContext.user ? <Navigate replace to="/login"/> : ""}
                {uploaded ? <Navigate replace to="/"/> : ""}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" name="ime" id="floatingInput" placeholder="Ime slike" value={name} onChange={(e) => {
                        setName(e.target.value)}
                    } />
                        <label htmlFor="floatingInput">Ime slike</label>
                </div>
                <div className="mb-3">
                    <input className="form-control" type="file" id="file" onChange={(e) => {
                        setFile(e.target.files[0])
                    }} />
                </div>
                <fieldset>
                <select className="form-select mb-3" required
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}>
                    <option>Avtomobili</option>
                    <option>Windows 11</option>
                    <option>Windows 10</option>
                    <option>Anime</option>
                    <option>Novo</option>
                    <option>Youtube</option>
                    <option>Test</option>
                    <option>OK</option>
                </select>
            </fieldset>

                <input className="btn btn-primary" type="submit" name="submit" value="Naloži"/>
            </form>
        </div>
    )
}

export default AddPhoto;