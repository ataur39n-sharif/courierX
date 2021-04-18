import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

const Services = () => {
    const [services, setServices] = useState([])
    let history = useHistory()
    let { path, url } = useRouteMatch();

    useEffect(() => {
        fetch(`https://frozen-inlet-20228.herokuapp.com/serviceList`)
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                setServices(data)
            })
    }, [])

    const handleClick = (id) => {

    }

    return (
        <div>
            {
                services.map(service => <li key={service._id}>name: {service.title} cost: {service.cost} <Link to={`/details/${service._id}`}><button>buy now</button></Link></li>)
            }
        </div>
    );
};

export default Services;