// import { useSortable } from "@dnd-kit/sortable";
// import React, { useState } from "react";
// import { MenuOutlined } from "@ant-design/icons";
// import { CSS } from "@dnd-kit/utilities";
// import { Form } from "antd";

// const ReactDragListView = window["react-drag-listview"];
// const columns = [
//   {
//     key: "sort",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//   },
// ];

// const CostumeTable = ({ children, ...props }) => {
//   const EditableContext = React.createContext(null);
//   const [form] = Form.useForm();
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     setActivatorNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({
//     id: props["data-row-key"],
//   });
//   const style = {
//     ...props.style,
//     transform: CSS.Transform.toString(
//       transform && {
//         ...transform,
//         scaleY: 1,
//       }
//     ),
//     transition,
//     ...(isDragging
//       ? {
//           position: "relative",
//           zIndex: 9999,
//         }
//       : {}),
//   };
//   return (
//     <Form form={form} component={false}>
//     <EditableContext.Provider value={form}>
//     <tr {...props} ref={setNodeRef} style={style} {...attributes}>
//       {React.Children.map(children, (child) => {
//         if (child.key === "sort") {
//           return React.cloneElement(child, {
//             children: (
//               <MenuOutlined
//                 ref={setActivatorNodeRef}
//                 style={{
//                   touchAction: "none",
//                   cursor: "move",
//                 }}
//                 {...listeners}
//               />
//             ),
//           });
//         }
//         return child;
//       })}
//     </tr>
//     </EditableContext.Provider>
//   </Form>
   
//   );
// };

// export default CostumeTable;
