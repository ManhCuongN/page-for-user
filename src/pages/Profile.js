import React, { useContext, useEffect, useState } from 'react';
import './shopI.css'
import { Button, Modal } from 'antd';
import { AuthContext } from '../contexts/AuthContext';
import ModalEditProfileUser from '../components/ModalEditProfileUser';

const Profile = () => {
    const {authState:{user}, modalEditProfileUser, setModalEditProfileUser} = useContext(AuthContext)
  
    const {phone, email, avatar, familyName, givenName, createdAt, idUser} = user
  

      const handleEditProfile = async(e) => {
        // e.preventDefault()
        setModalEditProfileUser(true)
      }
  return (
    <>
      
       {modalEditProfileUser && <ModalEditProfileUser user={user} /> }  
      
      <div className="main-content">
        {/* Top navbar */}
        <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
          <div className="container-fluid">
            {/* Brand */}
            
            <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">Hồ Sơ Của Bạn</a>
            {/* Form */}
            
            {/* User */}
            <ul className="navbar-nav align-items-center d-none d-md-flex">
              <li className="nav-item dropdown">
                <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <div className="media align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                    {avatar ?  <img alt="Image placeholder" src={avatar} />
                    :  <img alt="Image placeholder" src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg" /> }
                     
                    </span>
                    <div className="media-body ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold" style={{color: '#fff'}} >{givenName} {familyName}</span>
                    </div>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                  <div className="dropdown-header noti-title">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </div>
                  <a href="../examples/profile.html" className="dropdown-item">
                    <i className="ni ni-single-02"></i>
                    <span>Hồ Sơ Của Bạn</span>
                  </a>
                  <a href="../examples/profile.html" className="dropdown-item">
                    <i className="ni ni-settings-gear-65"></i>
                    <span>Cài Đặt</span>
                  </a>
                  <a href="../examples/profile.html" className="dropdown-item">
                    <i className="ni ni-calendar-grid-58"></i>
                    <span>Hoạt Động</span>
                  </a>
                  <a href="../examples/profile.html" className="dropdown-item">
                    <i className="ni ni-support-16"></i>
                    <span>Hỗ Trợ</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#!" className="dropdown-item">
                    <i className="ni ni-user-run"></i>
                    <span>Đăng Xuất</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        {/* Header */}
        <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{ minHeight: "600px", backgroundImage: "url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)", backgroundSize: "cover", backgroundPosition: "center top" }}>
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8"></span>
          {/* Header container */}
          <div className="container-fluid d-flex align-items-center">
            <div className="row">
              <div className="col-lg-7 col-md-10">
                <h1 className="display-2 text-white">Xin Chào {givenName} {familyName}</h1>
                <p className="text-white mt-0 mb-5">Đây là trang hồ sơ của bạn. Bạn có thể tìm thấy thông tin và chỉnh sửa thông tin đó cho phù hợp</p>
                <a href="#!" className="btn btn-info" onClick={handleEditProfile}>Chỉnh Sửa</a>
              </div>
            </div>
          </div>
        </div>
        {/* Page content */}
        <div className="container-fluid mt--7">
          <div className="row">
            <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
              <div className="card card-profile shadow">
              <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                {avatar && (
                    <div class="card-profile-image">
                  <a href="#">
                  <img alt="Image placeholder" src={avatar} className="rounded-circle"/>                 
                  </a>
                </div>
                )}
              
              </div>
            </div>
            <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <div class="d-flex justify-content-between">
                {/* <p class="btn btn-sm btn-info mr-4" onClick={handleFollow}>{buttonFollow}</p> */}
                <a href="#" class="btn btn-sm btn-default float-right">Tin Nhắn</a>
              </div>
            </div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                <div class="col">
                  <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                    <div>
                      <span class="heading"></span>
                      <span class="description"></span>
                    </div>
                    <div>
                      <span class="heading"></span>
                      <span class="description"></span>
                    </div>
                    <div>
                      <span class="heading"></span>
                      <span class="description"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h3>
                {givenName} {familyName}<span class="font-weight-light"></span>
                </h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>{createdAt}
                </div>
                {/* <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer
                </div>
                <div>
                  <i class="ni education_hat mr-2"></i>University of Computer Science
                </div> */}
                {/* <hr className="my-4"> */}
                {/* <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p> */}
                <a href="#">Xem Thêm</a>
              </div>
            </div>
              </div>
            </div>
            <div className="col-xl-8 order-xl-1">
              <div className="card bg-secondary shadow">
              <div class="card-header bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Tài Khoản Của Bạn</h3>
                </div>
                <div class="col-4 text-right">
                  <a href="#!" class="btn btn-sm btn-primary">Cài Đặt</a>
                </div>
              </div>
            </div>
            <div class="card-body">
              {/* <form> */}
                <h6 class="heading-small text-muted mb-4">Thông Tin Của Bạn</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group focused">
                        <label class="form-control-label" for="input-username">Tên: </label>
                        <span> </span>
                         <span>{givenName} {familyName}</span>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-email">Ngày Tham Gia: </label>
                        <span> </span>
                        <span>{createdAt}</span>
                        {/* <input type="email" id="input-email" class="form-control form-control-alternative" placeholder="jesse@example.com"> */}
                      </div>  
                    </div>
                  </div>
                  
                </div>
                {/* <hr class="my-4"> */}
                {/* <!-- Address --> */}
                <h6 class="heading-small text-muted mb-4">Thông Tin Liên Hệ</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group focused">
                        <label class="form-control-label" for="input-address">Email </label>
                        <span> </span>
                        <span>{email}</span>
                        {/* <input id="input-address" class="form-control form-control-alternative" placeholder="Home Address" value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" type="text"> */}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4">
                      <div class="form-group focused">
                        <label class="form-control-label" for="input-city"> Số Điện Thoại:  </label>
                        <span> </span>
                        <span>{phone}</span>

                        {/* <input type="text" id="input-city" class="form-control form-control-alternative" placeholder="City" value="New York"> */}
                      </div>
                    </div>
                    
                  </div>
                </div>
                {/* <hr class="my-4"> */}
                {/* <!-- Description --> */}
                {/* <h6 class="heading-small text-muted mb-4">About me</h6>
                <div class="pl-lg-4">
                  <div class="form-group focused">
                    <label>About Me</label>
                    <textarea rows="4" class="form-control form-control-alternative" placeholder="A few words about you ...">A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>
                  </div>
                </div> */}
              {/* </form> */}
            </div>
            </div>
          </div>
              </div>
            </div>
        </div>
        <footer className="footer">
          <div className="row align-items-center justify-content-xl-between">
            <div className="col-xl-6 m-auto text-center">
              {/* <div className="copyright">
                <p>Made with <a href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">Argon Dashboard</a> by Creative Tim</p>
              </div> */}
            </div>
          </div>
        </footer>
     
    </>
  );
}

export default Profile;
