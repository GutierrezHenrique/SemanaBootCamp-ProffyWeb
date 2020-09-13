import React from 'react';
import Routes from '../../router';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/icons/back.svg';
import './styles.css'

interface PageHeaderProps{
    title: string;
    description?: string;
}
const PageHeader: React.FC<PageHeaderProps>  = (props) => {
    return(
        <header className="page-header">
        <div id="top-bar-container">
            <Link to="/">
                <img src={backIcon} alt="Voltar"/>
            </Link>
     
        </div>       <img src={logoImg} alt=""/>
        <div className="header-content">
            <strong>{props.title}</strong>
            { props.description ? <p>{props.description}</p> : null }
            {props.children}
            </div>
           
    </header>


    );
}

function App(){
    return (
        <Routes />
    );
}

export default PageHeader;