import { useEffect, useState } from 'react';
import './Quiz.scss';
import { APPLICATION_JSON_HEADER } from '../../assets/headers';

import axios from 'axios';

const Status = {
    SUCCESS: 'success',
    ERROR: 'error',
};

const fetchQuizQuestions = async (questionHistory, controller) => {
    let question = {
        first: null,
        second: null,
    };

    await axios({
        method: 'post',
        url: '/quiz',
        headers: APPLICATION_JSON_HEADER,
        data: {
            history: questionHistory,
        },
        signal: controller.signal,
    })
        .then((response) => {
            console.log('ответы квиза');
            console.log(response);
            const { data } = response;

            if (data.status === Status.SUCCESS) {
                question = {
                    first: data.first,
                    second: data.second,
                }
            }
        })
        .catch((err) => {
            console.log('Ошибка полученя данных квиза');
            console.log(err);
        })

    return question;
}

function Quiz({ numQuestions, tags = [], endQuizHandle = () => { } }) {
    const [questions, setQuestions] = useState({
        first: null,
        second: null,
    });
    const [history, setHistory] = useState(tags);

    const fillAnswers = async () => {
        const abortContriller = new AbortController()

        const answers = await fetchQuizQuestions(history, abortContriller);
        console.log(answers);
        setQuestions(answers);

        return () => {
            abortContriller.abort();
        }
    }

    useEffect(() => {
        console.log(history);
        if (history.length < numQuestions) {
            fillAnswers();
        } else {
            console.log('quiz ended');
            // callback with pass history
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
