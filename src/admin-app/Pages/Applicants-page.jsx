import React, {useEffect, useState} from 'react';
import ApplicantCard from '../Components/Applicant-card.jsx';

export default props => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        document.title = props.title;
        const res = await fetch('/admin-api/applicants');
        const resData = await res.json();
        setData(data => data.concat(resData));
        setIsLoading(isLoading => isLoading = false);
        console.log(resData);
    }, []);

    return (
        isLoading ?
        null:
        <>
        <div className="spacer"></div>
        <div className="row">
            <div className="col s8">
                <h1>Applicants List</h1>
            </div>
        </div>

        { data.length ?
            data.map(applicant => {
                return (
                    <ApplicantCard key={applicant.id} applicant={applicant} />
                );
            })
            :
            <p>No Applicants.</p>
        }
        </>
    );
}