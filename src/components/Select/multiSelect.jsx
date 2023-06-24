import { Select, Space } from "antd";
import { useState } from "react";
const { Option } = Select;

const MultiSelect = ({ listItem, handleChange }) => {

  return (
    <Select
      mode="multiple"
      style={{
        width: "100%",
      }}
      placeholder="select one country"
      allowClear
      onChange={handleChange}
      optionLabelProp="label"
    >
      {listItem.map((item) => {
        return (
          item.dataIndex && (
            <Option value={item?.dataIndex} label={item?.dataIndex}>
              <Space>
                <span role="img" aria-label={item?.dataIndex}>
                  {item.title}
                </span>
              
              </Space>
            </Option>
          )
        );
      })}
    </Select>
  );
};
export default MultiSelect;
