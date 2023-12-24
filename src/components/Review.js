import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Button, Popover, Modal } from "antd";
import Container from "./Container";
import {
  AiOutlineEnter,
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineDelete,
  AiOutlineHeart,
  AiOutlineEdit
} from "react-icons/ai";
import { FcLike } from "react-icons/fc"
import { FaReply } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

import { Input } from "antd";
import { CommentContext } from "../contexts/CommentContext";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";


const { TextArea } = Input;

const Review = (props) => {
  const { productId, user } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenRep, setIsModalOpenRep] = useState(false);
  const [openLoadComment, setOpenLoadComment] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const [textComment, setTextComment] = useState("")
  const [commentIdReplied, setCommentIdReplied] = useState(null)
  const [commentIdEdit, setCommentIdEdit] = useState(null)
  const [commentIdDelete, setCommentIdDelete] = useState(null)



  const [contentReply, setContentReply] = useState("") // Khởi tạo giá trị ban đầu là 0
  // Khởi tạo giá trị ban đầu là 0
  const { getListComment, deleteComment, addNewComment,updateComment, findComment, commentState: { listComments, singleComment } } = useContext(CommentContext)
  const [commentContentEdit, setCommentEdit] = useState("")
  const [comments, setComments] = useState([]);


  useEffect(() => {
    // Gọi hàm lấy danh sách comment từ service phía server
    const fetchComments = async () => {
      try {
        const response = await getListComment(productId);
        setComments(response.metadata);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchComments();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const data = {
      productId,
      userId: user.idUser,
      content: textComment,
      parentCommentId: null

    }
    
   const newComment =  await addNewComment(data)
   const response = await getListComment(productId);
   setComments(response.metadata);

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelRep = () => {
    setIsModalOpenRep(false);
  };

  const handleCancelEdit = () => {
     setIsModalOpenEdit(false)
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
 };



  const handleLoadComment = async (comment) => {
    setOpenLoadComment(() => !openLoadComment)
    try {
      const parentCommentId = comment._id;
      const response = await getListComment(productId, parentCommentId);
      const update = response.metadata.filter((c) => c.comment_parentId === parentCommentId);




      const updatedComments = comments.map((a) => {
        if (a.children) {
          var it = a?.children.map((item) => {
            return item._id;

          })
        }

        if (a._id === parentCommentId || it?.includes(parentCommentId)) {
          return { ...a, children: [...(a.children || []), ...update] };
        }
        return a;
      });
      setComments(updatedComments);






    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReply = async (commentId) => {
    setIsModalOpenRep(true)
    setCommentIdReplied(commentId)
  }

  const handleOkRep = async () => {
    const data = {
      productId,
      userId: user.idUser,
      content: contentReply,
      parentCommentId: commentIdReplied

    }
    const newComment = await addNewComment(data);
    const response = await getListComment(productId);
    setComments(response.metadata);
    //setComments([...comments, newComment]);
    setIsModalOpenRep(false);
  }

  const handleEditCmt = async(commentId) => {
    setIsModalOpenEdit(true)
    setCommentIdEdit(commentId)
    const result = await findComment(commentId)
    setCommentEdit(result.comment_content)
    
  }

  const handleOkEdit  = async () => {
    const comment_content = commentContentEdit
    const bodyUpdate ={
      comment_content
    }
    await updateComment(commentIdEdit, bodyUpdate)
    const response = await getListComment(productId);
    setComments(response.metadata);
    setIsModalOpenEdit(false);
  }

  const handleOkDelete  = async () => {
    const  data = {
      commentId: commentIdDelete,
      productId
    }
    await deleteComment(data)
    const response = await getListComment(productId);
    setComments(response.metadata);
    setIsModalOpenDelete(false);
  }

  const handleDeleteComment = async(commentId) => {
    setIsModalOpenDelete(true)
    setCommentIdDelete(commentId)
    
  }

  //tesst commnrt
  const renderComments = (comments, depth = 2) => {

    return comments.map((c) => (

      <div className="reviews mt-4" key={c._id} style={{ marginLeft: `${depth * 20}px`,  }} >
        <div className="review">
          <div className="d-flex gap-10 align-items-center" >
            <h6 className="mb-0" style={{fontSize: '13px'}}> <strong>{c.user.givenName} {c.user.familyName}</strong></h6>
           
            <span>
              <AiOutlineEnter
                onClick={() => handleLoadComment(c)}
              />
            
              [
              <span
              style={{fontSize: '11px'}}
              // onClick={() => handleLevelChange(parentComment.slug)}
              >
                Xem Thêm
                
              </span>
              ]
            </span>
          </div>
          <p className="mt-3">{c?.comment_content}</p>
          <div>

            <span className="d-inline-block mx-1">
              <AiOutlineDislike />
            </span>
            <span
              className="d-inline-block mx-1"
            //onClick={() => showModalRep(parentComment.slug)}
            >
              <FaReply onClick={() => handleReply(c._id)} />
            </span>
            {
              c.comment_userId == user?.idUser && (
                <>
                <span className="d-inline-block mx-1">
                  <AiOutlineEdit onClick={() => handleEditCmt(c._id)}/>
                </span>
                <span className="d-inline-block mx-1">
                <AiOutlineDelete onClick={() => handleDeleteComment(c._id)}/>
              </span>
              </>
              )
            }

          </div>
        </div>

        {
          c.children &&
          c.children.length > 0 && (
            <div>
              <div style={{ marginLeft: "20px" }}>{renderComments(c.children, depth + 1)}</div>
            </div>
          )}
      </div>
    ))
  }

  return (
    <Container class1="reviews-wrapper home-wrapper-2">
      <div className="row">
        <div className="col-12">
          <h3 id="review">Bình Luận</h3>
          <div className="review-inner-wrapper" style={{borderRadius: '15px'}}>
            <Button type="" style={{backgroundColor: '#BFDBFD'}} onClick={showModal}>
              Viết Bình Luận
            </Button>
            <Modal
              title="BÌNH LUẬN"
              visible={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <TextArea rows={4} onChange={(e) => setTextComment(e.target.value)} />
            </Modal>
            <Modal
              title="BÌNH LUẬN"
              visible={isModalOpenRep}
              onOk={handleOkRep}
              onCancel={handleCancelRep}
            >
              <TextArea rows={4} onChange={(e) => setContentReply(e.target.value)} />
            </Modal>
            <Modal
              title="CHỈNH SỬA"
              visible={isModalOpenEdit}
              onOk={handleOkEdit}
              onCancel={handleCancelEdit}
            >
              <TextArea rows={4} name="comment_content" value={commentContentEdit} onChange={(e) =>  setCommentEdit(e.target.value)}/>
            </Modal>
            <Modal
              title="XÓA"
              visible={isModalOpenDelete}
              onOk={handleOkDelete}
              onCancel={handleCancelDelete}
            >
              <p>You sure want delete?</p>
            </Modal>
            <>{renderComments(comments)}</>
            {/* ///adjdkd */}

          </div>
        </div>
      </div>
    </Container>
  );
};

export default Review;