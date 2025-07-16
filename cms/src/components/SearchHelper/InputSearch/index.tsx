import Icon from "@ant-design/icons";
import { Input, InputProps } from "antd";
import { IconSearch } from "assets/icon";
import classNames from "classnames";
import { useDebouncedCallback } from "use-debounce";

interface IProps extends InputProps {
  onSearchKeyword: (value: string) => void;
  placeholder: string;
  debounceTime?: number;
  sizeWidth?: number;
}

function InputSearch({
  onSearchKeyword,
  placeholder,
  debounceTime = 500,
  className,
  sizeWidth = 244,
  ...otherProps
}: IProps) {
  const debounced = useDebouncedCallback((value) => {
    onSearchKeyword(value);
  }, debounceTime);

  return (
    <Input
      className={classNames(`input w-${sizeWidth}`, [className])}
      onChange={(e) => debounced(e.target.value)}
      placeholder={placeholder}
      prefix={<Icon component={() => <IconSearch />} />}
      {...otherProps}
    />
  );
}

export default InputSearch;
