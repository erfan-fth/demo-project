import React from "react";
import { Form, Select } from "antd";

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};
const Select_Input = ({ name, label, required, message, className }) => {
  return (
    <Form.Item
      name={name}
      label={label}
      className={className}
      rules={[
        {
          required: required,
          message: false,
        },
      ]}
    >
      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "tom",
            label: "Tom",
          },
        ]}
      />
    </Form.Item>
  );
};

export default Select_Input;
