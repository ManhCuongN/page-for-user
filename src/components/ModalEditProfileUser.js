import React, { useContext, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Col, Row, Flex, Upload, Image, Input, Form, Modal, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { AuthContext } from '../contexts/AuthContext';
export default function ModalEditProfileUser({user}) {
    const {modalEditProfileUser, setModalEditProfileUser, updateUser, uploadImage} = useContext(AuthContext)
    const [updateProfile, setUpdateProfile] = useState(user)
    

    const {phone, email,avatar, familyName, givenName, createdAt, idUser} = updateProfile
    const [updatedAvatar, setupdatedAvatar] = useState(avatar)

    const hanldeUpdateProfile = (e) => {
        setUpdateProfile({...updateProfile, [e.target.name]: e.target.value})
    }
    
    const handleOk = async () => {
        const data = {
            phone, email,avatar: updatedAvatar, familyName, givenName
        }
       
        await updateUser(idUser, data)
        setModalEditProfileUser(false);
      };
    
      const handleCancel = () => {
        setModalEditProfileUser(false);
      };
      const handleUpdatedAvatar = async (info) => {

        try {
            const uploadData = new FormData();
            uploadData.append("file", info.file.originFileObj);
            const res = await uploadImage(uploadData);
            const newThumbUrl = res.metadata.image_url;
            await setupdatedAvatar(newThumbUrl);
           

        } catch (error) {
            console.error('Lỗi khi tải lên:', error);
        }

    };

    return (
        <Modal title="THAY ĐỔI THÔNG TIN" open={modalEditProfileUser} onOk={handleOk} onCancel={handleCancel}>
        <Row style={{ backgroundColor: '#BFDBFD', borderRadius: '2%' }}>
            <Col span={8} style={{ backgroundColor: '#0D2D53', borderRadius: '2%' }}>
                <Flex gap="middle" vertical style={{
                                    marginLeft: "26px",
                                    marginTop: "20px",
                                    borderRadius: "50px"
                                }}>
                    <ImgCrop rotationSlider>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            onChange={handleUpdatedAvatar}
                        >
                            {/* <img src={updatedAvatar} width={50} height={50}/> */}
                            <Image
                                width={150}
                                height={100}
                                src={updatedAvatar}
                                
                            />
                        </Upload>
                    </ImgCrop>
                    <p style={{color: '#fff', fontSize: '16px'}}>{givenName} {familyName}</p>
                </Flex>
            </Col>
            <Col span={16} >
                <Flex gap="middle" vertical>
                    <h3 style={{ marginLeft: '20px' }}><b>Thông Tin</b></h3>
                    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        <Form.Item label="Tên Đệm">
                            <Input
                               value={familyName}
                               onChange={hanldeUpdateProfile}
                               name='familyName'
                                placeholder="Tên Đệm..."
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />

                        </Form.Item>
                        <Form.Item label="Họ Và Tên">
                            <Input
                                value={givenName}
                                name='givenName'
                                onChange={hanldeUpdateProfile}
                                placeholder="Họ Và Tên"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />

                        </Form.Item>
                        <Form.Item label="Số Điện Thoại">
                            <Input
                                value={phone}
                                name='phone'
                                onChange={hanldeUpdateProfile}
                                placeholder="Số Điện Thoại"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />

                        </Form.Item>
                        <Form.Item label="Email">
                            <Input
                               value={email}
                               name='email'
                               onChange={hanldeUpdateProfile}
                                placeholder="Email..."
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="Extra information">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />

                        </Form.Item>
                        {/* Add more Form.Item components for other fields if needed */}
                    </Form>
                </Flex>
            </Col>
        </Row>
        </Modal>
    );
}
