import React, { useEffect } from "react";
import { Space, Table, Tag } from "antd";

const random_number = () => {
  return Math.floor(Math.random() * 900);
};
const columns = [
  {
    title: "ردیف",
    dataIndex: "key",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "طرف مقابل",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "حساب طرف مقابل",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "کد عملیات حسابداری",
    dataIndex: "col1",
    key: "address",
  },
  {
    title: "نام عملیات حسابداری",
    dataIndex: "col2",
    key: "address",
  },
  {
    title: "ارز",
    dataIndex: "col3",
    key: "address",
  },
  {
    title: "مبلغ",
    dataIndex: "col4",
    key: "address",
  },
  {
    title: "نرخ ارز",
    dataIndex: "col5",
    key: "address",
  },
  {
    title: "مبلغ به ارز عملیاتی",
    dataIndex: "col6",
    key: "address",
  },
  {
    title: "مالیات",
    dataIndex: "col7",
    key: "address",
  },
  {
    title: "عوارض",
    dataIndex: "col8",
    key: "address",
  },
  {
    title: "شرح",
    dataIndex: "col9",
    key: "address",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York ",
    tags: ["nice", "developer"],
    col1: random_number(),
    col2: "نام عملیات",
    col3: "ارز",
    col4: random_number(),
    col5: random_number(),
    col6: random_number(),
    col7: random_number(),
    col8: "",
    col9: "",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London ",
    tags: ["loser"],
    col1: random_number(),
    col2: "نام عملیات",
    col3: "ارز",
    col4: random_number(),
    col5: random_number(),
    col6: random_number(),
    col7: random_number(),
    col8: "",
    col9: "",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney ",
    tags: ["cool", "teacher"],
    col1: random_number(),
    col2: "نام عملیات",
    col3: "ارز",
    col4: random_number(),
    col5: random_number(),
    col6: random_number(),
    col7: random_number(),
    col8: "",
    col9: "",
    col10: "",
  },
  {
    key: "4",
    name: "Joe Black",
    age: 32,
    address: "Sydney ",
    tags: ["cool", "teacher"],
    col1: random_number(),
    col2: "نام عملیات",
    col3: "ارز",
    col4: random_number(),
    col5: random_number(),
    col6: random_number(),
    col7: random_number(),
    col8: "",
    col9: "",
  },
];

const TableUi = ({ loader }) => {
  useEffect(() => {
    random_number()
  }, [loader]);

  return <Table columns={columns} dataSource={data} loading={loader} />;
};

export default TableUi;
