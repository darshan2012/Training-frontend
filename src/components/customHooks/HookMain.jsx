import React from "react";
import useLocalStorage from "./useLocalStorage";

function HookMain() {
  const [name, setName] = useLocalStorage("name", "");
  return (
    <>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
    </>
  );
}

export default HookMain;
