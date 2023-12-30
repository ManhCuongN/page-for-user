import React, { useContext, useEffect, useState } from "react";
import { Pagination, Space, Spin } from 'antd';
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { ProductContext } from "../contexts/ProductContext";

const ProductCardV2 = ({ data, grid, state }) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data?.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {(state) ? 
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Space size="middle" style={{marginLeft:"20px"}}>
          <Spin size="large" />
          <Spin size="large" />
          <Spin size="large" />
        </Space>
      </div>
      : (
        <>
          <div className="row">
            {currentProducts && currentProducts.map((product) => (
              <div
                key={product._id}
                className={`${location.pathname === "/product" ? `col-${grid}` : "col-3"
                  } `}
              >
                <Link
                  to={
                    location.pathname === "/"
                      ? `/product/${product._id}`
                      : location.pathname === "/product/:id"
                        ? `/product/${product._id}`
                        : `/product/${product._id}`
                  }
                  className="product-card position-relative"
                >
                  <div className="wishlist-icon position-absolute">
                    {/* ... (thêm nội dung cho icon wishlist) */}
                  </div>
                  <div className="product-image">
                    <img src={product?.product_thumb} alt="product image"  className="img-fluid" />
                    <img src={product?.product_images[0]} className="img-fluid" alt="product image" />
                  </div>
                  <div className="product-details">
                    <h5 className="product-title" style={{ overFlow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '600px'}}>
                      {product?.product_name}
                    </h5>
                    <p className="description" >
                      {product?.product_description}
                    </p>
                    <b style={{color: '#0D2D53', fontSize: "20px" }}>
                       {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.product_price)}
                    </b>
                  </div>
                  <div className="action-bar position-absolute">
                    <div className="d-flex flex-column gap-15">
                      {/* ... (thêm nội dung cho action bar) */}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="pagination-container">
            <Pagination
              defaultCurrent={currentPage}
              pageSize={productsPerPage}
              total={data?.length}
              onChange={paginate}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductCardV2;
