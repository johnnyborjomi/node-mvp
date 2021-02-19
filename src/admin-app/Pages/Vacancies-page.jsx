import React, {useState ,useEffect} from 'react';
import {Link} from 'react-router-dom';
import VacancyCard from '../Components/Vacancy-card.jsx'
import withPageLoader from '../hoc/PageLoader';

const VacanciesPage = ({data}) => {

    return (
        <>
        <div className="row">
            <div className="col right">
                <Link to="/vacancy/add" className="btn green right">Add new vacancy</Link>
            </div>
        </div>

        { data.length ?
            data.map(vacancy => {
                return (
                    <VacancyCard key={vacancy.id} vacancy={vacancy} />
                );
            })
            :
            <p>No Avaliable Vacancies.</p>
        }
        </>
    );
}

export default withPageLoader(VacanciesPage, 'vacancies');