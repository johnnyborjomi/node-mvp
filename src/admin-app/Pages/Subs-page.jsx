import React, {useEffect, useState} from 'react';
import SubscriberCard from '../Components/Subscriber-card.jsx';
import withPageLoader from '../hoc/PageLoader';

const SubsPage = ({data}) => {
    return (
         data.length ?
            data.map(subscriber => {
                return (
                    <SubscriberCard key={subscriber.id} subscriber={subscriber} />
                );
            })
            :
            <p>No Subscribers.</p>
    );
}

export default withPageLoader(SubsPage, 'subscribers');