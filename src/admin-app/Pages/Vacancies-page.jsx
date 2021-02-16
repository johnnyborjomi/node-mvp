import React, {useState ,useEffect} from 'react';
import {Link} from 'react-router-dom';
import VacancyCard from '../Components/Vacancy-card.jsx'

export default props => {
    console.log(props)

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        document.title = props.title;
        const res = await fetch('/admin-api/vacancies');
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
                <h1>Vacancies List</h1>
            </div>
            <div className="col s4">
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
