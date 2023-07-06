import { Tabs } from "antd";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import React, { useEffect, useRef, useState } from "react";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { css } from "@emotion/css"
import { useTabs, useTabsAction } from "../../../context/TabProviders";



const DraggableTabNode = ({ className, onActiveBarTransform, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isSorting,
  } = useSortable({
    id: props["data-node-key"],
  });
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "move",
  };
  useEffect(() => {
    if (!isSorting) {
      onActiveBarTransform("");
    } else if (className?.includes("ant-tabs-tab-active")) {
      onActiveBarTransform(css`
        .ant-tabs-ink-bar {
          transform: ${CSS.Transform.toString(transform)};
          transition: ${transition} !important;
        }
      `);
    }
  }, [className, isSorting, transform]);
  return React.cloneElement(props.children, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};
const Layout_Tab = () => {
  const initialItems = useTabs();
  const dispatch = useTabsAction()

  // console.log(initialItems);
  

  const [activeKey, setActiveKey] = useState(initialItems[0]?.key);
  const [items, setItems] = useState(initialItems);

  useEffect(()=>{
    let lastIndexInitItems = initialItems.length - 1
    // console.log(lastIndexInitItems);
    setActiveKey(initialItems[lastIndexInitItems]?.key)
    setItems(initialItems)
  },[initialItems])

  const newTabIndex = useRef(0);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };
  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: "New Tab",
      children: "Content of new Tab",
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
    dispatch({type:'restTab',value:newPanes})
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  const [className, setClassName] = useState("");
  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };
  return (
    <div>
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
        renderTabBar={(tabBarProps, DefaultTabBar) => (
          <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
            <SortableContext
              items={items.map((i) => i.key)}
              strategy={horizontalListSortingStrategy}
            >
              <DefaultTabBar {...tabBarProps}>
                {(node) => (
                  <DraggableTabNode
                    {...node.props}
                    key={node.key}
                    onActiveBarTransform={setClassName}
                  >
                    {node}
                  </DraggableTabNode>
                )}
              </DefaultTabBar>
            </SortableContext>
          </DndContext>
        )}
      />{" "}
    </div>
  );
};
export default Layout_Tab;
