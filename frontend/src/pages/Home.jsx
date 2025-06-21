import React from 'react';
import Hero from "../components/Hero.jsx";
import Recommendation from "../components/Recommendation.jsx";

const Home = () => {
    return (
        <div>
            <Hero/>
            <hr className="border-t-2 border-gray-300 mb-4 mt-4" />
            <h1 className="font-bold text-sm text-center md:text-base text-black m-5 ">¡Esto no es todo, mijo! Aquí hay más productos que excusas pa' no pagar fiado!</h1>
            <hr className="border-t-2 border-gray-300 mb-4" />
            <Recommendation/>
        </div>
    );
};

export default Home;