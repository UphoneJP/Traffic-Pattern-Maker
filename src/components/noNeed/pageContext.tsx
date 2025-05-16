import { createContext, useState } from "react";

interface pageContextType {
  selectedPage: string;
  setSelectedPage: (name: string) => void
}
const PageContext = createContext<pageContextType>({
  selectedPage: 'home',
  setSelectedPage: () => {}
})

interface ChildrenType {
  children: React.ReactNode
}
const PageProvider: React.FC<ChildrenType> = ({ children }: ChildrenType) => {
  const [selectedPage, setSelectedPage] = useState('home')

  return (
    <PageContext.Provider value={{ selectedPage, setSelectedPage }}>
      {children}
    </PageContext.Provider>
  )
}
export {PageContext, PageProvider}

