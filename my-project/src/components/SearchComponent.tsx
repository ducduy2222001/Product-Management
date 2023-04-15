import { useRef } from "react";
import { Input } from "antd";
const { Search } = Input;
interface Props {
  onSearch: (e: any) => void;
}

function SearchComponent({ onSearch }: Props) {
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleFilterSearch = (e: any) => {
    if (!onSearch) return;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      onSearch(e);
    }, 300);
  };
  return (
    <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onChange={handleFilterSearch}
    />
  );
}

export default SearchComponent;
