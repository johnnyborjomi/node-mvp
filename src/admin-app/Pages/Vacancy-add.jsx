import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import initEditor from '../Vendors/editor';
import initSelect from '../Vendors/m-select';


export default props => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        initEditor();
        initSelect();
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('delete');
        const res = await fetch('/admin-api/vacancy/delete', {
            method: 'POST',
            body: JSON.stringify({
                id: data.id
            }),
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': window.csrf
            }
        });
        data = await res.json();
        console.log(data)
        if(data.deleted === 'success') {
            setSuccess(data.message);
            // setTimeout(() => {
            //     props.history.push('/vacancies');
            // }, 5000)
        }else{
            setError(data.message);
        }
    }

    return (
        <>
            <h1>Add New Vacancy</h1>

            <form className="form-with-editor">
                <div className="input-field">
                    <input placeholder="Vacancy Title" name="title" id="title" type="text" required className="validate"/>
                    <label htmlFor="title">Vacancy Title</label>
                    <span className="helper-text" data-error="Fill Title"></span>
                </div>
                <div className="input-field">
                    <input placeholder="Salary Range" name="salary" id="salary" type="number" required className="validate"/>
                    <label htmlFor="title">Salary Range</label>
                    <span className="helper-text" data-error="Fill Salary Range"></span>
                </div>
                <div className="spacer"></div>
                <div className="input-field">
                    <select name="locations" multiple id="location">
                        <option>Choose Location</option>
                    </select>
                    <label htmlFor="location">Location</label>
                </div>
                <div className="spacer"></div>

                <div className="input-field">
                    <select name="vacancyType" id="vacancyType">
                        <option>Choose Vacancy Type</option>
                    </select>
                    <label htmlFor="vacancyType">Vacancy Type</label>
                </div>
                <div className="spacer"></div>
                <label htmlFor="text">Vacancy Text</label>
                <div className="spacer-md"></div>
                <div id="editorjs" className="editorjs"></div>
                <div className="spacer"></div>
                <input type="hidden" name="text" id="text" required className="editor-textinput"/>

                <button className="btn btn-primary">Post Vacancy</button>
            </form>
            <div className="spacer"></div>

        </>
    );
}