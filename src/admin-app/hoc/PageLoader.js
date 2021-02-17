import React, {useState, useEffect} from 'react';

export default (Component, endpoint) => {
    return props => {
        const [data, setData] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
    
        useEffect(async () => {
            document.title = props.title;
            const res = await fetch(`/admin-api/${endpoint}`);
            const resData = await res.json();
            setData(data => data.concat(resData));
            setIsLoading(isLoading => isLoading = false);
            console.log(resData);
        }, []);
    
        return (
            isLoading ?
            <strong>Loading...</strong>:
            <Component data={data}/>
        );
    }
}