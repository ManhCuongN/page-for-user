import React, { useContext, useState, useEffect } from 'react';
import { Tabs } from 'antd';
import Container from "../components/Container";
import { CartContext } from '../contexts/CartContext'
import { AuthContext } from '../contexts/AuthContext'
import { List, Avatar, Space, Button } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
const ListOrdered = () => {
    const { getListOrderByUser, updateOrderToFillByUser,deleteOrder, cartState: { listOrderedByUser } } = useContext(CartContext)
    const { authState: { user } } = useContext(AuthContext)
    const [statusOrder, setStatusOrder] = useState(0)
    const { TabPane } = Tabs;
  
    useEffect(() => {
      const data = {
        order_userId: user.idUser,
        order_status: statusOrder
      }
      const fetchData = async () => {
        await getListOrderByUser(data)
      }
  
      fetchData()
    }, [statusOrder])
    console.log("sta", listOrderedByUser);


    const handleToFill = async(orderId) => {
      await updateOrderToFillByUser(orderId)
      const data = {
        order_userId: user.idUser,
        order_status: statusOrder
      }
         await getListOrderByUser(data)
    
    }
    const handleCancelOrder = async(orderId) => {
      await deleteOrder(orderId)
      const data = {
        order_userId: user.idUser,
        order_status: statusOrder
      }
         await getListOrderByUser(data)
    }
  
 
  
    const renderOrderList = (orders) => {
      return (
        <List
          style={{backgroundColor: "#BFDBFD", borderRadius: "15px"}}
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={orders}
          renderItem={(order) => (
            <List.Item
              key={order._id}
              actions={[
                <>
                <Space key="actions">
                  {order.order_status == 1 && (
                  <Button type="primary" style={{marginL: "20px", color:'#fff'}} onClick={() => handleToFill(order._id)}>Đã Nhận Được Hàng</Button>

                  )}
                </Space>
                <Space key="actions">
                {order.order_status == 1 && (
                <Button type="primary" style={{marginLeft: "20px", color:'#fff', backgroundColor: '#F6A400'}} onClick={() => handleCancelOrder(order._id)}>Hủy Đơn</Button>

                )}
              </Space>
              </>
              ]}
              extra={
                <div style={{width: '300px'}}>
                  {order.order_products.map((i) => (
                    i.item_products.map((d) => (
                      <div key={d.productId}>
                      <p><b style={{fontWeight: '700'}}>Sản Phẩm:</b> {d.name}</p>
                      <p><b style={{fontWeight: '700'}}>Số Lượng:</b> {d.quantity}</p>
                      <p><b style={{fontWeight: '700'}}>Thành Tiền:</b> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(d?.price)}</p>
    
                    </div>
                    ))
                  ))}
                  
                </div>
              }
            >
              <List.Item.Meta
                
                avatar={<Avatar src="https://phuongnamvina.com/img_data/images/ban-hang-order.jpg" />}
                title={<a href={order.order_shipping.href}>{order.order_trackingNumber}</a>}
                description={order.order_shipping.note}
              />
              {order.order_checkout && (
                <div>
                  <p><b style={{fontWeight: '700'}}>Đơn Hàng:</b> {order.order_checkout.totalCheckout}</p>
                  <p><b style={{fontWeight: '700'}}>Hình Thức Thanh Toán:</b> {order.order_payment}</p>
                  <p><b style={{fontWeight: '700'}}>Ngày Đặt:</b> {order.createOn}</p>

                </div>
              )}
              {/* Hiển thị thông tin đơn hàng khác tùy ý */}
            </List.Item>
          )}
        />
      ); // Thêm dấu ngoặc đóng ở đây
    }
  
    return (
      <Container class1="home-wrapper-1 py-5">
        <Tabs defaultActiveKey="1" onChange={setStatusOrder}>
          <TabPane tab="Chờ xác nhận" key="0">
            {renderOrderList(statusOrder === "0" ? listOrderedByUser : [])}
          </TabPane>
          <TabPane tab="Đã xác nhận" key="1">
            {renderOrderList(statusOrder === "1" ? listOrderedByUser : [])}
          </TabPane>
          <TabPane tab="Hoàn Thành" key="2">
            {renderOrderList(statusOrder === "2" ? listOrderedByUser : [])}
          </TabPane>
          {/* Thêm các TabPane khác nếu cần */}
        </Tabs>
      </Container>
    )
  }
  export default ListOrdered;
  