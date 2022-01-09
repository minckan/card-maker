import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './login.module.css';

const Login = ({ authService }) => {
    const navigate = useNavigate()
    const goToMaker = (userId) => {
        navigate({
            pathname: './maker'
        },{
            replace: true
        })
    }
    const onLogin = event => {
        authService //
        .login(event.currentTarget.textContent)
            .then(response => {
            // console.log(response.credential.accessToken);
            goToMaker(response.user.uid)
        });
    };

    useEffect(() => { // 컴포넌트가 마운트가 되나 업데이트 될때 이 리액트 훅을 타게 되어있음
        authService.onAuthChange(user => {
            user && goToMaker(user.uid)
        })
    })
    return (
        <section className={styles.login}>
        <Header />
        <section>
            <h1>Login</h1>
            <ul className={styles.list}>
            <li className={styles.item}>
                <button className={styles.button} onClick={onLogin}>
                Google
                </button>
            </li>
            <li className={styles.item}>
                <button className={styles.button} onClick={onLogin}>
                Github
                </button>
            </li>
            </ul>
        </section>
        <Footer />
        </section>
    );
};

export default Login;
