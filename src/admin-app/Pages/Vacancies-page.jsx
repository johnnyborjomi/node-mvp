import React, {useState ,useEffect} from 'react';

export default props => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        const res = await fetch('/admin-api/vacancies');
        const data = await res.json();
        setData(data);
        setIsLoading(false);
        console.log(data);
        //fix bug
    });

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
                <a href="/admin/vacancy/add" className="btn green right">Add new vacancy</a>
            </div>
        </div>

        { data.length ?
            data.map(vacancy => {
                return (
                    <div className="card hoverable" key={vacancy.id}>
                        <div className="card-image waves-effect waves-block waves-light">
                        </div>
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">{vacancy.title}<i className="material-icons right">more_vert</i></span>
                            <p className="right-align">Posted: {vacancy.createDate}</p>
                            {vacancy.locations.length 
                                ?
                                <>
                                    <b>Locations: </b>
                                    {vacancy.locations.map(loc => {
                                        return <span key={loc + vacancy.id} className="location">{loc}</span>
                                    })}
                                </>
                                :  
                                null
                            }
                            {vacancy.vacancyType ?
                                <>
                                    <div className="spacer-xs"></div>
                                    <p className="vacancy-type">{vacancy.vacancyType}</p>
                                </>
                                : null
                            }
                            <p>Salary: <b>{vacancy.salary}</b></p>
                            <div className="spacer-md"></div>
                            <div className="row">
                                <div className="col s2">
                                    <a href="/admin/vacancy/{{id}}" className="btn hollow left">View</a>
                                </div>
                                <div className="col offset-s7 s2">
                                    <a href="/admin/vacancy/{{id}}/delete?allow=true" className="btn right">Delete</a>
                                </div>
                                <div className="col s1">
                                    <a href="/admin/vacancy/{{id}}/edit?allow=true" className="btn green right">Edit</a>
                                </div>
                            </div>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title grey-text text-darken-4">{vacancy.title}<i className="material-icons right">close</i></span>
                            <p>Vacancy Text:</p>
                            <p>{vacancy.text}</p>
                        </div>
                    </div>
                );
            })
            :
            <p>No Avaliable Vacancies.</p>
        }
        </>
    );
}
