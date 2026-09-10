"use client";

import { createContext, useContext, useMemo, useState, type Dispatch, type SetStateAction } from "react";

const TeachModeContext = createContext<{
  teach: boolean;
  setTeach: Dispatch<SetStateAction<boolean>>;
}>({
  teach: false,
  setTeach: () => undefined,
});

export function TeachModeProvider({ children }: { children: React.ReactNode }) {
  const [teach, setTeach] = useState(false);
  const value = useMemo(() => ({ teach, setTeach }), [teach]);
  return <TeachModeContext.Provider value={value}>{children}</TeachModeContext.Provider>;
}

export function useTeachMode() {
  return useContext(TeachModeContext);
}
