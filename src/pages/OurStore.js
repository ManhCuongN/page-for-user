import React, { useContext, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCardV2 from "../components/ProductCardV2";
import Color from "../components/Color";
import Container from "../components/Container";
import { Slider } from 'antd';
import { ProductContext } from "../contexts/ProductContext";

const OurStore = () => {
  const marks = {
    0: '0',
    20: '200000',
    45: '450000',
    70: '800000',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>1.000.000đ</strong>,
    },
  };

  const [sliderValue, setSliderValue] = useState(0);
  const [sliderValueSearch, setSliderValueSearch] = useState(0);
  const [searchType, setSearchType] = useState("");
  const [listSearch, setListSearch] = useState([]);

  const {searchMulti} = useContext(ProductContext)



  const handleSliderAfterChange = async(value) => {
    setSliderValue(value)
    setSliderValueSearch(marks[value])
    const data = {
      product_price: parseFloat(marks[value]),
      product_type: searchType
    }
    const result = await searchMulti(data)
    if(result) setListSearch(result.metadata)

  
  };

  const handleSearchType = async (e) => {
    setSearchType(e.target.value);
  
    const data = {
      product_price: sliderValueSearch,
      product_type: e.target.value, // Sử dụng giá trị mới của searchType
    };
  
    console.log("Data sent", data);
    const result = await searchMulti(data);
    if (result) setListSearch(result.metadata);
  };


  const [grid, setGrid] = useState(4);
  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
           
            
            
            
            <div className="filter-card mb-3">
             
                
            </div>
            <div className="filter-card mb-3">
             
            </div>
            <div className="filter-card mb-3">
              
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select
                    name=""
                   
                    className="form-control form-select"
                    id=""
                    onChange={handleSearchType}
                  >
                    <option value="">None</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Electronics">Electronics</option>
                   
                  </select>
               
                  <span>
                       <Slider marks={marks} included={false} defaultValue={0} 
                        value={sliderValue}
                        onAfterChange={handleSliderAfterChange}
                       
                       style={{width: '400px', marginLeft: '300px'}} />
                  </span>
                </div>
                
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                <ProductCardV2 data={listSearch} grid={grid} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
