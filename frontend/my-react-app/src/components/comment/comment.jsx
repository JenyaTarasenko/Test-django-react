import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddComment from '../addcomment/addcomment';
import './style.css';
import line1 from '../../image/line-style1.png';
import avatar from '../../image/avatar.png';
import line2 from '../../image/line-style2.png';
import line3 from '../../image/line-style3.png';
import line4 from '../../image/line-style4.png';
import ReplyForm from '../replyform/replyForm';




const Comments  = () =>{
    const [comments, setComments]= useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [replyTo, setReplyTo] =  useState(null); 
    // const [replyText, setReplyText] = useState('');

    const fetchComments = async () => {
        setIsLoading(true);
        try{
            const response = await axios.get('http://localhost:8001/api/comments/');
            setComments(response.data);
        }catch(err){

            setError('Ошибка загрузки комментариев');
            console.error(err);
        }finally{
            setIsLoading(false)
        }
        
    };

    useEffect(()=>{
        fetchComments();
    },[]);

    
    

     // функцию для обновления комментариев
    const handleCommentAdded = (newComment) => {
        setComments((prevComments) => [newComment, ...prevComments]);
    };

    
    const handleReplySubmit = async (replyText, parentId) => {
        try {
            const response = await axios.post("http://localhost:8001/api/comments/", {
                user_name: 'Аноним',
                email: 'example@example.com', // добавьте, если требуется
                home_page: 'http://example.com', // добавьте, если требуется
                text: replyText,
                parent: parentId || null,
            });
            console.log("Отправляемые данные:", response.data);
            setComments((prevComments) => [response.data, ...prevComments]);
            setReplyTo(null);
        } catch (err) {
            console.error("Ошибка отправки комментария:", err);
        }
    }    
    

    if(isLoading) return <div>..загрузка</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-4">
          <h1 className="mt-3">Комментарии ({comments.length})</h1>
          
          {comments.length === 0 ? (
            <div className="alert alert-info">Пока нет комментариев</div>
          ) : (
            <div>
              {comments.map(comment => (
                <section key={comment.id} className="comment-section mb-4">
                  <div className="comment">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12 mt-3">
                          <div className="comment-pannel d-flex flex-row justify-content-between align-items-center">
                            <div className="comment-pannel-column-left d-flex flex-row">
                              <div className="comment-pannel-column-body d-flex flex-row align-items-center gap-3">
                                    <div className="comment-pannel-avatar">
                                        <img 
                                            src={avatar} 
                                            alt="Аватар" 
                                            className="rounded-circle"
                                            width="40"
                                            height="40"
                                        />
                                    </div>
                                <div className="comment-pannel-avatar-name">
                                  <span>{comment.user_name}</span>
                                 </div>
                                <div className="comment-pannel-avatar-time-on">
                                  <span>
                                    {new Date(comment.created_at).toLocaleDateString()} 
                                  </span>
                                </div>
                                <div className="comment-pannel-avatar-time-on">
                                    <span>
                                            {new Date(comment.created_at).toLocaleTimeString([], { 
                                                hour: '2-digit', 
                                                minute: '2-digit' 
                                            })}
                                    </span>
                                </div>
                                
                                
                                <div className="comment-pannel-column-body-style d-flex flex-row align-items-center gap-2">
                                  <div className="comment-pannel-line">
                                    <img 
                                      src={line1} 
                                      alt="Иконка"
                                    />
                                  </div>
                                  <div className="comment-pannel-line">
                                    <img 
                                      src={line4}
                                      alt="Иконка"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
      
                            <div className="comment-pannel-column-right">
                              <div className="comment-pannel-column-body-item d-flex flex-row align-items-center gap-3">
                                <div className="comment-pannel-line">
                                  <img 
                                    src={line2} 
                                    alt="Иконка"
                                  />
                                </div>
                                <div className="comment-pannel-avatar-time-on">
                                  <span>{comment.id}</span> {/* Можно заменить на comment.likes или аналогичное поле */}
                                </div>
                                <div className="comment-pannel-line">
                                  <img 
                                    src={line2} 
                                    alt="Иконка"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="container">
                      <div className="row">
                        <div className="col-12 text-section">
                          <p>{comment.text}</p>
                        </div>
                      </div>
                    </div>
                        {/* {replyTo === comment.id && (
                            <ReplyForm
                                parentId={comment.id}
                                onClose={() => setReplyTo(null)}
                                onSubmit={handleReplySubmit}
                            />
                        )}         */}
                        <ReplyForm 
            
                            parentId={comment.id}
                            onClose={() => setReplyTo(null)}
                            onSubmit={handleReplySubmit} // убедитесь, что это правильная функция
                        />
                    </div>
                </section>
              ))}
            </div>
          )}
          <AddComment onCommentAdded={handleCommentAdded} />
        </div>
    );



           

      

};

export default Comments;

