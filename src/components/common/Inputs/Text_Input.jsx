import { Form, Input } from "antd";
import React from "react";

const Text_Input = ({ label, name, required, message, className }) => {
  return (
    <Form.Item
      label={label}
      name={name}
      className={className}
      rules={[
        {
          required: required,
          message: false,
        },
      ]}
    >
      <Input />
    </Form.Item>
  );
};

export default Text_Input;
