import { useState } from "react";

export const useTogglePassword = () => {
  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible(prev => !prev);

  const inputType = visible ? "text" : "password";

  return { visible, toggle, inputType };
};
