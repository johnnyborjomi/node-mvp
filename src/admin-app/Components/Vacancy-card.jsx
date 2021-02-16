import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {dateFromJSONDate, money, editorText} from '../Vendors/helpers';

const toggledStyle = {
    transform: 'translateY(-100%)'
}

export default ({vacancy}) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="card hoverable" key={vacancy.id}>
            <div className="card-image waves-effect waves-block waves-light">
            </div>
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                    {vacancy.title}
                    <i className="material-icons right" onClick={() => setIsOpen(true)}>more_vert</i>
                </span>
                <p className="right-align">Posted: {dateFromJSONDate(vacancy.createDate)}</p>
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
                <p>Salary: <b>{money(vacancy.salary)}</b></p>
                <div className="spacer-md"></div>
                <div className="row">
                    <div className="col s2">
                        <Link 
                            to={'/vacancy/' + vacancy.id} 
                            className="btn hollow left">
                                View
                        </Link>
                    </div>
                    <div className="col offset-s7 s2">
                        <Link 
                            to={`/vacancy/${vacancy.id}/delete`} 
                            className="btn right">
                                Delete
                        </Link>
                    </div>
                    <div className="col s1">
                        <Link 
                            to={`/vacancy/${vacancy.id}/edit`} 
                            className="btn green right">
                                Edit
                        </Link>
                    </div>
                </div>
            </div>
            <div className="card-reveal" style={isOpen ? toggledStyle : null}>
                <span className="card-title grey-text text-darken-4">
                    {vacancy.title}
                    <i className="material-icons right" onClick={() => setIsOpen(false)}>close</i>
                </span>
                <p>Vacancy Text:</p>
                <p 
                    dangerouslySetInnerHTML={{
                        __html: editorText(vacancy.text)
                    }}
                ></p>
            </div>
        </div>
    );
}