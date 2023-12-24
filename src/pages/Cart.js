import React, { useContext, useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import { Alert, Space } from 'antd';
import axios from "axios";


const Cart = () => {
  // const [listProductCart, setListProductCart] = useState(null)

  const { getCartOfUser, cartState: { listProductCart, isProductCartLoading }, updateCart, deleteProductCart } = useContext(CartContext)
  const [dataNewUpdate, setDataNewUpdate] = useState(null)
  const [userId, setUserId] = useState(null)
  const [dataCheckout, setDataCheckout] = useState(null)
  const [transformCheckout, setTransformCheckout] = useState([])
  const { loadUser } = useContext(AuthContext)

  const [updatedListProductCart, setUpdatedListProductCart] = useState(null);

useEffect(() => {
  setUpdatedListProductCart(listProductCart);
}, [listProductCart]);
 
  useEffect(() => {
    const fetchData = async () => {
      const user = await loadUser()
      setUserId(user.idUser)
     const list =  await getCartOfUser(user.idUser)
     setTransformCheckout(list.metadata.cart_products)
    }
    fetchData()
  }, [updatedListProductCart])

  useEffect(() => {
    const transformedData = [];

    transformCheckout.forEach(item => {
      const shopId = item.shopId;
      const productId = item.productId;
      const quantity = item.quantity;
      const price = item.price;
      const thumb = item.thumb
      const name = item.name
      const type = item.type

      transformedData.push({
        shopId,
        item_products: [{
          price,
          quantity,
          productId,
          thumb,name, type
        }]
      });

    });
    const data = {
      cartId: updatedListProductCart?._id,
      userId: updatedListProductCart?.cart_userId,
      shop_order_ids_new: transformedData

    }
    setDataCheckout(data)
  }, [transformCheckout])
  
  const handleQuantityChange = async (productId, newQuantity) => {
    const updatedCart = updatedListProductCart.cart_products.map((product) =>
      product.productId === productId ? setDataNewUpdate(product) : product
    );

    const data = {
      userId: userId,
      shop_order_ids: [
        {
          shopId: dataNewUpdate?.shopId,
          item_products: [
            {
              quantity: newQuantity,
              price: dataNewUpdate?.price,
              shopId: dataNewUpdate?.shopId,
              old_quantity: dataNewUpdate?.quantity,
              productId: dataNewUpdate?.productId
            }
          ],
          version: 2000
        }
      ]
    }
    await updateCart(data)
    
  };
  const handleDeleteProductCart = async (productId) => {
    const data = {
      userId: userId,
      productId
    }
    await deleteProductCart(data)
  }
  // // Tính tổng tiền của tất cả các sản phẩm
  // const totalAmount = listProductCart?.reduce(
  //   (acc, product) =>
  //     acc + (product?.quantity * product?.price * (100 - product?.discountDTO?.discount_percent)) / 100,
  //   0
  // );

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          {
            updatedListProductCart?.cart_products
            && listProductCart?.cart_products.map((product) => (
              <div className="col-12" key={product.productId}>
                <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                  <h4 className="cart-col-1"></h4>
                  <h4 className="cart-col-1">Tên Sản Phẩm</h4>

                  <h4 className="cart-col-2">Gía</h4>
                  <h4 className="cart-col-3">Số Lượng</h4>
                  <h4 className="cart-col-4">Tổng</h4>
                </div>
                <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                  <div className="cart-col-1 gap-15 d-flex align-items-center">
                    <div className="w-25">
                      <img src={product.thumb} className="img-fluid" alt="product image" />
                    </div>
                    <div className="w-75">

                      {Object.entries(product?.variation).map(([key, value]) => (
                          <div key={key} className="d-flex flex-wrap gap-15">
                            <span>{key}: {value}</span>
                          </div>
                        ))}
                    </div>


                  </div>
                  <div className="cart-col-1 d-flex align-items-center gap-15">

                    <div className="">
                      <p ><a href="" className="d-flex flex-wrap gap-15">{product.name}</a></p>
                    </div>

                  </div>
                  <div className="cart-col-2">
                    <h5 className="price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</h5>
                  </div>
                  <div className="cart-col-3 d-flex align-items-center gap-15">
                    <div>
                      <input
                        className="form-control"
                        type="number"
                        name=""
                        min={1}
                        max={10}
                        onChange={(e) =>
                          handleQuantityChange(product.productId, parseInt(e.target.value))
                        }
                        value={product.quantity}
                        id=""
                      />
                    </div>
                    <div>
                      <AiFillDelete className="text-danger" onClick={() => handleDeleteProductCart(product.productId)} />
                    </div>
                  </div>
                  <div className="cart-col-4">
                    {/* Hiển thị giá gốc */}
                    {/* <h5 className="price">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.quantity * product.price)}
                    </h5> */}

                    {/* {product.discountDTO.active ? (
                      // Hiển thị giá sau khi giảm giá
                      <h5 className="price">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.round((product.quantity * product.price * (100 - product.discountDTO.discount_percent)) / 100))}
                      </h5>
                    ) : (
                      // Hiển thị giá gốc nếu không có giảm giá
                      <h5 className="price">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.quantity * product.price)}
                      </h5>
                    )} */}
                  </div>
                </div>
              </div>
            ))

          }
          {updatedListProductCart?.cart_products == 0 &&
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Alert message="You have no items in your shopping cart" type="success" showIcon closable />
            </div>}

          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Tiếp Tục Mua Sắm
              </Link>
              <div className="d-flex flex-column align-items-end">

                {/* <h4>SubTotal: $ {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}  </h4> */}
                <p>Thuế và phí vận chuyển được tính khi thanh toán</p>
                <Link to="/checkout" state={{ data: dataCheckout, suggest: transformCheckout}} className="button">
                  Đặt Hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
