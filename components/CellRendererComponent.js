import React, { useRef, useEffect, Children, cloneElement } from "react";
import { View } from "react-native";

// this is a custom cell renderer for FlatList items,
// ensuring that each cell has a specific zIndex based on its id.
// to make sure the dropdown is on top

const CustomCellRenderer = ({ id, style, children, ...props }) => {
  //   console.log("CellRendererComponent.js 9, id", id);
  return (
    <View style={[style, { zIndex: (100 - id) * 1000 }]} {...props}>
      {children}
    </View>
  );
};

export default function CellRendererComponent({ item, children, ...props }) {
  const focusedInputRef = useRef(null);

  useEffect(() => {
    if (focusedInputRef.current) {
      focusedInputRef.current.focus();
    }
  }, []);

  const handleFocus = (event) => {
    focusedInputRef.current = event.target;
  };

  const handleBlur = () => {
    focusedInputRef.current = null;
  };

  // tracks which TextInput component is focused,
  // and restores focus to it when the component mounts
  const childrenWithFocusHandlers = Children.map(children, (child) => {
    // console.log("CellRendererComponent.js 35, child", child);
    if (child && child.type === "TextInput") {
      return cloneElement(child, {
        onFocus: handleFocus,
        onBlur: handleBlur,
      });
    }
    return child;
  });

  return (
    <CustomCellRenderer id={item.id} {...props}>
      {childrenWithFocusHandlers}
    </CustomCellRenderer>
  );
}
