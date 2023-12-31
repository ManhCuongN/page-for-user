import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import ModalAddress from "../components/ModalAddress";
import { AddressContext } from "../contexts/AddressContext";
import Spinner from "react-bootstrap/Spinner";
import UpdateAddressModal from "../components/address/UpdateAddressModal"
import ActionButtons from "../components/address/ActionButton";
import { useLocation, useNavigate } from 'react-router-dom'
import { Mentions } from 'antd';
import { CartContext } from "../contexts/CartContext";
import { ToastContainer } from "react-toastify";
import { Badge, Modal, Card, Input, Radio, Space,Button } from 'antd'
import ModalDiscount from "../components/ModalDiscount";
import { methodPayment, generateRandomCodeWithHash } from '../constants/index'
import ModalOrder from '../components/ModalOrder'
import { AuthContext } from "../contexts/AuthContext";
import MyAxios from "../utils/myAxios";
import config from "../config";



const Checkout = ({socketClient}) => {
  const navigate = useNavigate();
  const location = useLocation()
  const { data, suggest } = location.state

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showModalDiscount, setShowModalDiscount] = useState(false)

  const [selectedDiscounts, setSelectedDiscounts] = useState({});
  const [deliveryPayment, setDeliveryPayment] = useState("COD")

  const [currentProductId, setCurrentProductId] = useState(null);
  const [listDiscounts, setListDiscount] = useState([])
  const [discountOfId, setDiscountOfId] = useState(null)

  const [valueDiscount, setValueDiscount] = useState("")
  const [listProducts, setListProduct] = useState(data.shop_order_ids_new)

  
  const [checkoutOrder, setCheckoutOrder] = useState({})
  const [orderInfomation, setOrderInfomation] = useState({})

  const [orderCheckout, setOrderCheckout] = useState({})

  const [totalInit, setTotalInit] = useState(0)
  const [updatedDataCheckout, setDataCheckout] = useState(null)
  const dataCheckout = []
  const { checkOutReview, getAllDiscountOfProduct, paymentVNPAY, showModalOrder, setShowModalOrder  } = useContext(CartContext)
  const [resultsSuggest, setResultsSuggest] = useState([]);
  const {authState: {user}} = useContext(AuthContext)
  const nameUser = `${user.givenName} ${user.familyName}`
  useEffect(() => {
    const a = async() => {
      const newResults = suggest?.map((item) => {
        return {
          ID: user.idUser,
          Name: nameUser,
          Wishlist: item.productId,
          Interests: item.type,
          ShopID_Purchase: item.shopId,
          brand: item.brand,
          name_product: item.name
        };
      });
      setResultsSuggest(newResults);
      
    
    }
    a()
   

   
  },[suggest])
  
 console.log(resultsSuggest);
  useEffect(() => {
    let total = 0;
    listProducts?.forEach(function (i) {
      let price = i.item_products[0].price;
      let quantity = i.item_products[0].quantity;
      total += price * quantity;
    });
    setOrderCheckout({
      totalCheckout: total,
      feeShip: 0

    })
    setTotalInit(total)
  }, [])


  console.log("listproduct", listProducts);



  // const handleDiscount = async (productId, codeId) => {
  //   const updatedDiscounts = { ...valueDiscount, [productId]: codeId };
  //   setValueDiscount(updatedDiscounts);


  //   const updatedDataCheckout = listProducts.map((i) => {
  //     return {
  //       shopId: i.shopId,
  //       shop_discounts: i.item_products.map((c) => {
  //         if (c.productId === productId) {
  //           return {
  //             codeId: codeId
  //           };
  //         }
  //         return null; // Nếu không phải sản phẩm đang thay đổi, không có mã giảm giá
  //       }).filter(Boolean),
  //       item_products: [
  //         {
  //           price: i.item_products[0].price,
  //           quantity: i.item_products[0].quantity,
  //           productId: i.item_products[0].productId,
  //           name: i.item_products[0].name,
  //           thumb: i.item_products[0].thumb
  //         }
  //       ]
  //     };
  //   });
  //   const dataSend = {
  //     cartId: data.cartId,
  //     userId: localStorage.getItem("userId"),
  //     shop_order_ids: updatedDataCheckout
  //   }

  //   setDataCheckout(updatedDataCheckout);
  //   console.log("cheka", dataSend);
  //   const result = await checkOutReview(dataSend)
  //   if (result?.status === 200) {

  //     setListProduct(result.metadata.shop_order_ids_new)
  //     setCheckoutOrder(result.metadata.checkout_order)
  //   }

  // }

  const handleGetVoucher = async (productId, shopId) => {
    setCurrentProductId(productId)
    setShowModalDiscount(true)
    const data = {
      productId,
      shopId
    }
    const result = await getAllDiscountOfProduct(data)
    setListDiscount(result)
  }

  const handleUseDiscount = async (productId, codeId, discountId) => {
   
    let targetObject = listProducts.find((item) =>
      item.item_products.some((product) => product.productId === productId)
    );
   
    if (targetObject) {
      if (!targetObject.shop_discounts) {
        targetObject.shop_discounts = [];
      }

      const isSelected = selectedDiscounts[productId]?.includes(codeId);

      if (isSelected) {
        // Nếu đã chọn, loại bỏ khỏi danh sách và xóa khỏi mảng shop_discounts
        const updatedDiscounts = selectedDiscounts[productId].filter((item) => item !== codeId);
        setSelectedDiscounts({ ...selectedDiscounts, [productId]: updatedDiscounts });
        targetObject.shop_discounts = targetObject.shop_discounts.filter(
          (discount) => discount.codeId !== codeId
        );
      } else {
        // Nếu chưa chọn, thêm vào danh sách và thêm vào mảng shop_discounts
        const updatedDiscounts = [...(selectedDiscounts[productId] || []), codeId];
        setSelectedDiscounts({ ...selectedDiscounts, [productId]: updatedDiscounts });
        targetObject.shop_discounts.push({ codeId });
      }
    } else {
      console.error("Không tìm thấy sản phẩm");
    }

    const dataSend = {
      cartId: data.cartId,
      userId: localStorage.getItem("userId"),
      shop_order_ids: listProducts,
    };

    const result = await checkOutReview(dataSend);
    
    if(result) {
      setDiscountOfId(discountId)
    }
    setListProduct(result?.metadata?.shop_order_ids_new || listProducts);
    setCheckoutOrder(result?.metadata?.checkout_order || checkoutOrder);
  

  };

  const {
    addressState: { listAddress, address, isAddressLoading },
    showEditModal,
    findAddress,
    setShowEditModal,
    getListAddress } = useContext(AddressContext)

  useEffect(() => {
    getListAddress();

    return (() => {
      console.log("Clear up");
    })
  }, [])

  const handleEditAddressClick = (idAddress) => {
    setSelectedAddressId(idAddress)
    setShowEditModal((true))

  }

  const handleChooseAddress = async (id) => {
    await findAddress(id)
  }

  const onChangeMethodPayment = (e) => {
    setDeliveryPayment(e.target.value)
  }

  const handleOrder = async () => {
  
    setShowModalOrder(true)
    const { totalPrice, ...newResult } = checkoutOrder;
    
    const { createdAt, updatedAt, idAddress, ...newAddress } = address;
    const newArray = [];
    const shopIdSet = new Set();
    
    listProducts.forEach(item => {
      if (!shopIdSet.has(item.shopId)) {
        // Nếu shopId chưa được thêm vào mảng mới, thêm nó vào và thêm vào set
        newArray.push({ shopId: item.shopId, item_products: item.item_products });
        shopIdSet.add(item.shopId);
      } else {
        // Nếu shopId đã có trong mảng mới, tìm shop có cùng shopId và thêm item_products vào
        const existingShop = newArray.find(shop => shop.shopId === item.shopId);
        existingShop.item_products.push(...item.item_products);
      }
    });
    console.log("newA", newArray);
    setListProduct(newArray)
    const resultArray = newArray.map(item => ({
      shopId: item.shopId,
      item_products: item.item_products.map(product => ({
        price: product.price,
        quantity: product.quantity,
        name: product.name,
        productId: product.productId,
        
      }))
    }));
    let order_payment = deliveryPayment === "COD" ? "COD" : "vnpay"
    const data = {
      order_shipping: newAddress,
      order_type_payment: deliveryPayment,
      order_payment,
      order_checkout: newResult ,
      order_checkout_no_discount: orderCheckout,
      order_products: resultArray,
      order_userId: localStorage.getItem("userId"),
      order_trackingNumber: generateRandomCodeWithHash()
    }
    
    setOrderInfomation(data)

    async function postData() {
      for (const item of resultsSuggest) {
        await MyAxios.post(`${config.urlProductService}/product/write/csv/v2`, [item]);
      }
    }
    
    postData();
  }

  let body

  if (isAddressLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    )
  } else if (listAddress === 0) {
    body = (
      <p className="user-details total">
        You haven't address
      </p>
    )
  } else {
    body = (
      <>
        {listAddress.map((post, index) => {
          return (
            <div className="w-100" key={index}>
              <input type="radio" value="Male" name="gender" onChange={() => handleChooseAddress(post.idAddress)} /> {
                `${post.recipientName} - ${post.note}, ${post.wards}, ${post.district}, ${post.city}.`
              }
              <span onClick={() => handleEditAddressClick(post.idAddress)} style={{marginLeft: "20px"}}>
              <Button type="primary">Sửa</Button>
              </span>
            </div>

          )
        })}
      </>

    )
  }
  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <ToastContainer />
        <div className="row">
          <div className="col-7">
          <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Giỏ Hàng
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Thông Tin
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Vận Chuyển
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Thanh Toán
                  </li>
                </ol>
              </nav>
            <div className="checkout-left-data">
              {/* <h3 className="website-name">Dev Corner</h3> */}
              <ModalAddress />
              {showEditModal && <UpdateAddressModal addressId={selectedAddressId} />}

              {showModalOrder && <ModalOrder data={orderInfomation} />}
               
            

              {/* <UpdateAddressModal /> */}
            
              <h4 className="" style={{ fontSize: '20px', fontWeight:'600'}}><span>
                 <img src='https://daisuloi.vn/wp-content/uploads/2021/09/icon-ban-do-400x400.png' style={{width: '30px'}} />
                </span> Thông Tin Liên Hệ</h4>
              {body}
              {/* <p className="user-details total">
                Navdeep Dahiya (monud0232@gmail.com)
              </p> */}
              <h4 className="mb-3" style={{marginTop:'30px', fontSize: '20px'}}>
                <span>
                  <img src="https://phuhungthinh.com/wp-content/uploads/2022/08/thanh-toan.png" style={{width: '30px', borderRadius: '50px'}}/>
                </span> Phương Thức Thanh Toán</h4>
                
              <Radio.Group onChange={onChangeMethodPayment} value={deliveryPayment}>
                {methodPayment.map((method) => (
                  <div key={method.value}>
                    <Radio value={method.value}>{method.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            {/* {
              deliveryPayment === 'VNPAY' && (
                <button className="button" onClick={handlePaymentVNPAY}>
                  Process VNPAY
                </button>
              )
            } */}
          </div>
          <div className="col-5">
            {/* //end loop */}
            {listProducts && listProducts.map((i) => (
              i.item_products.map((c) => (

                <div className="border-bottom py-4">
                  <div className="d-flex gap-10 mb-2 align-align-items-center">
                    <div className="w-75 d-flex gap-10">
                      <div className="w-25 position-relative">
                        <span
                          style={{ top: "-10px", right: "2px" }}
                          className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                        >
                          {c.quantity}
                        </span>
                        <img className="img-fluid" src={c.thumb} alt="product" />
                      </div>
                      {showModalDiscount && (
                        <Modal title="MÃ ĐANG ÁP DỤNG" open={showModalDiscount} onCancel={() => setShowModalDiscount(false)}>
                          {listDiscounts.length > 0 && listDiscounts.map((discount) => (
                            <Card
                              size="small"
                              title="MÃ GIẢM GIÁ"
                              extra={
                                <Badge
                                  className="site-badge-count-109"
                                  count={"Voucher"}
                                  style={{
                                    backgroundColor: (selectedDiscounts[currentProductId] || []).includes(
                                      discount.discount_code
                                    )
                                      ? "#52c41a" // Màu khi được chọn
                                      : "#d9d9d9", // Màu khi không được chọn
                                  }}
                                  onClick={() => handleUseDiscount(currentProductId, discount.discount_code, discount._id)}
                                />
                              }
                              style={{ width: 300 }}
                              key={discount._id}
                            >
                              <p>{discount.discount_code}</p>
                            </Card>

                          ))}
                        </Modal>
                      )}
                      <div>
                        <h5 className="total-price">{c.name}</h5>
                        <Badge
                          className="site-badge-count-109"
                          count={"Voucher"}
                          style={{ backgroundColor: '#52c41a' }}
                          onClick={() => handleGetVoucher(c.productId, i.shopId)}
                        />
                        {/* <p className="total-price"><input
                          style={{ width: '50%' }}
                          name="abc"
                          value={valueDiscount[c.productId] || ""}
                          onChange={(e) => {

                            handleDiscount(c.productId, e.target.value);
                          }}
                        /></p> */}
                      </div>
                    </div>

                    <div className="flex-grow-1">
                      <h5 className="total">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(c.price * c.quantity)}</h5>
                      <h5 className="total">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(i?.priceApplyDiscount || (c.price * c.quantity))}</h5>
                    </div>
                  </div>
                </div>
              ))))}
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Mã Giảm Gía</p>
                {/* <p className="total-price">$ {checkoutOrder?.totalDiscount || 0}</p> */}
                <p className="total-price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(checkoutOrder?.totalDiscount || 0)}</p>

              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Phí Ship</p>
                <p className="mb-0 total-price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(checkoutOrder?.feeShip || 0)}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Tổng Tiền</h4>
              <h5 className="total-price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(checkoutOrder?.totalCheckout || totalInit)}</h5>
            </div>
            <Link to="/checkout" state={{ data: dataCheckout, discountId: discountOfId }} className="button" onClick={handleOrder}>
              Đặt Hàng
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
