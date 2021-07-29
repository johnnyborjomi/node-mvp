import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fullDateFromJSON, money, editorText } from '../Vendors/helpers';

export default props => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        const res = await fetch(`/admin-api/vacancy/${props.match.params.id}`);
        const resData = await res.json();
        console.log('data: ', resData);
        setData(resData);
        document.title = resData.title;
        setIsLoading(false);
    }, []);

    return (
        isLoading ?
            <span>Loading...</span>
            :
            <>
                <div className="spacer">
                    <Link to="/vacancies">Back to vacancies</Link>
                </div>
                <div className="row right">
                    <div className="col">
                        <Link to={`/vacancy/${data.id}/delete`} className="btn right">Delete</Link>
                    </div>
                    <div className="col">
                        <Link to={`/vacancy/${data.id}/edit`} className="btn green right">Edit</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col s8">
                        <h1>{data.title}</h1>
                    </div>
                    <div className="col s4 align-right">
                        <p className="right-align">
                            <b>Posted: </b>
                            {fullDateFromJSON(data.createDate)}
                        </p>
                    </div>
                </div>
                {data.locations.length ?
                    <div className="row">
                        <div className="col s12">
                            <b>Locations: </b>
                            {data.locations.map(loc => <span className="location" key={loc}>{loc}</span>)}
                        </div>
                    </div>
                    : null
                }
                <div className="row">
                    <div className="col s12">
                        {data.vacancyType ?
                            <p className="vacancy-type">{data.vacancyType}</p>
                            : null
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        {data.published ?
                            <span className="published green">Published</span>
                            :
                            <span className="published red">Not published</span>
                        }
                    </div>
                </div>

                <div className="row">
                    <div className="col s12">
                        <b>Salary: </b>
                        <span>{money(data.salary)}</span>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col s12">
                        <div
                            className="vacancy-content"
                            dangerouslySetInnerHTML={{ __html: editorText(data.text) }}></div>
                    </div>
                </div>
            </>
    );
}
