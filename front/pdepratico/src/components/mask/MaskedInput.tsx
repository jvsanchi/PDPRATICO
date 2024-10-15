import React from "react";
import { Input } from "antd";
import { Controller } from "react-hook-form";

interface MaskedInputProps {
  control: any; // Defina um tipo mais específico se possível
  name: string;
  placeholder: string;
  mask: (value: string) => string; // Função de máscara
}

const MaskedInput: React.FC<MaskedInputProps> = ({
  control,
  name,
  placeholder,
  mask,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          placeholder={placeholder}
          onChange={(e) => {
            // Aplica a máscara ao valor
            field.onChange(mask(e.target.value));
          }}
        />
      )}
    />
  );
};

export default MaskedInput;
