import React, {useEffect, useState} from 'react';
import ApplicantCard from '../Components/Applicant-card.jsx';
import withPageLoader from '../hoc/PageLoader';

const ApplicantPage = ({data}) => {
    return (
        data.length ?
            data.map(applicant => {
                return (
                    <ApplicantCard key={applicant.id} applicant={applicant} />
                );
            })
            :
            <p>No Applicants.</p>
        
    );
}

export default withPageLoader(ApplicantPage, 'applicants');