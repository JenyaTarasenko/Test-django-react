import React, { useState } from "react";
import axios from "axios";
import './style.css';


const ReplyForm = ({ parentId, onClose, onSubmit }) => {
    const [replyText, setReplyText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (replyText.trim()) {
            console.log("Отправить ответ", parentId)
            onSubmit(replyText, parentId); 
            setReplyText(''); 
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="reply-form d-flex justify-content-center align-items-center flex-column gap-2">
            <textarea  class="reaply-text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Ваш ответ..."
                required
            />

            <div className="form-column d-flex justify-content-center align-items-center gap-3">
                <button className="secondary-form" type="submit">Отправить</button>
                <button className="secondary-form" type="button" onClick={onClose}>Закрыть</button>
            </div>
        </form>
    );
};
export default ReplyForm;