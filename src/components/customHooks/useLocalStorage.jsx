import React, { useEffect, useState } from "react";

const getSavedValue = (key, intitalValue) => {
  const savedValue = JSON.parse(localStorage.getItem(key));
  if (savedValue) return savedValue;
  if (intitalValue instanceof Function) return intitalValue();
  return intitalValue;
};

export default function useLocalStorage(key, intitalValue) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, intitalValue);
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
}
