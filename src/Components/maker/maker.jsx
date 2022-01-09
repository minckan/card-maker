import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css'

const Maker = ({authService}) => {
    const onLogout = () => {
        authService.logout()
    }
    const navigate = useNavigate()

    useEffect(() => {
        authService.onAuthChange(user => {
            if (!user) {
                navigate('/')
            }
        })
    })
    return (
        <section className='Maker'>
            <Header onLogout={ onLogout}></Header>
            <Footer></Footer>
        </section>
    )
}

export default Maker;