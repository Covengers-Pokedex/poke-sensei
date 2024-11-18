import { createContext, ReactNode, useContext } from 'react';

interface SearchMenuContentProps {
  searchMenuOff: () => void;
  children: ReactNode;
}
interface SearchMenuContentContextValue {
  searchMenuOff: () => void;
}

const SearchMenuContentContext = createContext<SearchMenuContentContextValue | undefined>(undefined);

export default function SearchMenuContent({ searchMenuOff, children }: SearchMenuContentProps) {
  return (
    <SearchMenuContentContext.Provider value={{ searchMenuOff }}>
      <div className="border rounded-md p-3 bg-white">{children}</div>
    </SearchMenuContentContext.Provider>
  );
}

export const useSearchMenuOff = () => {
  const context = useContext(SearchMenuContentContext);

  if (!context) {
    throw new Error('반드시 DraggableMenu의 자식 컴포넌트로 렌더링 되는 요소에서만 사용해야 합니다.');
  }

  return context;
};
