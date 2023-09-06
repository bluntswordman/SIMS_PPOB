import { useCallback, useState, ChangeEvent } from "react";

const useForm = <T extends Record<string | number, any>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
    },
    [setValues]
  );

  return [values, handleChange] as const;
};

export default useForm;
