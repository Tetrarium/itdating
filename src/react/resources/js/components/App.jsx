import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";

import './App.scss';
import axios from "axios";
import Home from "./Home/Home.jsx";

function App() {
    const [isLogIn, setIsLogIn] = useState(false);

    const logout = (evt) => {
        evt.preventDefault();

        axios.get('/logout')
            .then((response) => {
                console.log(response);

                if(response && response.data && response.data.status && response.data.status === 'success') {
                    setIsLogIn(false);
                    location.reload();
                }
            })
            .catch((err) => {
                console.log(err);
            })

        console.log('Выйти!');
    }

    useEffect(() => {
        axios.get('/check')
            .then((response) => {
                // console.log(response);
                if (response.data && response.data.result) {
                    // console.log('В приложении!!!');
                    setIsLogIn(true);
                } else {
                    setIsLogIn(false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <Header />
            {isLogIn
                && <div className="tmp tmp__msg">Вы вошли в приложение</div>
            }

            {isLogIn
                ? <Home />
                : <Main setIsLogIn={setIsLogIn} />
            }

            {/* <Main setIsLogIn={setIsLogIn} /> */}
            {/* {<Home /> } */}
            <Footer />

            {/* Временная кнопка выхода из приложения */}
            {isLogIn
                && <button className="tmp tmp__btn" onClick={logout}>Выйти</button>
            }
        </>
    );
}

// const appContainer = document.querySelector('#app');
// console.log(appContainer);

// if (appContainer) {
//     ReactDOM
//         .createRoot(appContainer)
//         .render(
//             <React.StrictMode>
//                 <App />
//             </React.StrictMode>
//         );
// }

export default App;