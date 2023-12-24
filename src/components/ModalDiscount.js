import { Col, Row, Button, Flex, Badge } from 'antd';
const ModalDiscount = ({ listDiscounts }) => {
    console.log("lis", listDiscounts);
    return (
        <>
            {listDiscounts.length > 0 && listDiscounts.map((discount) => (
                <Flex gap="middle" horizontal key={discount._id}>
                    <Button>{discount.discount_code}</Button>
                    <Button>
                        <Badge
                            className="site-badge-count-109"
                            count={"Voucher"}
                            style={{ backgroundColor: '#52c41a' }}
                        />
                    </Button>
                </Flex>
            ))}

        </>
    )
}

export default ModalDiscount