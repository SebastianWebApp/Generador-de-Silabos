import { useState } from "react";
import { Letras, Numeros, Decimal } from "./Validaciones";

type Props = {
  size?: string;
  alignment?: string;
  color_texto?: string;
  onChange: (value: string) => void;
  valor_escrito: string;
};

export function TextArea(props: Props) {
  const { size, alignment, color_texto, onChange, valor_escrito } = props;

  return (
    <textarea
      className={`custom-textarea mt-2 ${alignment} ${size}`}
      style={{ height: "100px", color: color_texto }}
      placeholder="Escribe aquí..."
      onChange={(e) => onChange(e.target.value)}
      value={valor_escrito || ""}
    />
  );
}

export function SoloLetras(props: Props) {
  const { size, alignment, color_texto, onChange, valor_escrito } = props;

  const [value, setValue] = useState(valor_escrito || "");

  const handleChange = (valor: string) => {
    if (Letras(valor)) {
      setValue(valor);
      onChange(valor);
    }
  };

  return (
    <textarea
      className={`custom-textarea mt-2 ${alignment} ${size}`}
      style={{ height: "100px", color: color_texto }}
      placeholder="Escribe aquí..."
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}

export function SoloNumeros(props: Props) {
  const { size, alignment, color_texto, onChange, valor_escrito } = props;
  const [value, setValue] = useState(valor_escrito || "");
  const handleChange = (valor: string) => {
    if (Numeros(valor)) {
      setValue(valor);
      onChange(valor);
    }
  };

  return (
    <input
      className={`custom-textarea mt-2 ${alignment} ${size}`}
      style={{ color: color_texto }}
      placeholder="Escribe aquí..."
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}

export function ConDecimal(props: Props) {
  const { size, alignment, color_texto, onChange, valor_escrito } = props;
  const [value, setValue] = useState(valor_escrito || "");
  const handleChange = (valor: string) => {
    if (Decimal(valor)) {
      setValue(valor);
      onChange(valor);
    }
  };

  return (
    <input
      className={`custom-textarea mt-2 ${alignment} ${size}`}
      style={{ color: color_texto }}
      placeholder="Escribe aquí..."
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}

export function Fecha(props: Props) {
  const { size, alignment, color_texto, onChange, valor_escrito } = props;

  return (
    <input
      type="date"
      className={`custom-textarea mt-2 ${alignment} ${size}`}
      style={{ color: color_texto }}
      onChange={(e) => onChange(e.target.value)}
      value={valor_escrito || ""}
    />
  );
}
