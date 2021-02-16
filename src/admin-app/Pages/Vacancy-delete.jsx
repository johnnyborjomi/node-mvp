import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

export default props => {
    let [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(async () => {
        const res = await fetch(`/admin-api/vacancy/${props.match.params.id}`);
        if(res.status === 404) {
            props.history.push('/404');
        } else {
            const resData = await res.json();
            if(resData.error) setError(resData.message);
            setData(olddata => olddata = resData);
            document.title = 'Delete ' + resData.title;
            setIsLoading(false);
            console.log(data);
        }
    }, []);

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
        isLoading ?
        null:
        <>
            <h1>Delete <b>"{data.title}"</b> Vacancy?</h1>
            <hr/>
            {error || success ?
                <p className={'form-message' + (error ? ' alert' : '') + (success ? ' success' : '')}>
                    {error || success}!
                </p> : null
            }
            {!success ? 
                <>
                <button className="btn btn-primary" onClick={submitHandler}>Delete Vacancy</button> 
                <Link className="btn grey" to={`/vacancy/${props.match.params.id}`}>Cancel</Link>
                </>
                : null
            }
            <p>
            <Link className="" to={`/vacancies`}>Back to vacancies</Link>
            </p>
            
        </>
    );
}