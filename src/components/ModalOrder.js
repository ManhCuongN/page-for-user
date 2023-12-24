import { Card, Space, Modal, Button } from 'antd';
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate,useLocation  } from "react-router-dom";
import axios from 'axios';
import { ProductContext } from '../contexts/ProductContext';
const ModalOrder = ({ data }) => {
  const location = useLocation();
const { discountId } = location.state || {};

  const navigate = useNavigate();
  const [total, setTotal] = useState(null)
  const { order_products, order_shipping, order_type_payment, order_trackingNumber } = data
  const { productState: { socket } } = useContext(ProductContext)
  const idUserCurrent = localStorage.getItem("userId")
  var dataupdateDis = {
    discountId,
    userId: idUserCurrent
  }
  console.log(dataupdateDis);
  const { paymentVNPAY, showModalOrder, setShowModalOrder, hanldeOrderNormal, updateDiscountv2 } = useContext(CartContext)
  function isEmptyObject(obj) {
    return Object.entries(obj).length === 0;
  }
 
  const handlePaymentVNPAY = async () => {
    try {
        let amount
        isEmptyObject(data.order_checkout) ? amount = data.order_checkout_no_discount.totalCheckout : amount = data.order_checkout.totalCheckout;

        const datas = {
            amount,
            email: data.order_shipping.email
        }
        const dataOrder2 = { ...data };
        delete dataOrder2.order_checkout;
        delete dataOrder2.order_checkout_no_discount;
        delete dataOrder2.order_type_payment
        const dataOrder = {
            ...dataOrder2,
            order_type_payment: "VNPAY",
            order_checkout: isEmptyObject(data.order_checkout) ? data.order_checkout_no_discount : data.order_checkout
        }

        // Gọi hàm hanldeOrderNormal và đợi cho đến khi nó hoàn thành
        await hanldeOrderNormal(dataOrder);

        // Tiếp tục chạy khi hanldeOrderNormal đã hoàn thành
        const result = await paymentVNPAY(datas);
        if (result.data.vnpUrl) {
            window.location.href = result.data.vnpUrl;
        }

    } catch (error) {
        // Xử lý lỗi ở đây
        console.error("Error in handlePaymentVNPAY:", error);
    }


    // const amount = checkoutOrder.totalCheckout || orderCheckout.totalCheckout
    // const amount = 150000
    // const result = await paymentVNPAY(amount)

  }


  const handleConfirmOrder = async () => {
    const dataOrder2 = { ...data };
    delete dataOrder2.order_checkout;
    delete dataOrder2.order_checkout_no_discount;
    const dataOrder = {
      ...dataOrder2,
      order_checkout: isEmptyObject(data.order_checkout) ? data.order_checkout_no_discount : data.order_checkout
    }

  
  //   const outputData = dataOrder.order_products.flatMap(shop => shop.item_products.map(item => ({
  //     productId: item.productId,
  //     quantity: item.quantity
  // })));
  //   console.log("dataoe", outputData);
 
    const result = await hanldeOrderNormal(dataOrder)
    const updateDiscount = await updateDiscountv2(dataupdateDis)
    console.log("updateDis", updateDiscount);
    if (result.status === 200) {
      const info = {
        trackingNumber: result.metadata.order_trackingNumber,
        userId: idUserCurrent
      }
      const sendM = {
        email: data.order_shipping.email,
        info: info.trackingNumber
      }

     

     
      socket.emit("order", info)
      socket.emit("send-email-confirm", sendM)

      setShowModalOrder(false)
      navigate("/pucharse-success");
    }
  }


  const handleCancel = () => {
    setShowModalOrder(false);
  };
  const handleOk = () => {

  };
  return (
    <>
      <Modal
        open={showModalOrder}
        title="Thông Tin Đặt Hàng"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          order_type_payment === 'COD' ? (
            <Button key="back" onClick={handleConfirmOrder} style={{backgroundColor: "green", color: "#fff"}}>
              Đặt Hàng
            </Button>
          ) : <Button key="back" onClick={handlePaymentVNPAY}>
            Thanh Toán
          </Button>,
          ,
        ]}
      >
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>

          <Card title="Thông Tin Sản Phẩm" size="small">
            {order_products?.map((p) =>
              p.item_products.map((item) => (
                <div key={item.id}>
                  <p><b>Tên Sản Phẩm</b> : {item.name} - <span>Số Lượng: {item.quantity}</span> - <span>Gía: {item.price}</span></p>
                </div>
              ))
            )}
          </Card>
          <Card title="Thông Tin Vận Chuyển" size="small">

            <p><b>Thông Tin Người Nhận:</b>  {order_shipping.recipientName}</p>
            <p><b>Địa Chỉ:</b>  {`${order_shipping.recipientName} - ${order_shipping.note}, ${order_shipping.wards}, ${order_shipping.district}, ${order_shipping.city}.`}</p>
            <p><b>Email:</b>  {order_shipping.email} </p>
          </Card>
          <Card title="Đặt Hàng" size="small">
            <p><b>Kiểu Thanh Toán:</b>  {order_type_payment}</p>
            <p><b>Mã Đơn Hàng: </b> {order_trackingNumber}</p>
          </Card>
        </Space>
      </Modal>
    </>
  )

}

export default ModalOrder