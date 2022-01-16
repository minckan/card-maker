import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import Editor from '../editor/editor';
import Preview from '../preview/preview';
import styles from './maker.module.css'

const Maker = ({ FileInput, authService }) => {
    // { id: '1', name: 'mj', company: 'kako',  title: 'Software Engineer',theme: 'light', email: 'minckan@github.com', message: 'go for it!', fileName: 'mmjj', fileUrl: 'mmjj.png'},
    // { id: '2', name: 'mj', company: 'kako',  title: 'Software Engineer',theme: 'colorful', email: 'minckan@github.com', message: 'go for it!', fileName: 'mmjj', fileUrl: 'mmjj.png'},
    // { id: '3', name: 'mj', company: 'kako',  title: 'Software Engineer',theme: 'dark', email: 'minckan@github.com', message: 'go for it!', fileName: 'mmjj', fileUrl: null}
    const [cards, setCards] = useState({
        '1': { id: '1', name: 'mj', company: 'kako',  title: 'Software Engineer',theme: 'light', email: 'minckan@github.com', message: 'go for it!', fileName: 'mmjj', fileUrl: 'mmjj.png'}
    })
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
    const createOrUpdateCard = (card) => {
        
        setCards(cards => {
            const updated = { ...cards }
            updated[card.id] = card
            return updated
        })
    }
    const deleteCard = (card) => {
        setCards(cards => {
            const updated = { ...cards }
            delete updated[card.id]
            return updated
        })
    }
    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <div className={styles.container}>
                <Editor FileInput={ FileInput}cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={ deleteCard}/>
                <Preview  cards={cards} />
            </div>
            <Footer />
        </section>
    )
}

export default Maker;