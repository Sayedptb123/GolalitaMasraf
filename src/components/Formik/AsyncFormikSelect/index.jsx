import FormikSelect from "../FormikSelect";
import { useQuery } from "react-query";

const AsyncFormikSelect = (props) => {
  const {
    name,
    label,
    placeholder,
    defaultValue,
    getOptions,
    single,
    queryName,
  } = props;

  const {
    isLoading,
    isError,
    data = [],
    error,
  } = useQuery([queryName], () => getOptions());

  return (
    <FormikSelect
      name={name}
      label={label}
      placeholder={placeholder}
      options={data}
      allowClear
      defaultValue={defaultValue}
      loading={isLoading}
      single={single}
    />
  );
};

export default AsyncFormikSelect;
