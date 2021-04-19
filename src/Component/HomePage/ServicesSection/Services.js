import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import './Services.css'


import ReactDOM from 'react-dom'
import { useSpring, animated } from 'react-spring'

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`


const Services = () => {

    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))


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

    const handelClick = (id) => {
        history.push(`/details/${id}`)
    }

    return (
        // <div>
        //     {
        //         services.map(service => <li key={service._id}>name: {service.title} cost: {service.cost} <Link to={`/details/${service._id}`}><button>buy now</button></Link></li>)
        //     }
        // </div>


        <div className='row w-100 text-center p-5 bg-light rounded'>
            <h1 className='p-5'>Our Services</h1>
            {
                services.map(service =>



                    <div key={service._id} className="col-sm-6 col-md-4  d-flex justify-content-center mb-3 ">

                        {/* <animated.div
                            onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                            onMouseLeave={() => set({ xys: [0, 0, 1] })}
                            style={{ transform: props.xys.interpolate(trans) }}>
 */}

                            <div className="card p-3" style={{ width: "18rem" }}>
                                {/* <img src={images}  alt=""> */}
                                <img className="p-2 bg-light rounded" style={{ height: "190px" }} src={service.image} alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">{service.title}</h5>
                                    <h1 className="card-title">${service.cost}</h1>
                                    <button onClick={() => handelClick(service._id)} className="btn btn-warning mb-2">view details</button>
                                </div>
                            </div>


                        {/* </animated.div> */}

                    </div>


                )
            }
        </div>



    );
};

export default Services;