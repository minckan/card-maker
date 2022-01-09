import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import Editor from '../editor/editor';
import Preview from '../preview/preview';
import styles from './maker.module.css'

const Maker = ({ authService }) => {
    const [cards, setCards] = useState([
        { id: '1', name: 'mj', company: 'kako',  title: 'Software Engineer',theme: 'light', email: 'minckan@github.com', message: 'go for it!', fileName: 'mmjj', fileUrl: 'mmjj.png'},
        { id: '2', name: 'mj', company: 'kako',  title: 'Software Engineer',theme: 'colorful', email: 'minckan@github.com', message: 'go for it!', fileName: 'mmjj', fileUrl: 'mmjj.png'},
        { id: '3', name: 'mj', company: 'kako',  title: 'Software Engineer',theme: 'dark', email: 'minckan@github.com', message: 'go for it!', fileName: 'mmjj', fileUrl: null}
    ])
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
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <div className={styles.container}>
                <Editor cards={cards}/>
                <Preview  cards={cards} />
            </div>
            <Footer />
        </section>
    )
}

export default Maker;