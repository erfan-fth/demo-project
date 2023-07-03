// import { Form, Input, Table, Button, Space, Radio, Popconfirm } from "antd";
// import CostumeTable from "../Tables/costumeTable";
// import {
//   SortableContext,
//   arrayMove,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { DndContext } from "@dnd-kit/core";
// import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
// import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
// import React, { useContext, useEffect, useRef, useState } from "react";
// import Highlighter from "react-highlight-words";
// import ReactDragListView from "react-drag-listview";
// import { Select } from "antd";
// import MultiSelect from "../Select/multiSelect";
// import { Excel } from "antd-table-saveas-excel";
// import _ from "lodash";
// import { Resizable } from "react-resizable";

// const ResizableTitle = (props) => {
//   const { onResize, width, ...restProps } = props;

//   if (!width) {
//     return <th {...restProps} />;
//   }

//   return (
//     <Resizable
//       width={width}
//       height={0}
//       resizeHandles={["w"]}
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

// const EditableContext = React.createContext(null);

// const EditableRow = ({ index, ...props }) => {
//   const [form] = Form.useForm();
//   return (
//     <Form form={form} component={false}>
//       <EditableContext.Provider value={form}>
//         <tr {...props} />
//       </EditableContext.Provider>
//     </Form>
//   );
// };

// const EditableCell = ({
//   title,
//   editable,
//   children,
//   dataIndex,
//   record,
//   handleSave,
//   ...restProps
// }) => {
//   const [editing, setEditing] = useState(false);
//   const inputRef = useRef(null);
//   const form = useContext(EditableContext);
//   useEffect(() => {
//     if (editing) {
//       inputRef.current.focus();
//     }
//   }, [editing]);
//   const toggleEdit = () => {
//     setEditing(!editing);
//     form.setFieldsValue({
//       [dataIndex]: record[dataIndex],
//     });
//   };
//   const save = async () => {
//     try {
//       const values = await form.validateFields();
//       toggleEdit();
//       handleSave({
//         ...record,
//         ...values,
//       });
//     } catch (errInfo) {
//       console.log("Save failed:", errInfo);
//     }
//   };
//   let childNode = children;
//   if (editable) {
//     childNode = editing ? (
//       <Form.Item
//         style={{
//           margin: 0,
//         }}
//         name={dataIndex}
//         rules={[
//           {
//             required: true,
//             message: `${title} is required.`,
//           },
//         ]}
//       >
//         {dataIndex == "gender" ? (
//           <Select
//             ref={inputRef}
//             onPressEnter={save}
//             onBlur={save}
//             options={genderOptions}
//           />
//         ) : (
//           <Input ref={inputRef} onPressEnter={save} onBlur={save} />
//         )}
//       </Form.Item>
//     ) : (
//       <div
//         className="editable-cell-value-wrap"
//         style={{
//           paddingRight: 24,
//         }}
//         onClick={toggleEdit}
//       >
//         {children}
//       </div>
//     );
//   }
//   return <td {...restProps}>{childNode}</td>;
// };

// const Form_Five = ({ children, ...props }) => {
//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState("");
//   const [size, setSize] = useState("small");

//   const handle_change_gender = (value, id) => {
//     const newData = dataSource.map((data) => {
//       if (data.key !== id) {
//         return data;
//       }

//       return {
//         ...data,
//         gender: value,
//       };
//     });

//     setDataSource(newData);
//   };

//   const onSearch = (value) => {
//     console.log("search:", value);
//   };

//   const handleSizeChange = (e) => {
//     setSize(e.target.value);
//   };

//   const searchInput = useRef(null);
//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };
//   const handleReset = (clearFilters) => {
//     clearFilters();
//     setSearchText("");
//   };
//   const getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//       close,
//     }) => (
//       <div
//         style={{
//           padding: 8,
//         }}
//         onKeyDown={(e) => e.stopPropagation()}
//       >
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={
//             (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
//             // console.log(selectedKeys, confirm, dataIndex)
//           }
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{
//             marginBottom: 8,
//             display: "block",
//           }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             className="bg-blue-500"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Search
//           </Button>
//           {/* <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Reset
//           </Button> */}
//           {/* <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({
//                 closeDropdown: false,
//               });
//               setSearchText(selectedKeys[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button> */}
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               close();
//             }}
//           >
//             close
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined
//         style={{
//           color: filtered ? "#1677ff" : undefined,
//         }}
//       />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{
//             backgroundColor: "#ffc069",
//             padding: 0,
//           }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ""}
//         />
//       ) : (
//         text
//       ),
//   });

//   const getColumnSelectSearchProps = (dataIndex) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//       close,
//     }) => (
//       <div
//         style={{
//           padding: 8,
//         }}
//         onKeyDown={(e) => e.stopPropagation()}
//       >
//         <Select
//           // ref={searchInput}
//           // value={selectedKeys[0]}
//           onChange={(e) =>
//             // console.log(e)
//             setSelectedKeys(e ? [e] : [])
//           }
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{
//             marginBottom: 8,
//             display: "block",
//           }}
//           placeholder="Select a person"
//           optionFilterProp="children"
//           filterOption={(input, option) =>
//             (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
//           }
//           options={genderOptions}
//         />
//         {/* <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{
//             marginBottom: 8,
//             display: "block",
//           }}
//         /> */}
//         <Space>
//           <Button
//             type="primary"
//             className="bg-blue-500"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Reset
//           </Button>
//           {/* <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({
//                 closeDropdown: false,
//               });
//               setSearchText(selectedKeys[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button> */}
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               close();
//             }}
//           >
//             close
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined
//         style={{
//           color: filtered ? "#1677ff" : undefined,
//         }}
//       />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{
//             backgroundColor: "#ffc069",
//             padding: 0,
//           }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ""}
//         />
//       ) : (
//         text
//       ),
//   });

//   const [count, setCount] = useState(15);
//   const handleDelete = (key) => {
//     const newData = dataSource.filter((item) => item.key !== key);
//     setDataSource(newData);
//   };

//   const [columns, setColumns] = useState([
//     // {
//     //   key: "sort",
//     // },
//     {
//       title: "نام",
//       render: (record) => {
//         console.log(record);
//         return (
//           <span>
//             {record.length == 0 ? (
//               <Input
//                 // style={{ width: 200 }}
//                 size="small"
//                 className="w-full p-1 bg-white border border-gray-200"
//                 placeholder={`Search name`}
//                 // allowClear
//                 // enterButton="Search"
//                 onSearch={(value) => console.log(value)}
//               />
//             ) : (
//               record
//             )}
//           </span>
//         );
//       },
//       dataIndex: "name",
//       width: 30,
//       key: "name",
//       editable: true,
//       hidden: false,
//     },
//     {
//       title: "نام خانوادگی",
//       dataIndex: "family",
//       key: "family",
//       editable: true,
//       width: 40,
//       sorter: {
//         compare: (a, b) => a.family - b.family,
//         multiple: 3,
//       },
//       render: (record) => {
//         return (
//           <span>
//             {record.length == 0 ? (
//               <Input
//                 // style={{ width: 200 }}
//                 size="small"
//                 className="w-full p-1 bg-white border border-gray-200"
//                 placeholder={`Search family name`}
//                 // allowClear
//                 // enterButton="Search"
//                 onSearch={(value) => console.log(value)}
//               />
//             ) : (
//               record
//             )}
//           </span>
//         );
//       },
//       // width: "30%",
//       ...getColumnSearchProps("family"),
//       hidden: false,
//     },
//     {
//       title: "جنسیت",
//       dataIndex: "gender",
//       width: 20,
//       key: "gender",
//       editable: true,

//       sorter: {
//         compare: (a, b) => a.gender - b.gender,
//         multiple: 2,
//       },
//       ...getColumnSelectSearchProps("gender"),
//       render: (gender, item) => {
//         const index = item.key;
//         return (
//           <span>
//             {gender.length == 0 ? (
//               <Select
//                 // value={gender}
//                 style={{
//                   width: "90%",
//                 }}
//                 placeholder="Select a gender"
                
//                 optionFilterProp="children"
//                 // onChange={(e) => handle_change_gender(e, index)}
//                 // onSearch={onSearch}
//                 // filterOption={(input, option) =>
//                 //   (option?.label ?? "")
//                 //     .toLowerCase()
//                 //     .includes(input.toLowerCase())
//                 // }
//                 options={[
//                   { label: "همه", value: "" },
//                   { label: "مرد", value: "man" },
//                   { label: "زن", value: "woman" },
//                 ]}
//               />
//             ) : gender == "man" ? (
//               "مرد"
//             ) : (
//               "زن"
//             )
//             // <Select
//             //   value={gender}
//             //   style={{
//             //     width: "90%",
//             //   }}
//             //   placeholder="Select a person"
//             //   optionFilterProp="children"
//             //   onChange={(e) => handle_change_gender(e, index)}
//             //   onSearch={onSearch}
//             //   filterOption={(input, option) =>
//             //     (option?.label ?? "")
//             //       .toLowerCase()
//             //       .includes(input.toLowerCase())
//             //   }
//             //   options={genderOptions}
//             // />
//             }
//           </span>
//         );
//       },
//       // width: "30%",
//       hidden: false,
//     },
//     {
//       title: "ارز",
//       dataIndex: "currency",
//       width: 40,
//       key: "currency",
//       editable: true,
//       render: (record) => {
//         // console.log(record);
//         return (
//           <span>
//             {record.length == 0 ? (
//               <Input
//                 // style={{ width: 200 }}
//                 size="small"
//                 className="w-full p-1 bg-white border border-gray-200"
//                 placeholder={`Search currency`}
//                 // allowClear
//                 // enterButton="Search"
//                 onSearch={(value) => console.log(value)}
//               />
//             ) : (
//               record
//             )}
//           </span>
//         );
//       },
//       sorter: {
//         compare: (a, b) => a.currency - b.currency,
//         multiple: 1,
//       },
//       // width: "30%",
//       ...getColumnSearchProps("currency"),
//       hidden: false,
//     },
//     {
//       title: "نرخ ارز",
//       dataIndex: "currency2",
//       width: 40,
//       key: "currency2",
//       render: (record) => {
//         // console.log(record);
//         return (
//           <span>
//             {record.length == 0 ? (
//               <Input
//                 // style={{ width: 200 }}
//                 size="small"
//                 className="w-full p-1 bg-white border border-gray-200"
//                 placeholder={`Search currency`}
//                 // allowClear
//                 // enterButton="Search"
//                 onSearch={(value) => console.log(value)}
//               />
//             ) : (
//               record
//             )}
//           </span>
//         );
//       },
//       editable: true,
//       sorter: {
//         compare: (a, b) => a.currency2 - b.currency2,
//         multiple: 1,
//       },
//       // width: "30%",
//       ...getColumnSearchProps("currency2"),
//       hidden: false,
//     },
//     {
//       title: "نرخ ارز",
//       dataIndex: "tax",
//       width: 40,
//       key: "tax",
//       render: (record) => {
//         return (
//           <span>
//             {record.length == 0 ? (
//               <Input
//                 // style={{ width: 200 }}
//                 size="small"
//                 className="w-full p-1 bg-white border border-gray-200"
//                 placeholder={`Search currency`}
//                 // allowClear
//                 // enterButton="Search"
//                 onSearch={(value) => console.log(value)}
//               />
//             ) : (
//               record
//             )}
//           </span>
//         );
//       },
//       editable: true,
//       sorter: {
//         compare: (a, b) => a.tax - b.tax,
//         multiple: 1,
//       },
//       // width: "30%",
//       ...getColumnSearchProps("tax"),
//       hidden: false,
//     },
//     {
//       title: "operation",
//       dataIndex: "operation",
//       width: 40,
//       render: (_, record) =>
//         dataSource.length >= 1 ? (
//           <Popconfirm
//             title="Sure to delete?"
//             onConfirm={() => handleDelete(record.key)}
//           >
//             <a>Delete</a>
//           </Popconfirm>
//         ) : null,
//     },
//   ]);

//   const [dataSource, setDataSource] = useState([
//     {
//       key: "1",
//       name: "John Brown",
//       family: "98",
//       gender: "man",
//       currency: "70",
//       currency2: "324",
//       tax: "655",
//     },
//     {
//       key: "2",
//       name: "Jim Green",
//       family: "98",
//       gender: "women",
//       currency: "89",
//       currency2: "45",
//       tax: "652",
//     },
//     {
//       key: "3",
//       name: "Joe Black",
//       family: "98",
//       gender: "man",
//       currency: "70",
//       currency2: "345",
//       tax: "653",
//     },
//     {
//       key: "4",
//       name: "Jim Red",
//       family: "31",
//       gender: "women",
//       currency: "41",
//       currency2: "234",
//       tax: "654",
//     },
//     {
//       key: "5",
//       name: "joe Red",
//       family: "62",
//       gender: "man",
//       currency: "65",
//       currency2: "123",
//       tax: "6535",
//     },
//     {
//       key: "6",
//       name: "john parker",
//       family: "64",
//       gender: "women",
//       currency: "12",
//       currency2: "120",
//       tax: "65",
//     },
//     {
//       key: "7",
//       name: "diana Red",
//       family: "88",
//       gender: "women",
//       currency: "54",
//       currency2: "120",
//       tax: "65",
//     },
//     {
//       key: "8",
//       name: "Jim Red",
//       family: "87",
//       gender: "man",
//       currency: "89",
//       currency2: "120",
//       tax: 65,
//     },
//     {
//       key: "9",
//       name: "leo messi",
//       family: "54",
//       gender: "women",
//       currency: "87",
//       currency2: "120",
//       tax: "65",
//     },
//     {
//       key: "10",
//       name: "Joe Black",
//       family: "12",
//       gender: "man",
//       currency: "90",
//       currency2: "120",
//       tax: "65",
//     },
//   ]);

//   const onDragEnd = ({ active, over }) => {
//     if (active.id !== over?.id) {
//       setDataSource((previous) => {
//         const activeIndex = previous.findIndex((i) => i.key === active.id);
//         const overIndex = previous.findIndex((i) => i.key === over?.id);
//         return arrayMove(previous, activeIndex, overIndex);
//       });
//     }
//   };

//   const dragProps = {
//     onDragEnd(fromIndex, toIndex) {
//       const columnsCopy = [...columns];
//       const item = columnsCopy.splice(fromIndex, 1)[0];
//       columnsCopy.splice(toIndex, 0, item);
//       setColumns(columnsCopy);
//     },
//     nodeSelector: "th",
//   };

//   const showColumns = (columns) => {
//     const newColumns = columns.filter((item) => !item.hidden);
//     return newColumns;
//   };

//   const handleChangeStatusColumns = (value) => {
//     const listValues = columns.map((list) => ({ ...list, hidden: false }));
//     const changeStatusColumns = listValues
//       .filter((list) => value.includes(list.dataIndex))
//       .map((list) => ({ ...list, hidden: true }));

//     const result = listValues.map(
//       (list) =>
//         changeStatusColumns.find(
//           (column) => column.dataIndex === list.dataIndex
//         ) || list
//     );

//     setColumns(result);
//   };

//   const handleClickExportExcel = () => {
//     const excel = new Excel();
//     const newColumns = columns.filter((column) => column.dataIndex);
//     const removeExtraItem = newColumns.map((column) => {
//       return {
//         title: column.title,
//         dataIndex: column.dataIndex,
//         key: column.key,
//       };
//     });
//     console.log(removeExtraItem);
//     excel
//       .addSheet("test")
//       .addColumns(removeExtraItem)
//       .addDataSource(dataSource, {
//         str2Percent: true,
//       })

//       .saveAs(`Excel-${Math.floor(Math.random() * 100000)}.xlsx`);
//   };

//   const handleSave = (row) => {
//     const newData = [...dataSource];
//     const index = newData.findIndex((item) => row.key === item.key);
//     const item = newData[index];
//     newData.splice(index, 1, {
//       ...item,
//       ...row,
//     });
//     setDataSource(newData);
//   };

//   const new_columns = columns.map((col) => {
//     if (!col.editable) {
//       return col;
//     }
//     return {
//       ...col,
//       onCell: (record) => ({
//         record,
//         editable: col.editable,
//         dataIndex: col.dataIndex,
//         title: col.title,
//         handleSave,
//       }),
//     };
//   });

//   let column = showColumns(new_columns);

//   const handleResize =
//     (index) =>
//     (e, { size }) => {
//       setColumns((prevColumns) => {
//         const nextColumns = [...prevColumns];
//         nextColumns[index] = {
//           ...nextColumns[index],
//           width: size.width,
//         };
//         return nextColumns;
//       });
//     };

//   const columnsWithResizeHandlers = columns.map((col, index) => ({
//     ...col,
//     onHeaderCell: (column) => ({
//       width: column.width,
//       onResize: handleResize(index),
//     }),
//   }));

//   const handleSearchColumn = (record, value) => {
//     const searchData = record["dataIndex"]
//       .toString()
//       .toLowerCase()
//       .includes(value.toLowerCase());

//     console.log(searchData);
//     // console.log(dataSource.find(i => i.dataIndex == dataIndex))

//     // let filteredData = dataSource.filter(item => item.family === value);
//     // console.log(filteredData)
//     // dataSource.forEach((item) => {
//     //   const keys = Object.keys(item);
//     //   console.log(keys);
//     // });
//   };

//   return (
//     <Form>
//       <div className="flex justify-between  ">
//         {/* <button onClick={handleClickExportExcel}>Export</button> */}
//         <Button
//           type="primary"
//           className="bg-blue-500"
//           icon={<DownloadOutlined />}
//           // size={size}
//           onClick={handleClickExportExcel}
//         >
//           Export Excel
//         </Button>
//         <Form.Item className="w-96">
//           <MultiSelect
//             listItem={columns}
//             handleChange={handleChangeStatusColumns}
//           />
//         </Form.Item>
//         <Form.Item>
//           <Radio.Group value={size} onChange={handleSizeChange}>
//             <Radio.Button value="large">Large</Radio.Button>
//             <Radio.Button value="middle">Middle</Radio.Button>
//             <Radio.Button value="small">Small</Radio.Button>
//           </Radio.Group>
//         </Form.Item>
//       </div>
//       <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
//         <SortableContext
//           // rowKey array
//           items={dataSource.map((i) => i.key)}
//           strategy={verticalListSortingStrategy}
//         >
//           <ReactDragListView.DragColumn {...dragProps}>
//             <Table
//               components={{
//                 // header: {
//                 //   cell: ResizableTitle,
//                 // },
//                 body: {
//                   row: EditableRow,
//                   cell: EditableCell,
//                 },
//               }}
//               rowClassName={() => "editable-row"}
//               bordered
//               size={size}
//               rowKey="key"
//               // columns={showColumns(columnsWithResizeHandlers)}
//               columns={showColumns(new_columns)}
//               dataSource={dataSource}
//               // summary={() => (
//               //   <Table.Summary fixed="top">
//               //     <Table.Summary.Row>
//               //       {column.map((item) => {
//               //         return (
//               //           item.title !== "operation" && (
//               //             <Table.Summary.Cell>
//               //               <Input
//               //                 // style={{ width: 200 }}
//               //                 size="small"
//               //                 className="w-full p-1 bg-white border border-gray-200"
//               //                 placeholder={`جستجو ${item.title}`}
//               //                 // allowClear
//               //                 // enterButton="Search"
//               //                 onChange={
//               //                   (e) => getColumnSearchProps(item.dataIndex)
//               //                   // handleSearchColumn(item, e.target.value)
//               //                 }
//               //               />
//               //             </Table.Summary.Cell>
//               //           )
//               //         );
//               //       })}
//               //     </Table.Summary.Row>
//               //   </Table.Summary>
//               // )}
//               // sticky
//             />
//           </ReactDragListView.DragColumn>
//         </SortableContext>
//       </DndContext>
//     </Form>
//   );
// };

// export default Form_Five;

// const genderOptions = [
//   {
//     value: "man",
//     label: "مرد",
//   },
//   {
//     value: "women",
//     label: "زن",
//   },
// ];
