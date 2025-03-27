import React, { useState } from "react";
import axios from "axios";


const ReplyForm = ({ parentId, onClose, onSubmit }) => {
    const [replyText, setReplyText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (replyText.trim()) {
            onSubmit(replyText, parentId); // Передаем данные в onSubmit
            setReplyText(''); // Очищаем поле ввода после отправки
            onClose(); // Закрываем форму
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Ваш ответ..."
                required
            />
            <button type="submit">Отправить</button>
            <button type="button" onClick={onClose}>Закрыть</button>
        </form>
    );
};
export default ReplyForm;