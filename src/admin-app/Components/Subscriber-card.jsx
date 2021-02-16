import React from 'react';
import {dateFromJSONDate} from '../Vendors/helpers';

export default ({subscriber}) => {
    return (
        <div className="card hoverable">
            <div className="card-content">
                <b>Email: </b><span>{subscriber.email}</span>
                <br/>
                <b>Date Subscirbed: </b><span>{dateFromJSONDate(subscriber.createDate)}</span>
            </div>
        </div>
    );
}