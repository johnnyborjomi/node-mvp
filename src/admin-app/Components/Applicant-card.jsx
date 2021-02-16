import React from 'react';
import {dateFromJSONDate, money} from '../Vendors/helpers';

export default ({applicant}) => {
    const {fullName, email, cv, createDate, vacancyId, message} = applicant;
    return (
        <div className="card hoverable">
            <div className="card-content">
                <b>Full Name: </b><span>{fullName}</span>
                <br/>
                <b>Email: </b><span>{email}</span>
                <br/>
                <b>CV: </b>
                <a href={`/cv/${cv.name}`} target="_blank" download>Download CV</a>
                {cv.file.contentType ?
                    <>
                        <br/>Preview: 
                        <div className="cv-wrap"><img src={`/cv/${cv.name}`} alt={`${fullName}-cv`}/></div>
                    </>
                : null}
                <br/>
                <b>Message: </b><span>{message}</span>
                <br/>
                <b>Date Subscirbed: </b><span>{dateFromJSONDate(createDate)}</span>
                <hr/>
                <b>Vacancy Applied: </b><a href={`/admin-app/vacancy/${vacancyId.id}`}>{vacancyId.title}</a>
                <br/>
                <b>Vacancy salary: </b><span>{money(vacancyId.salary)}</span>
                <div className="row">
                    <div className="col offset-s10 s2">
                        <a href={`/admin-app/applicants/${vacancyId.id}/delete`} className="btn right">Delete</a>
                    </div>
                </div>
            </div>
        </div>
    );
}