import React, { useState, useEffect } from 'react';

import logoimg from '../../assets/images/logo.svg';
import landingimg from '../../assets/images/landing.svg';
import studyicons from '../../assets/icons/study.svg';
import giveClassesIcon from '../../assets/icons/give-classes.svg';
import purpleHeart from '../../assets/icons/purple-heart.svg';

import { Link } from 'react-router-dom'

import './styles.css';
import api from '../../services/api';
function Landing(){

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;

            setTotalConnections(total);
        })
    },[]);

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div id="logo-container">
                    <img src={logoimg} alt="Proffy"/>
                    <h2>Sua plataforma de estudos</h2>
                </div>
                <img 
                src={landingimg} 
                alt="Plataforma de estudos" 
                className="hero-image"/>

                <div className="button-container">
                    <Link to="/study" className="study">
                        <img src={studyicons} alt="Estudar"/>
                    Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Dar Aulas"/>
                        Dar Aulas
                    </Link>
                </div>
                <span className="total-connections">
                    Total de {totalConnections} conexões <img src={purpleHeart} alt=""/>
                </span>
            </div>
        </div>
    )
}

export default Landing;