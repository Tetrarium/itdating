import { useEffect, useState } from 'react';
import { fetchQuizQuestions } from '../../fetchingAPI/authentication';

import './Quiz.scss';

function Quiz({ numQuestions, tags = [], endQuizHandle = () => { } }) {
    const [questions, setQuestions] = useState({
        first: null,
        second: null,
    });
    const [history, setHistory] = useState(tags);

    const fillAnswers = async () => {
        const result = await fetchQuizQuestions(history);

        if (result.ok) {
            setQuestions(result.questions);
        } else {
            console.log(result.message);
        }
    }

    useEffect(() => {
        if (history.length < numQuestions) {
            fillAnswers();
        } else {
            console.log('quiz ended');
            endQuizHandle(history);
        }
    }, [history])

    const selectAnswer = (answer) => {
        if (history.length < numQuestions) {
            setHistory([...history, answer]);
        }
    };

    const revertHistoryHandler = (evt) => {
        evt.preventDefault();
        setHistory(history.slice(0, history.length - 1));
    };

    return (
        <div className="quiz hidden">
            <div className="quiz__title">Перед регистрацией ответьте на несколько вопросов:</div>
            <div className="quiz__main">
                <div className="quiz__question">
                    <button
                        className="quiz__option quiz__strrow"
                        onClick={(evt) => {
                            evt.preventDefault();
                            selectAnswer(questions.first);
                        }}
                    >{questions.first}</button>
                    <span className="quiz__strrow">или</span>
                    <button
                        className="quiz__option quiz__strrow"
                        onClick={(evt) => {
                            evt.preventDefault();
                            selectAnswer(questions.second);
                        }}
                    >{questions.second}</button>
                </div>
            </div>
            <div className="quiz__buttons">
                {history.length > 0
                    && (
                        <button className="quiz__button" onClick={revertHistoryHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960" width="24">
                                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                            </svg>
                        </button>
                    )
                }

            </div>
            <div className="quiz__description">Это поможет нам точнее подобрать вам подходящего партнера</div>
        </div>
    )
}

export default Quiz;
