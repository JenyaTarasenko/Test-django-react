import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddComment from '../addcomment/addcomment';
import './style.css';
import add from '../../image/add.png';
import line1 from '../../image/line-style1.png';
import avatar from '../../image/avatar.png';
import line2 from '../../image/line-style2.png';
import line3 from '../../image/line-style3.png';
import line4 from '../../image/line-style4.png';
import ReplyForm from '../replyform/replyForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';




const Comments  = () =>{
    const [comments, setComments]= useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [replyTo, setReplyTo] =  useState(null); 
   

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

    
    // const handleReplySubmit = async (replyText, parentId) => {
    //     try {
    //         const response = await axios.post("http://localhost:8001/api/comments/", {
    //             user_name: 'Аноним',
    //             email: 'example@example.com', // добавьте, если требуется
    //             home_page: 'http://example.com', // добавьте, если требуется
    //             text: replyText,
    //             parent: parentId || null,
    //         });

    //         console.log("Отправляемые данные:", response.data);
    //         setComments((prevComments) => [response.data, ...prevComments]);
    //         setReplyTo(null);


    //     } catch (err) {
    //         console.error("Ошибка отправки комментария:", err);
    //     }
    // }    

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
  
          // Обновление состояния с добавлением ответа в нужный комментарий
          setComments((prevComments) => {
              return prevComments.map((comment) => {
                  if (comment.id === parentId) {
                      // Если находим родительский комментарий, добавляем новый ответ в replies
                      return {
                          ...comment, // Копируем текущий комментарий
                          replies: [...(comment.replies || []), response.data], // Добавляем новый ответ
                      };
                  }
                  return comment; // Возвращаем остальные комментарии без изменений
              });
          });
  
          setReplyTo(null); // Закрываем форму для ответа
  
      } catch (err) {
          console.error("Ошибка отправки комментария:", err);
      }
    };
  
    

    if(isLoading) return <div>..загрузка</div>;
    if (error) return <div>{error}</div>;


    return (
      <div className="container mt-4">
        <h1 className="mt-3">Комментарии ({comments.length})</h1>
        
        {comments.length === 0 ? (
          <div className="alert alert-info">Пока нет комментариев</div>
        ) : (
          // <div className="accordion d-flex flex-column gap-4 " id="accordionExample">
          //   {comments.map(comment => (
          //     <div key={comment.id} className="accordion-item ">
          //       <h2 className="accordion-header" id={`heading-${comment.id}`}>
          //         <button 
          //           className="accordion-button" 
          //           type="button" 
          //           data-bs-toggle="collapse" 
          //           data-bs-target={`#collapse-${comment.id}`} 
          //           aria-expanded="true" 
          //           aria-controls={`collapse-${comment.id}`}
          //         >
          //           <div className="container-column-panel d-flex flex-row justify-content-center align-items-center gap-4">
          //             <div className="img-strong">
          //               <img src={avatar} className="avatar" alt="Аватар"/>
          //             </div>
          //             <div className="img-name">
          //               <h6>{comment.user_name.length >10
          //                   ?comment.user_name.slice(0,5)  + '...' 
          //                   : comment.user_name}</h6>
          //             </div>
          //             <div className="img-date">
          //               <h6>{new Date(comment.created_at).toLocaleDateString()}</h6>
          //             </div>
          //             <div className="img-date">
          //               <h6>
          //                 {new Date(comment.created_at).toLocaleTimeString([], { 
          //                   hour: '2-digit', 
          //                   minute: '2-digit' 
          //                 })}
          //               </h6>
          //             </div>
          //           </div>
          //           <div className="container-column-panel-left d-flex flex-row justify-content-center align-items-center gap-4">
          //             <div className="img-strong">
          //               <img src={line1} className="img-avatar" alt="Линия 1"/>
          //             </div>
          //             <div className="img-strong">
          //                 <button onClick={() => setReplyTo(comment.id)} className="btn-reply">
          //                   <img src={add} className="img-avatar" alt="Ответить" />
          //                 </button>
          //             </div>
          //             <div className="img-strong">
          //               <img src={line2} className="img-avatar" alt="Линия 2"/>
          //             </div>
          //             <div className="img-strong">
          //               <img src={line3}  className="img-avatar" alt="Линия 3"/>
          //             </div>
          //           </div>
          //         </button>
          //       </h2>
          //       <div 
          //         id={`collapse-${comment.id}`} 
          //         className="accordion-collapse collapse show" 
          //         aria-labelledby={`heading-${comment.id}`} 
          //         // data-bs-parent="#accordionExample"
          //       >
          //         <div className="accordion-body">
          //           {comment.text}
          //           {console.log("replyTo:", replyTo, "comment.id:", comment.id)}
          //           {replyTo === comment.id && (
          //               <ReplyForm
          //                   parentId={comment.id}
          //                   onSubmit={(replyText, parentId) => {
          //                       console.log(`Ответ на комментарий ${parentId}:`, replyText);
          //                       handleReplySubmit(replyText, parentId);
          //                   }}
          //                   onClose={() => setReplyTo(null)}
          //               />
          //             )}
          //             {/* {comment.replies && (
          //                   <div>
          //                       <h4>Ответы:</h4>
          //                       {comment.replies.map((reply) => (
          //                           <div key={reply.id}>
          //                               <p>{reply.text}</p>
          //                           </div>
          //                       ))}
          //                   </div>
          //             )} */}
          //         </div>
          //       </div>
            
          //     </div> 
          //   ))}
          // </div>
          <div className="accordion d-flex flex-column gap-4 " id="accordionExample">
              {comments.map(comment => (
                  <div key={comment.id} className="accordion-item">
                      <h2 className="accordion-header" id={`heading-${comment.id}`}>
                          <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse-${comment.id}`}
                              aria-expanded="true"
                              aria-controls={`collapse-${comment.id}`}
                          >
                              <div className="container-column-panel d-flex flex-row justify-content-center align-items-center gap-4">
                                  <div className="img-strong">
                                      <img src={avatar} className="avatar" alt="Аватар"/>
                                  </div>
                                  <div className="img-name">
                                      <h6>{comment.user_name.length > 10
                                          ? comment.user_name.slice(0, 5) + '...'
                                          : comment.user_name}</h6>
                                  </div>
                                  <div className="img-date">
                                      <h6>{new Date(comment.created_at).toLocaleDateString()}</h6>
                                  </div>
                                  <div className="img-date">
                                      <h6>
                                          {new Date(comment.created_at).toLocaleTimeString([], {
                                              hour: '2-digit',
                                              minute: '2-digit'
                                          })}
                                      </h6>
                                  </div>
                              </div>
                              <div className="container-column-panel-left d-flex flex-row justify-content-center align-items-center gap-4">
                                  <div className="img-strong">
                                      <img src={line1} className="img-avatar" alt="Линия 1"/>
                                  </div>
                                  <div className="img-strong">
                                      <button onClick={() => setReplyTo(comment.id)} className="btn-reply">
                                          <img src={add} className="img-avatar" alt="Ответить" />
                                      </button>
                                  </div>
                                  <div className="img-strong">
                                      <img src={line2} className="img-avatar" alt="Линия 2"/>
                                  </div>
                                  <div className="img-strong">
                                      <img src={line3} className="img-avatar" alt="Линия 3"/>
                                  </div>
                              </div>
                          </button>
                      </h2>
                      <div
                          id={`collapse-${comment.id}`}
                          className="accordion-collapse collapse show"
                          aria-labelledby={`heading-${comment.id}`}
                      >
                          <div className="accordion-body">
                              {comment.text}
                              {console.log("replyTo:", replyTo, "comment.id:", comment.id)}
                              {replyTo === comment.id && (
                                  <ReplyForm
                                      parentId={comment.id}
                                      onSubmit={(replyText, parentId) => {
                                          console.log(`Ответ на комментарий ${parentId}:`, replyText);
                                          handleReplySubmit(replyText, parentId);
                                      }}
                                      onClose={() => setReplyTo(null)}
                                  />
                              )}
                              {comment.replies && comment.replies.length > 0 && (
                                  <div className="replies-container">
                                      <h5>Ответы:</h5>
                                      {comment.replies.map((reply) => (
                                          <div key={reply.id} className="accordion-item">
                                              <h2 className="accordion-header" id={`heading-${reply.id}`}>
                                                  <button
                                                      className="accordion-button"
                                                      type="button"
                                                      data-bs-toggle="collapse"
                                                      data-bs-target={`#collapse-${reply.id}`}
                                                      aria-expanded="true"
                                                      aria-controls={`collapse-${reply.id}`}
                                                  >
                                                      <div className="container-column-panel d-flex flex-row justify-content-center align-items-center gap-4">
                                                          <div className="img-strong">
                                                              <img src={avatar} className="avatar" alt="Аватар"/>
                                                          </div>
                                                          <div className="img-name">
                                                              <h6>{reply.user_name.length > 10
                                                                  ? reply.user_name.slice(0, 5) + '...'
                                                                  : reply.user_name}</h6>
                                                          </div>
                                                          <div className="img-date">
                                                              <h6>{new Date(reply.created_at).toLocaleDateString()}</h6>
                                                          </div>
                                                          <div className="img-date">
                                                              <h6>
                                                                  {new Date(reply.created_at).toLocaleTimeString([], {
                                                                      hour: '2-digit',
                                                                      minute: '2-digit'
                                                                  })}
                                                              </h6>
                                                          </div>
                                                      </div>
                                                  </button>
                                              </h2>
                                              <div
                                                  id={`collapse-${reply.id}`}
                                                  className="accordion-collapse collapse show"
                                                  aria-labelledby={`heading-${reply.id}`}
                                              >
                                                  <div className="accordion-body">
                                                      {reply.text}
                                                  </div>
                                              </div>
                                          </div>
                                      ))}
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
        )}
         <AddComment onCommentAdded={handleCommentAdded} />
      </div>
      
    );
   
          
};

export default Comments;

          
 