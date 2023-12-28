import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
// import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { ProductContext } from "../contexts/ProductContext";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Review from "../components/Review";
import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const SingleProduct = () => {

  const { loadUser } = useContext(AuthContext);
  const [selectedPairs, setSelectedPairs] = useState([]);
  const [quantityProduct, setQuantityProduct] = useState(1);
  const { addToCart } = useContext(CartContext)
  const { getProductById, getInfoShop } = useContext(ProductContext)
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);
  const [shopName, setShopName] = useState("")
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {

      // You can await here
      const response = await getProductById(id);
      setProduct(response);
      const shop = await getInfoShop(response.product_shop)
      setShopName(shop)
    }
    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const load = await loadUser();
      setUser(load);
    };
    fetchData();
  }, []);



  const handleValueClick = (key, value) => {
    const updatedSelectedPairs = selectedPairs.filter(pair => pair.key !== key);
    updatedSelectedPairs.push({ key, value });
    setSelectedPairs(updatedSelectedPairs);
  };
  console.log("se", selectedPairs);
  // const handleValueClick = (key, value) => {
  //   setSelectedPairs((prevSelectedPairs) => {
  //     // Kiểm tra xem cặp key-value đã tồn tại trong mảng selectedPairs chưa
  //     const pairIndex = prevSelectedPairs.findIndex((pair) => pair.key === key);
  //     if (pairIndex !== -1) {
  //       // Nếu cặp key-value đã tồn tại, xóa nó ra khỏi mảng
  //       const updatedPairs = [...prevSelectedPairs];
  //       updatedPairs.splice(pairIndex, 1);
  //       console.log(`Bỏ chọn - Key: ${key}, Value: ${value}`);
  //       return updatedPairs;
  //     } else {
  //       // Nếu cặp key-value chưa tồn tại, thêm nó vào mảng
  //       const newPair = { key, value };
  //       return [...prevSelectedPairs, newPair];
  //     }
  //   });
  // };

  const handleQuantity = (event) => {
    const newValue = parseInt(event.target.value); // Chuyển đổi chuỗi thành số nguyên
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 10) {
      setQuantityProduct(newValue);
    }
  };

  const handleAddToCart = async (e) => {
    const transformedObject = selectedPairs.reduce((result, item) => {
      result[item.key] = item.value;
      return result;
    }, {});
    const data = {
      userId: user.idUser,
      product: {
        product_thumb: product.product_thumb,
        productId: id,
        shopId: product.product_shop,
        quantity: quantityProduct,
        price: product.product_price,
        name: product.product_name,
        type: product.product_type,
        brand: product.product_attributes.brand,
        variation: {
          ...transformedObject
        }

      }

    };
    console.log("data", data)

    const res = await addToCart(data)
    if (res?.status === 200) {
      toast.success(res.message)
    }


  };

  const props = {
    width: 594,
    height: 600,
    zoomWidth: 600,
    img: `${product?.product_thumb}`,
    //img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
  };

  const [orderedProduct, setorderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    // console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  console.log("SÁ", shopName.avatar);
  const closeModal = () => { };

  const translateKey = (key) => {
    const translations = {
      style: "Phong Cách",
      material: "Chất Liệu",
      brand: "Thương Hiệu",
      color: "Màu Sắc",
      size: "Size",
      origin: "Nguồn Gốc",
      expried: "HSD",
      segment: "Phân Khúc"
      // Thêm các key và giảng dịch tương ứng vào đây
    };

    return translations[key] || key;
  };

  return (
    <>
      <ToastContainer />
      <Meta title={"Product Name"} />
      <BreadCrumb title="Product Name" />
      {product && (
        <>
          <Container class1="main-product-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-6">
                <div className="main-product-image">
                  <div>
                    <ReactImageZoom {...props} />
                  </div>
                </div>
                <div className="other-product-images d-flex flex-wrap gap-15">
                  {product?.product_images?.length > 0 &&
                    product?.product_images?.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          className="img-fluid"
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="col-6" >
                <div className="main-product-details" >
                  <div className="border-bottom">
                    <h3 className="title">{product?.product_name}</h3>
                    <FontAwesomeIcon icon="fa-light fa-heart" />
                  </div>
                  <div className="border-bottom py-3">
                    <p className="price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.product_price)}</p>
                    <div className="d-flex align-items-center gap-10">


                    </div>
                    <a className="review-btn" href="#review">
                      Đánh Gía
                    </a>
                  </div>
                  <div className=" py-3">

                    <div className="d-flex gap-10 align-items-center my-2">
                      <img src={shopName.avatar} style={{ width: "30px", borderRadius: "100%" }} />
                      {/* <Avatar  size="small">
                        { shopName.avatar}
                      </Avatar> */}
                      <Link to={`/shop-info/${shopName?._id}`} state={{ shop: shopName }}>


                        <p>
                          <b>{shopName?.name}</b>
                        </p></Link>

                    </div>
                    <div className="d-flex gap-10 align-items-center my-2">
                      <h3 className="product-heading">Phân Loại</h3>
                      <p className="product-data">{product?.product_type}</p>
                    </div>
                    <div className="d-flex gap-10 align-items-center my-2">
                      <h3 className="product-heading">Đang Còn</h3>
                      <p className="product-data">{product?.product_quantity}</p>
                    </div>


                    {Object.entries(product?.product_attributes).map(([key, value]) => (
                      value ? (
                        <div className="d-flex gap-10 align-items-center my-2" key={key}>
                          <h3 className="product-heading" style={{ width: "100px" }}>{translateKey(key)}</h3>
                          <div className="d-flex gap-10 align-items-center my-2">
                            <p className="product-data" style={{ width: "200px", marginLeft: "10px" }}>{value.charAt(0).toUpperCase() + value.slice(1)}</p>
                          </div>
                        </div>
                      ) : (<></>)
                    ))}


                    {Object.keys(product?.product_variation).map((key) => (
                      <div className="" key={key}>
                        <h3 className="product-heading-var">{translateKey(key)}</h3>
                        <div className="d-flex gap-10 align-items-center my-2" style={{ marginLeft: "120px" }}>
                          {product?.product_variation[key].split(',').map((value, index) => (

                            <p

                              key={key}
                              onClick={() => handleValueClick(key, value)}
                              style={{
                                backgroundColor: selectedPairs.some(
                                  pair => pair.key === key && pair.value === value
                                ) ? '#BFDBFD' : '#DADADA',
                                padding: '3px 3px',

                                color: selectedPairs.some(
                                  pair => pair.key === key && pair.value === value
                                ) ? 'black' : '#9C9696',
                                cursor: 'pointer',
                                fontSize: '13px',
                                borderRadius: '5px',
                                width: '60px',

                                textAlign: 'center'

                              }}
                            >
                              {value}
                            </p>


                            // <li key={index}>{value}</li>
                          ))}
                        </div>
                      </div>
                    ))}

                  </div>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">

                    <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                      <h3 className="product-heading">Số Lượng</h3>
                      <div className="">
                        <input
                          type="number"
                          name="quantity"
                          min={1}
                          max={product?.product_quantity}
                          onChange={handleQuantity}
                          className="form-control"
                          style={{ width: "70px" }}
                          id=""
                        />
                      </div>
                      <div className="d-flex align-items-center gap-30 ms-5">
                        <button
                          className="button border-0"

                          type="button"
                          onClick={handleAddToCart}
                          style={{ borderRadius: '15px' }}
                        >
                          Thêm vào giỏ hàng
                        </button>

                      </div>
                    </div>

                    <div className="d-flex gap-10 flex-column  my-3">




                      <h3 className="product-heading">Vận Chuyển & Hoàn Trả</h3>
                      <p className="product-data">
                        Miễn phí vận chuyển và trả lại có sẵn trên tất cả các đơn đặt hàng! <br /> Chúng tôi vận chuyển tất cả các đơn đặt hàng nội địa trong vòng
                        <b> 5-10 ngày!</b>
                      </p>
                    </div>
                    <div className="d-flex gap-10 align-items-center my-3">
                      <h3 className="product-heading">Link:</h3>
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          copyToClipboard(
                            "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                          );
                        }}
                      >
                        {product.product_slug}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <Container class1="description-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <h4>Mô Tả Sản Phẩm</h4>
                <div className="bg-white p-3" style={{ borderRadius: '15px' }}>
                  <p>
                    {product.product_description}
                  </p>
                </div>
              </div>
            </div>
          </Container>
          <Review productId={id} user={user} />
          <Container class1="popular-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <h3 className="section-heading">Đề Xuất Cho Bạn</h3>
              </div>
            </div>
            <div className="row">{/* <ProductCard /> */}</div>
          </Container>

          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered ">
              <div className="modal-content">
                <div className="modal-header py-0 border-0">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body py-0">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 w-50">
                      <img src={watch} className="img-fluid" alt="product imgae" />
                    </div>
                    <div className="d-flex flex-column flex-grow-1 w-50">
                      <h6 className="mb-3">Apple Watch</h6>
                      <p className="mb-1">Quantity: asgfd</p>
                      <p className="mb-1">Color: asgfd</p>
                      <p className="mb-1">Size: asgfd</p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0 py-0 justify-content-center gap-30">
                  <button type="button" className="button" data-bs-dismiss="modal">
                    View My Cart
                  </button>
                  <button type="button" className="button signup">
                    Checkout
                  </button>
                </div>
                <div className="d-flex justify-content-center py-3">
                  <Link
                    className="text-dark"
                    to="/product"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    Continue To Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </>
  );
};

export default SingleProduct;
