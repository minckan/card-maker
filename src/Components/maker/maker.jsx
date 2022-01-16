import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import Editor from '../editor/editor';
import Preview from '../preview/preview';
import styles from './maker.module.css'

const Maker = ({ FileInput, authService, cardRepository }) => {
    const loacation = useLocation()
    const loacationState = loacation?.state
    const navigate = useNavigate()
    
    const [cards, setCards] = useState({})
    const [userId, setUserId] = useState(loacationState && loacationState.id)

    const onLogout = useCallback(() => {
        authService.logout()
    }, [authService])

    useEffect(() => {
        if (!userId) {
            return
        } 
        const stopSync = cardRepository.syncCards(userId, cards => {
            setCards(cards)
        })
        return () => stopSync()// 리소스를 정리하고 메모리를 정리 할수있음
    }, [userId, cardRepository])

    useEffect(() => {
        authService.onAuthChange(user => {
            if (user) { 
                setUserId(user.uid)
            } else {
                navigate('/')
            }
        })
    }, [userId, authService, navigate])
    const createOrUpdateCard = (card) => {
        setCards(cards => {
            const updated = { ...cards }
            updated[card.id] = card
            return updated
        })
        cardRepository.saveCard(userId, card)
    }
    const deleteCard = (card) => {
        setCards(cards => {
            const updated = { ...cards }
            delete updated[card.id]
            return updated
        })
        cardRepository.removeCard(userId, card)
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