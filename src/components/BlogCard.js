import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({data}) => {
  const {
    Product_ID, Product_Name, Product_Description, Product_Type, Brand, Product_Thumbnail,Product_Shop, Product_Price
  } = data
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src={Product_Thumbnail} className="img-fluid w-100" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Product_Price)}</p>
        <h5 className="title">{Product_Name}</h5>
        <p className="description" style={{overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: 'ellipsis',
  maxWidth: '600px'}} >
          {Product_Description}
        </p>
        <Link to={`/product/${Product_ID}`} className="button">
          Chi Tiết
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
