import { useState } from "react";

let idCounter = 0;

export function generateID(prefix = "ui-id-") {
  idCounter = idCounter + 1;
  return `${prefix}${idCounter}`;
}

export default function useId(givenId = undefined) {
  const [id] = useState(() => {
    return givenId ?? generateID();
  });

  return id;
}
