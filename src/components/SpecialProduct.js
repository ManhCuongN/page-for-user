import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const SpecialProduct = ({data}) => {
  console.log("dataaa",data);
  const [countdownDay, setCountdownDay] = useState("");
  const [countdownHours, setCountdownDayHours] = useState("");
  const [countdownMinutes, setCountdownDayMinutes] = useState("");
  const [countdownSecond, setCountdownDaySecond] = useState("");
 



  useEffect(() => {
    // Chuyển đổi data.product.discount_end_date từ chuỗi sang đối tượng Date
    const targetDateTime = new Date(data.expried);

    const intervalId = setInterval(() => {
      // Tính thời gian còn lại giữa hiện tại và targetDate
      const timeRemaining = targetDateTime - new Date();

      // Nếu thời gian còn lại là dương, tức là targetDate vẫn ở phía trước hiện tại
      if (timeRemaining > 0) {
        // Tính toán số ngày, giờ, phút và giây từ thời gian còn lại
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Hiển thị kết quả
      
        setCountdownDay(days)
        setCountdownDayHours(hours)
        setCountdownDayMinutes(minutes)
        setCountdownDaySecond(seconds)
      } else {
        // Khi targetDate đã qua, dừng đếm ngược
        clearInterval(intervalId);
        // setCountdown("Đã hết thời gian!");
        setCountdownDay("")
        setCountdownDayHours("")
        setCountdownDayMinutes("")
        setCountdownDaySecond("")
      }
    }, 1000);

    // Clear interval khi component unmount
    return () => clearInterval(intervalId);
  }, [data.product.discount_end_date]);

  
  return (
    <>
      <div className="col-6 mb-3">
        <div className="special-product-card">
          <div className="d-flex justify-content-between">
            <div>
              <img src={data.product.product_thumb} style={{width: '300px', height:"250px", borderRadius: "50px"}} alt="watch" />
            </div>
            <div className="special-product-content">
              <h5 className="brand" style={{fontSize: "20px"}}>{data.product.product_name}</h5>
              <h6 className="title">
                {/* {data.product.product_description} */}
              </h6>
             
              <p className="price">
                <span className="red-p"><b style={{color: '#0D2D53', fontSize: "30px", fontWeight: '900' }}>
                       {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.product.product_price)}
                       </b></span> 
              </p>
              <div className="discount-till d-flex align-items-center gap-10">
               <p style={{marginTop:'20px'}}>{countdownDay} Ngày</p>
                <div className="d-flex gap-10 align-items-center">
                  <span className="badge rounded-circle p-3 bg-danger">{countdownHours}</span>:
                  <span className="badge rounded-circle p-3 bg-danger">{countdownMinutes}</span>:
                  <span className="badge rounded-circle p-3 bg-danger">{countdownSecond}</span>
                </div>
              </div>
              <div className="prod-count my-3">
                <p><b>Số Lượng:</b> {data.product.product_quantity}</p>
                <p><b>Phân Loại:</b> {data.product.product_type}</p>
              </div>
              <Link className="button">Xem Thêm</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
