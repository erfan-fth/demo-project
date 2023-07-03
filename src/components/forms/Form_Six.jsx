// // import { Button, Form, Input, Popconfirm, Table } from "antd";
// // import React, { useContext, useEffect, useRef, useState } from "react";
// // const EditableContext = React.createContext(null);
// // const EditableRow = ({ index, ...props }) => {
// //   const [form] = Form.useForm();
// //   return (
// //     <Form form={form} component={false}>
// //       <EditableContext.Provider value={form}>
// //         <tr {...props} />
// //       </EditableContext.Provider>
// //     </Form>
// //   );
// // };
// // const EditableCell = ({
// //   title,
// //   editable,
// //   children,
// //   dataIndex,
// //   record,
// //   handleSave,
// //   ...restProps
// // }) => {
// //   const [editing, setEditing] = useState(false);
// //   const inputRef = useRef(null);
// //   const form = useContext(EditableContext);
// //   useEffect(() => {
// //     if (editing) {
// //       inputRef.current.focus();
// //     }
// //   }, [editing]);
// //   const toggleEdit = () => {
// //     setEditing(!editing);
// //     form.setFieldsValue({
// //       [dataIndex]: record[dataIndex],
// //     });
// //   };
// //   const save = async () => {
// //     try {
// //       const values = await form.validateFields();
// //       toggleEdit();
// //       handleSave({
// //         ...record,
// //         ...values,
// //       });
// //     } catch (errInfo) {
// //       console.log("Save failed:", errInfo);
// //     }
// //   };
// //   let childNode = children;
// //   if (editable) {
// //     childNode = editing ? (
// //       <Form.Item
// //         style={{
// //           margin: 0,
// //         }}
// //         name={dataIndex}
// //         rules={[
// //           {
// //             required: true,
// //             message: `${title} is required.`,
// //           },
// //         ]}
// //       >
// //         <Input ref={inputRef} onPressEnter={save} onBlur={save} />
// //       </Form.Item>
// //     ) : (
// //       <div
// //         className="editable-cell-value-wrap"
// //         style={{
// //           paddingRight: 24,
// //         }}
// //         onClick={toggleEdit}
// //       >
// //         {children}
// //       </div>
// //     );
// //   }
// //   return <td {...restProps}>{childNode}</td>;
// // };
// // const Form_Six = () => {
// //   const [dataSource, setDataSource] = useState([
// //     {
// //       key: "0",
// //       name: "Edward King 0",
// //       age: "32",
// //       address: "London, Park Lane no. 0",
// //     },
// //     {
// //       key: "1",
// //       name: "Edward King 1",
// //       age: "32",
// //       address: "Lorem ipsum dolor sit.",
// //     },
// //     {
// //       key: "3",
// //       name: "Edward King 2",
// //       age: "12",
// //       address: "London, Park Lane no. 1",
// //     },
// //     {
// //       key: "4",
// //       name: "Edward King 3",
// //       age: "75",
// //       address: "Lorem ipsum dolor sit. ",
// //     },
// //   ]);
// //   const [count, setCount] = useState(4);
// //   const handleDelete = (key) => {
// //     const newData = dataSource.filter((item) => item.key !== key);
// //     setDataSource(newData);
// //   };
// //   const defaultColumns = [
// //     {
// //       title: "name",
// //       dataIndex: "name",
// //       width: "30%",
// //       editable: true,
// //     },
// //     {
// //       title: "age",
// //       dataIndex: "age",
// //     },
// //     {
// //       title: "address",
// //       dataIndex: "address",
// //     },
// //     {
// //       title: "operation",
// //       dataIndex: "operation",
// //       render: (_, record) =>
// //         dataSource.length >= 1 ? (
// //           <Popconfirm
// //             title="آیا مایل به پاک کردن هستید؟"
// //             onConfirm={() => handleDelete(record.key)}
// //             okText="بله"
// //             cancelText="لغو"
// //             okType="success"
// //           >
// //             <a>Delete</a>
// //           </Popconfirm>
// //         ) : null,
// //     },
// //   ];
// //   const handleAdd = () => {
// //     const newData = {
// //       key: count,
// //       name: `Edward King ${count}`,
// //       age: "32",
// //       address: `London, Park Lane no. ${count}`,
// //     };
// //     setDataSource([...dataSource, newData]);
// //     setCount(count + 1);
// //   };
// //   const handleSave = (row) => {
// //     const newData = [...dataSource];
// //     const index = newData.findIndex((item) => row.key === item.key);
// //     const item = newData[index];
// //     newData.splice(index, 1, {
// //       ...item,
// //       ...row,
// //     });
// //     setDataSource(newData);
// //   };
// //   const components = {
// //     body: {
// //       row: EditableRow,
// //       cell: EditableCell,
// //     },
// //   };
// //   const columns = defaultColumns.map((col) => {
// //     if (!col.editable) {
// //       return col;
// //     }
// //     return {
// //       ...col,
// //       onCell: (record) => ({
// //         record,
// //         editable: col.editable,
// //         dataIndex: col.dataIndex,
// //         title: col.title,
// //         handleSave,
// //       }),
// //     };
// //   });
// //   return (
// //     <div>
// //       <Button onClick={handleAdd} type="primary" className="bg-blue-400 mb-5  ">
// //         افزودن سطر
// //       </Button>
// //       <Table
// //         components={components}
// //         rowClassName={() => "editable-row"}
// //         bordered
// //         dataSource={dataSource}
// //         columns={columns}
// //       />
// //     </div>
// //   );
// // };
// // export default Form_Six;

// import { Table } from "antd";
// import { Resizable } from "react-resizable";
// import React from "react";
// import ReactDOM from "react-dom";
// // import "antd/dist/antd.css";
// // import "./index.css";

// const ResizableTitle = (props) => {
//   const { onResize, width, ...restProps } = props;

//   if (!width) {
//     return <th {...restProps} />;
//   }

//   return (
//     <Resizable
//       width={width}
//       height={0}
//       handle={
//         <span
//           className="react-resizable-handle"
//           onClick={(e) => {
//             e.stopPropagation();
//           }}
//         />
//       }
//       onResize={onResize}
//       draggableOpts={{ enableUserSelectHack: false }}
//     >
//       <th {...restProps} />
//     </Resizable>
//   );
// };

// class Form_Six extends React.Component {
//   state = {
//     columns: [
//       {
//         title: "Date",
//         dataIndex: "date",
//         width: 200,
//       },
//       {
//         title: "Amount",
//         dataIndex: "amount",
//         width: 100,
//         sorter: (a, b) => a.amount - b.amount,
//       },
//       {
//         title: "Type",
//         dataIndex: "type",
//         width: 100,
//       },
//       {
//         title: "Note",
//         dataIndex: "note",
//         width: 100,
//       },
//       {
//         title: "Action",
//         key: "action",
//         render: () => <a>Delete</a>,
//       },
//     ],
//   };

//   components = {
//     header: {
//       cell: ResizableTitle,
//     },
//   };

//   data = [
//     {
//       key: 0,
//       date: "2018-02-11",
//       amount: 120,
//       type: "income",
//       note: "transfer",
//     },
//     {
//       key: 1,
//       date: "2018-03-11",
//       amount: 243,
//       type: "income",
//       note: "transfer",
//     },
//     {
//       key: 2,
//       date: "2018-04-11",
//       amount: 98,
//       type: "income",
//       note: "transfer",
//     },
//   ];

//   handleResize =
//     (index) =>
//     (e, { size }) => {
//       this.setState(({ columns }) => {
//         const nextColumns = [...columns];
//         nextColumns[index] = {
//           ...nextColumns[index],
//           width: size.width,
//         };
//         return { columns: nextColumns };
//       });
//     };

//   render() {
//     const columns = this.state.columns.map((col, index) => ({
//       ...col,
//       onHeaderCell: (column) => ({
//         width: column.width,
//         onResize: this.handleResize(index),
//       }),
//     }));

//     return (
//       <Table
//         bordered
//         components={this.components}
//         columns={columns}
//         dataSource={this.data}
//       />
//     );
//   }
// }

// export default Form_Six;
