import {useState} from "react";
import "./Survey.css";
import * as Api from "../../src/api/Api.js";

import bg from "../assets/img.png";
import mountains from "../assets/mountains.jpg";
import cinema from "../assets/cinema.jpg";
import walk from "../assets/walk.jpg";
import skates from "../assets/walk.jpg";
import museum from "../assets/walk.jpg";
import dinner from "../assets/walk.jpg";
import snowboard from "../assets/walk.jpg";

const options = [
    {id: 1, title: "Шымбулак 🏔️", img: mountains},
    {id: 2, title: "В кино 🎬", img: cinema},
    {id: 3, title: "Коньки ❄️", img: skates},
    {id: 4, title: "Прогулка 🚶‍♀️", img: walk},
    {id: 5, title: "Музей 🎭", img: museum},
    {id: 6, title: "Ужин 🍴", img: dinner},
    {id: 7, title: "Сноуборд 🏂", img: snowboard},
];

const Survey = () => {
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        if (!selected) return;

        // тут позже можно отправить в backend
        Api.saveSurveyAnswer(selected)
            .then(() => {
                setSubmitted(true);
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div
            className="container"
            style={{backgroundImage: `url(${bg})`}}
        >
            <h2 className="title">Куда хочешь? 💭</h2>

            <div className="options">
                {options.map((item) => (
                    <div
                        key={item.id}
                        className={`card ${selected === item.id ? "active" : ""}`}
                        onClick={() => setSelected(item.id)}
                        style={{backgroundImage: `url(${item.img})`}}
                    >
                        <div className="overlay">
                            <span>{item.title}</span>
                        </div>
                    </div>
                ))}
            </div>

            {selected && (
                <p className="result">
                    Выбор: <b>{options.find(o => o.id === selected).title}</b> 😍
                </p>
            )}

            <button
                className="submitBtn"
                disabled={!selected}
                onClick={handleSubmit}
            >
                Отправить 💌
            </button>

            {submitted && (
                <SentSurvey/>
            )}
        </div>
    );
};

const SentSurvey = () => {
    return (
        <div className="sentOverlay">
            <div className="sentCard">
                <div className="icon">💌</div>
                <h3>Спасибо!</h3>
                <p>
                    Твой ответ отправлен ✨
                    Мы уже планируем что-нибудь классное 😉
                </p>
            </div>
        </div>
    );
};

export default Survey;
