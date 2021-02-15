import React, {useEffect, useState} from 'react';
import SubscriberCard from '../Components/Subscriber-card.jsx';

export default props => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        document.title = props.title;
        const res = await fetch('/admin-api/subscribers');
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
                <h1>Subscribers List</h1>
            </div>
        </div>

        { data.length ?
            data.map(subscriber => {
                return (
                    <SubscriberCard key={subscriber.id} subscriber={subscriber} />
                );
            })
            :
            <p>No Subscribers.</p>
        }
        </>
    );
}