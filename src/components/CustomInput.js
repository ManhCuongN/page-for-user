import React from "react";

const CustomInput = (props) => {
  const { type, name, placeholder, classname, value, onChange } = props;
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-control ${classname}`}
      />
    </div>
  );
};

export default CustomInput;
