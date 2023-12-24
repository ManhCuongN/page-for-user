const methodPayment = [
    {
        value: "COD",
        name: "Nhận Hàng Thanh Toán"
    },
    {
        value: "VNPAY",
        name: "Thanh Toán Với VNPAY"
    }
]

const generateRandomCodeWithHash = (length = 10) =>  {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '#';
  
    for (let i = 1; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
  
    return code;
  }
  

  

module.exports = {
    methodPayment,
    generateRandomCodeWithHash
}