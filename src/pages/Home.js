import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { ProductContext } from "../contexts/ProductContext";
import Noti from "../components/Noti";
import ChatBot from "../components/Chatbot"
import { AuthContext } from "../contexts/AuthContext";
import ChatBoxAI from "../components/Chatbot-AI";
import {  Button, Space, Carousel} from 'antd'
import SimpleForm from "../components/ChatCustom";
const Home = () => {
  const [listProduct,setListProduct] = useState([])
  const [listProductSpecial,setListProductSpecial] = useState([])

  const [chatBotAI, setChatBotAI] = useState(false)
  const {authState: {user}} = useContext(AuthContext)
  const {getListProduct, suggestProductFunc,specialProductFunc, productState: { listProducts,suggestProduct, isProductLoading}} = useContext(ProductContext)
  useEffect(() => {
       async function fetchData() {
        const payloadSug = {
          _id: user.idUser
        }
      // You can await here
      const response = await getListProduct();
      const suggest = await suggestProductFunc(payloadSug)
      const special = await specialProductFunc()
      setListProductSpecial(special)
      setListProduct(response.data)
    }
    fetchData();
  },[])
  console.log("sugg", listProductSpecial);
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          {/* <SimpleForm/> */}
          {/* <Noti/> */}
          <div className="col-6">
            <Carousel>
               <div className="main-banner position-relative ">
              <img
                src="https://fireapps.io/wp-content/uploads/2020/10/5-best-free-ecommerce-flatform.png"
                className="img-fluid rounded-3"
                alt="main banner"
                style={{height: '400px', objectFit: 'cover'}}
              />
              <div className="main-banner-content position-absolute">
                {/* <h4>Siêu Ưu Đãi</h4>
                {/* <h5>iPad S13+ Pro.</h5> */}
                {/* <p>From  or $41.62/mo.</p> */}
                {/* <Link className="button">MUA NGAY</Link>  */}
              </div>
            </div>
            <div className="main-banner position-relative ">
              <img
                src="https://i.pinimg.com/564x/23/db/e7/23dbe7361f4736a0587a06d412e1ea3a.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
                style={{height: '400px'}}
              />
              <div className="main-banner-content position-absolute">
                {/* <h4>Siêu Ưu Đãi</h4>
                {/* <h5>iPad S13+ Pro.</h5> */}
                {/* <p>From  or $41.62/mo.</p> */}
                {/* <Link className="button">MUA NGAY</Link>  */}
              </div>
            </div>
            </Carousel>
           
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className=" ">
                <img
                  src="https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                  style={{height: '200px', width: '750px', objectFit: 'cover'}}
                />
             
              </div>

              <div className="">
                <img
                  src="https://cedcommerce.com/blog/wp-content/uploads/2018/12/Must-Have-Features-For-Your-Ecommerce-Website-732x244.png"
                  className="img-fluid rounded-3"
                  alt="main banner"
                  style={{height: '200px', width: '750px', objectFit: 'cover'}}
                />
             
              </div>
             
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              {/* {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })} */}
            </div>
          </div>
        </div>
      </Container>
      {/* <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading"><span>
              <img src="https://i.pinimg.com/originals/a3/6b/42/a36b422bb2bebcbd77bba846b83ddf5d.png" style={{width: '40px', marginTop: '-20px'}}/>
              </span> Sản Phẩm Hiện Có</h3>
          </div>
          <ProductCard data={listProducts} state= {isProductLoading}/>
         
          {/* <ProductCard data={listProduct} /> */}

          

          
        </div>
      </Container>

      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-1.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5>Màn Hình Lớn</h5>
                <h6>Smart Watch Series 7</h6>
                {/* <p>From $399or $16.62/mo. for 24 mo.*</p> */}
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-2.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Hiển Thị Tốt</h5>
                <h6 className="text-dark">Độ Sáng 600nits</h6>
                <p className="text-dark">Màn hình Retina 27 inch 5K</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-3.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">smartphones</h5>
                <h6 className="text-dark">Smartphone 13 Pro.</h6>
                {/* <p className="text-dark">
                  Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*
                </p> */}
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-3.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Loa Gia Đình</h5>
                <h6 className="text-dark">
Âm thanh tràn ngập căn phòng.</h6>
                {/* <p className="text-dark">
                  From $699 or $116.58/mo. for 12 mo.*
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
           <h3 className="section-heading"><span>
          <img src="https://cdn3d.iconscout.com/3d/premium/thumb/return-delivery-6377295-5298709.png?f=webp" style={{width: '60px', marginTop: '-8px'}}/>
          </span>Sản Phẩm Đặc Biệt</h3>
          </div>
        </div>
        <div className="row">
          {listProductSpecial.map((special) => (
            <SpecialProduct data={special}/>
          ))}       
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading"><span>
          <img src="https://cdn-icons-png.flaticon.com/512/3336/3336097.png" style={{width: '60px', marginTop: '-8px'}}/>
          </span>Đề Xuất Cho Bạn</h3>
            <div className="row">
          {suggestProduct.map((s) => (
            <div className="col-3">
            <BlogCard data={s}/>
          </div>
          ))}
          
   
        </div>
          </div>
        </div>
        <div className="row">
          {/* <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> */}
        </div>
      </Container>
      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">
              
            </h3>
          </div>
        </div>
        {/* <div className="row">
          {suggestProduct.map((s) => (
            <div className="col-3">
            <BlogCard data={s}/>
          </div>
          ))}
          
          
        </div> */}
      </Container>
      <Space>
    <ChatBoxAI  />

    </Space>
    </>
  );
};

export default Home;
