import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddComment from '../addcomment/addcomment';

const Comments  = () =>{
    const [comments, setComments]= useState([]);
    const [isLoading, setIsloading] =  useState(false);
    const [error, setError] = useState(null);

    const fetchComments = async () => {
        setIsloading(true);
        try{
            const response = await axios.get('http://localhost:8001/api/comments/');
            setComments(response.data);
        }catch(err){

            setError('Ошибка загрузки комментариев');
            console.error(err);
        }finally{
            setIsloading(false)
        }
        
    };

    useEffect(()=>{
        fetchComments();

    },[]);
    
     // Добавляем функцию для обновления комментариев
    const handleCommentAdded = (newComment) => {
        setComments((prevComments) => [newComment, ...prevComments]);
    };

    if(isLoading) return <div>..загрузка</div>;
    if (error) return <div>{error}</div>;

    return(
        <div>
            <h1>Список комментариев {comments.length}</h1>
                <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <strong>{comment.user_name}</strong>: {comment.text}
                        <br />
                        <small>ID: {comment.id} | Email: {comment.email} | Дата: {new Date(comment.created_at).toLocaleString()}</small>
                    </li>
                 ))}
                </ul>
                <AddComment onCommentAdded={handleCommentAdded} />
        </div>
    )    

};

export default Comments;