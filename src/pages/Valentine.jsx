import {useEffect, useRef, useState} from "react";
import confetti from "canvas-confetti";
import "./Valentine.css";
import bg from "../assets/img.png";
import {useNavigate} from "react-router-dom";
import {SurveyPath} from "../components/common/paths.js";

export default function Valentine() {
    const [noStyle, setNoStyle] = useState({
        top: "0%",
        left: "60%",
    });

    const [accepted, setAccepted] = useState(false);
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(() => {
            setIsPlaying(false);
        });
    }, []);

    const moveNoButton = () => {
        const x = Math.random() * 80;
        const y = Math.random() * 80;

        setNoStyle({
            left: `${x}%`,
            top: `${y}%`,
        });
    };

    const heartsRain = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 6,
                angle: 90,
                spread: 360,
                startVelocity: 25,
                gravity: 0.8,
                shapes: ["heart"],
                colors: ["#ff4d6d", "#ff85a1", "#ffb3c6"],
                origin: {x: Math.random(), y: 0},
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    };

    const handleYes = () => {
        setAccepted(true);
        heartsRain();
        // navigate(SurveyPath);
    };

    const toggleMusic = () => {
        if (isPlaying) audioRef.current.pause();
        else audioRef.current.play();
        setIsPlaying(!isPlaying);
    };

    const url = "https://s3.nkz.icdc.io/nmu-files2/marketing_b47c086a-19c4-47be-90a3-d9864cba424b.mp3?AWSAccessKeyId=1H2X5OOTF5ONNGV4VW0O&Expires=253402282800&Signature=WMESr9IFfy7AMAfRfKHldC7rmdI%3D"

    return (
        <div className="container"
            style={{backgroundImage: `url(${bg})`}}
        >
            <audio ref={audioRef} loop>
                <source src={url} type="audio/mpeg"/>
                <source src={url} type="audio/wav"/>
                <source src={url} type="audio/x-wav"/>
                Your browser does not support the audio element.
            </audio>

            <button className="music-btn" onClick={toggleMusic}>
                {isPlaying ? "🔊" : "🔇"}
            </button>

            {!accepted ? (
                <>
                    <h1>Пойдёшь со мной на свидание? 🌸</h1>

                    <div className="buttons">
                        <button className="yes" onClick={handleYes}>
                            Да
                        </button>

                        <button
                            className="no"
                            style={noStyle}
                            onMouseEnter={moveNoButton}
                            onClick={moveNoButton}
                        >
                            Нет
                        </button>
                    </div>
                </>
            ) : (
                <div className="final">
                    <h1>Я знал, что ты согласишься 🥹</h1>
                    <p>Ты просто осчастливила моё сердце 💕</p>
                </div>
            )}
        </div>
    );
}
