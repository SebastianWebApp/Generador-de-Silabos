import { useState, useRef } from "react";
import { TextArea, SoloLetras, SoloNumeros, ConDecimal, Fecha } from "./Inputs";

type ColumnaConfig = {
  tipo: string;
  size?: string;
  align?: string;
  valor?: string;
  tipo_input?: string;
  opciones?: string[];
  file?: string;
  width?: number;
  color_texto?: string;
  color_fondo?: string;
  borde_top?: boolean;
  borde_bottom?: boolean;
  borde_left?: boolean;
  borde_right?: boolean;
};

type Props = {
  preview?: boolean;
  elementos_configuraciones: ColumnaConfig;
  configuracion?: (
    tipo?: string,
    align?: string,
    size?: string,
    value?: string,
    tipo_input?: string,
    opciones?: string[],
    file?: string
  ) => void;
};

export function TextoComponent(props: Props) {
  const { preview = false, configuracion, elementos_configuraciones } = props;

  const [alignment, setAlignment] = useState<string>(
    elementos_configuraciones?.align ?? "text-left"
  );
  const [size, setSize] = useState<string>(
    elementos_configuraciones?.size ?? "text-2xl font-bold"
  );
  const [textValue, setTextValue] = useState<string>(
    elementos_configuraciones?.valor ?? ""
  );

  const handleAlignment = (valor: string) => {
    setAlignment(valor);
    configuracion?.("texto", valor, size, textValue, "", [], "");
  };

  const handleSize = (valor: string) => {
    setSize(valor);
    configuracion?.("texto", alignment, valor, textValue, "", [], "");
  };

  const handleText = (valor: string) => {
    setTextValue(valor);
    configuracion?.("texto", alignment, size, valor, "", [], "");
  };
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Dividir texto en trozos (texto normal y links)
  const parts = textValue.split(urlRegex);
  return (
    <div className="flex flex-col gap-2">
      {!preview && (
        <>
          <h2>Alineación de texto</h2>
          <select
            className="custom-select mt-2 cursor-pointer"
            style={{ marginBottom: "10px" }}
            onChange={(e) => handleAlignment(e.target.value)}
            value={alignment}
          >
            <option value="text-left">Izquierda</option>
            <option value="text-center">Centro</option>
            <option value="text-right">Derecha</option>
          </select>

          <h2>Tamaño del texto</h2>
          <select
            className="custom-select mt-2 cursor-pointer"
            style={{ marginBottom: "10px" }}
            onChange={(e) => handleSize(e.target.value)}
            value={size}
          >
            <option value="text-2xl font-bold">Título</option>
            <option value="text-xl font-bold">Subtítulo</option>
            <option value="text-xl">Párrafo</option>
          </select>

          <textarea
            className="custom-input mt-2"
            style={{ height: "150px" }}
            placeholder="Escribe aquí..."
            value={textValue}
            onChange={(e) => handleText(e.target.value)}
          ></textarea>
        </>
      )}

      <p
        className={`${alignment} ${size}`}
        style={{
          whiteSpace: "pre-wrap",
          color: elementos_configuraciones.color_texto,
        }}
      >
        {parts.map((part, index) =>
          urlRegex.test(part) ? (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              {part}
            </a>
          ) : (
            part
          )
        )}
      </p>
    </div>
  );
}

export function InputComponent(props: Props) {
  const { preview = false, configuracion, elementos_configuraciones } = props;

  const [alignment, setAlignment] = useState<string>(
    elementos_configuraciones?.align ?? "text-left"
  );
  const [size, setSize] = useState<string>(
    elementos_configuraciones?.size ?? "text-2xl font-bold"
  );
  const [dataType, setDataType] = useState<string>(
    elementos_configuraciones?.tipo_input ?? "texto_general"
  );
  const [textValue, setTextValue] = useState<string>(
    elementos_configuraciones?.valor ?? ""
  );

  const handleAlignment = (valor: string) => {
    setAlignment(valor);
    configuracion?.("input", valor, size, textValue, dataType, [], "");
  };

  const handleSize = (valor: string) => {
    setSize(valor);
    configuracion?.("input", alignment, valor, textValue, dataType, [], "");
  };

  const handleDataType = (valor: string) => {
    setDataType(valor);
    setTextValue("");
    configuracion?.("input", alignment, size, textValue, valor, [], "");
  };

  const handleText = (valor: string) => {
    setTextValue(valor);
    configuracion?.("input", alignment, size, valor, dataType, [], "");
  };

  const renderInputByType = () => {
    switch (dataType) {
      case "texto_general":
        return (
          <TextArea
            size={size}
            alignment={alignment}
            color_texto={elementos_configuraciones.color_texto}
            onChange={(valor) => handleText(valor)}
            valor_escrito={textValue}
          />
        );
      case "only_letters":
        return (
          <SoloLetras
            size={size}
            alignment={alignment}
            color_texto={elementos_configuraciones.color_texto}
            onChange={(valor) => handleText(valor)}
            valor_escrito={textValue}
          />
        );
      case "numeric_no_decimal":
        return (
          <SoloNumeros
            size={size}
            alignment={alignment}
            color_texto={elementos_configuraciones.color_texto}
            onChange={(valor) => handleText(valor)}
            valor_escrito={textValue}
          />
        );
      case "numeric_with_decimal":
        return (
          <ConDecimal
            size={size}
            alignment={alignment}
            color_texto={elementos_configuraciones.color_texto}
            onChange={(valor) => handleText(valor)}
            valor_escrito={textValue}
          />
        );
      case "date":
        return (
          <Fecha
            size={size}
            alignment={alignment}
            color_texto={elementos_configuraciones.color_texto}
            onChange={(valor) => handleText(valor)}
            valor_escrito={textValue}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {!preview && (
        <>
          <h2>Alineación de texto</h2>
          <select
            className="custom-select mt-2 cursor-pointer"
            style={{ marginBottom: "10px" }}
            onChange={(e) => handleAlignment(e.target.value)}
            value={alignment}
          >
            <option value="text-left">Izquierda</option>
            <option value="text-center">Centro</option>
            <option value="text-right">Derecha</option>
          </select>

          <h2>Tamaño del texto</h2>
          <select
            className="custom-select mt-2 cursor-pointer"
            style={{ marginBottom: "10px" }}
            onChange={(e) => handleSize(e.target.value)}
            value={size}
          >
            <option value="text-2xl font-bold">Título</option>
            <option value="text-xl font-bold">Subtítulo</option>
            <option value="text-xl">Párrafo</option>
          </select>

          <h2>Tipo de dato</h2>
          <select
            className="custom-select mt-2 cursor-pointer"
            style={{ marginBottom: "10px" }}
            onChange={(e) => handleDataType(e.target.value)}
            value={dataType}
          >
            <option value="texto_general">Texto en General</option>
            <option value="numeric_no_decimal">Numérico sin decimal</option>
            <option value="numeric_with_decimal">Numérico con decimal</option>
            <option value="only_letters">Solo Letras</option>
            <option value="date">Fecha</option>
          </select>
        </>
      )}
      {renderInputByType()}
    </div>
  );
}

export function SelectComponent(props: Props) {
  const { preview = false, configuracion, elementos_configuraciones } = props;
  const [alignment, setAlignment] = useState<string>(
    elementos_configuraciones?.align ?? "text-left"
  );
  const [size, setSize] = useState<string>(
    elementos_configuraciones?.size ?? "text-2xl font-bold"
  );
  const [options, setOptions] = useState<string[]>(
    elementos_configuraciones?.opciones ?? ["Opción 1", "Opción 2"]
  );

  const [textValue, setTextValue] = useState<string>(
    elementos_configuraciones?.valor ?? ""
  );

  const handleAlignment = (valor: string) => {
    setAlignment(valor);
    configuracion?.("select", valor, size, textValue, "", options, "");
  };

  const handleSize = (valor: string) => {
    setSize(valor);
    configuracion?.("select", alignment, valor, textValue, "", options, "");
  };

  const handleOptions = (valor: string[]) => {
    setOptions(valor);
    configuracion?.("select", alignment, size, textValue, "", valor, "");
  };

  const handleText = (valor: string) => {
    setTextValue(valor);
    configuracion?.("select", alignment, size, valor, "", options, "");
  };

  return (
    <div className="flex flex-col gap-2">
      {!preview && (
        <>
          <h2>Alineación de texto</h2>
          <select
            className="custom-select mt-2 cursor-pointer"
            style={{ marginBottom: "10px" }}
            onChange={(e) => handleAlignment(e.target.value)}
            value={alignment}
          >
            <option value="text-left">Izquierda</option>
            <option value="text-center">Centro</option>
            <option value="text-right">Derecha</option>
          </select>

          <h2>Tamaño del texto</h2>
          <select
            className="custom-select mt-2 cursor-pointer"
            style={{ marginBottom: "10px" }}
            onChange={(e) => handleSize(e.target.value)}
            value={size}
          >
            <option value="text-2xl font-bold">Título</option>
            <option value="text-xl font-bold">Subtítulo</option>
            <option value="text-xl">Párrafo</option>
          </select>

          <h2>Ingrese opciones</h2>
          <input
            type="text"
            placeholder="Ingresa opciones separadas por punto y coma..."
            className="border rounded-md p-2 mt-2"
            onChange={(e) => {
              const inputOptions = e.currentTarget.value.split(";");
              handleOptions(inputOptions);
            }}
            value={options.join(";")} // aquí unimos el arreglo con ;
          />

          <h2>Resultado</h2>
        </>
      )}
      <select
        className={`border rounded-md p-2 mt-2 ${alignment} ${size}`}
        style={{ color: elementos_configuraciones.color_texto }}
        onChange={(e) => handleText(e.target.value)}
        value={textValue}
      >
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CheckboxComponent(props: Props) {
  const { preview = false, configuracion, elementos_configuraciones } = props;
  const [alignment, setAlignment] = useState<string>(
    elementos_configuraciones?.align ?? "text-left"
  );
  const [size, setSize] = useState<string>(
    elementos_configuraciones?.size ?? "text-2xl font-bold"
  );

  const [lista, setLista] = useState<string[]>(
    elementos_configuraciones?.opciones?.map((opc) => `${opc}|false`) ?? [
      "nombre|false",
    ]
  );

  // Agregar nuevo checkbox
  const agregarNuevo = () => {
    handleLista([...lista, "|false"]);
  };

  // Manejar cambio de texto
  const handleChangeTexto = (index: number, texto: string) => {
    const newList = [...lista];
    const [, seleccionado] = newList[index].split("|");
    newList[index] = `${texto}|${seleccionado}`;
    handleLista(newList);
  };

  // Manejar cambio de checkbox
  const handleChangeSeleccionado = (index: number, checked: boolean) => {
    const newList = [...lista];
    const [texto] = newList[index].split("|");
    newList[index] = `${texto}|${checked}`;
    handleLista(newList);
  };

  const handleAlignment = (valor: string) => {
    setAlignment(valor);

    configuracion?.("checkbox", valor, size, "", "", lista, "");
  };

  const handleSize = (valor: string) => {
    setSize(valor);

    configuracion?.("checkbox", alignment, valor, "", "", lista, "");
  };

  const handleLista = (valor: string[]) => {
    setLista(valor);

    configuracion?.("checkbox", alignment, size, "", "", valor, "");
  };

  return (
    <div className="flex flex-col gap-2">
      {!preview && (
        <>
          <h2>Alineación de texto</h2>
          <select
            className="custom-select mt-2 cursor-pointer"
            style={{ marginBottom: "10px" }}
            onChange={(e) => handleAlignment(e.target.value)}
            value={alignment}
          >
            <option value="text-left">Izquierda</option>
            <option value="text-center">Centro</option>
            <option value="text-right">Derecha</option>
          </select>

          <h2>Tamaño del texto</h2>
          <select
            className="custom-select mt-2 cursor-pointer"
            style={{ marginBottom: "10px" }}
            onChange={(e) => handleSize(e.target.value)}
            value={size}
          >
            <option value="text-2xl font-bold">Título</option>
            <option value="text-xl font-bold">Subtítulo</option>
            <option value="text-xl">Párrafo</option>
          </select>

          <button
            className="custom-select mt-2 cursor-pointer"
            onClick={agregarNuevo}
          >
            Agregar nuevo checkbox
          </button>
        </>
      )}

      {lista.map((item, index) => {
        const [texto, seleccionado] = item.split("|");
        return (
          <div className="checkbox-radio-container" key={index}>
            <input
              type="checkbox"
              className="mt-2"
              style={{ width: "18px" }}
              checked={seleccionado === "true"}
              onChange={(e) =>
                handleChangeSeleccionado(index, e.currentTarget.checked)
              }
            />

            <textarea
              className={`custom-textarea mt-2 ${alignment} ${size}`}
              style={{
                height: "100px",
                color: elementos_configuraciones.color_texto,
              }}
              placeholder="Escribe aquí..."
              value={texto}
              onChange={(e) => handleChangeTexto(index, e.currentTarget.value)}
            />

            {!preview && (
              <>
                <button
                  onClick={() => {
                    const newList = lista.filter((_, i) => i !== index);
                    handleLista(newList);
                  }}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function RadioComponent(props: Props) {
  const { preview = false, configuracion, elementos_configuraciones } = props;
  const [alignment, setAlignment] = useState<string>(
    elementos_configuraciones?.align ?? "text-left"
  );
  const [size, setSize] = useState<string>(
    elementos_configuraciones?.size ?? "text-2xl font-bold"
  );

  const [lista, setLista] = useState<string[]>(
    elementos_configuraciones?.opciones?.map((opc) => `${opc}|false`) ?? [
      "nombre|false",
    ]
  );

  // Agregar nuevo checkbox
  const agregarNuevo = () => {
    handleLista([...lista, "|false"]);
  };

  // Manejar cambio de texto
  const handleChangeTexto = (index: number, texto: string) => {
    const newList = [...lista];
    const [, seleccionado] = newList[index].split("|");
    newList[index] = `${texto}|${seleccionado}`;
    handleLista(newList);
  };

  // Manejar cambio de checkbox
  const handleChangeSeleccionado = (index: number, checked: boolean) => {
    const newList = [...lista];
    const [texto] = newList[index].split("|");
    newList[index] = `${texto}|${checked}`;
    handleLista(newList);
  };

  const name: string = `radio-group-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  const handleAlignment = (valor: string) => {
    setAlignment(valor);
    configuracion?.("radio", valor, size, "", "", lista, "");
  };

  const handleSize = (valor: string) => {
    setSize(valor);
    configuracion?.("radio", alignment, valor, "", "", lista, "");
  };

  const handleLista = (valor: string[]) => {
    setLista(valor);
    configuracion?.("radio", alignment, size, "", "", valor, "");
  };

  return (
    <div className="flex flex-col gap-2">
      {!preview && (
        <>
          <h2>Alineación de texto</h2>
          <select
            className="custom-select mt-2 cursor-pointer"
            style={{ marginBottom: "10px" }}
            onChange={(e) => handleAlignment(e.target.value)}
            value={alignment}
          >
            <option value="text-left">Izquierda</option>
            <option value="text-center">Centro</option>
            <option value="text-right">Derecha</option>
          </select>

          <h2>Tamaño del texto</h2>
          <select
            className="custom-select mt-2 cursor-pointer"
            style={{ marginBottom: "10px" }}
            onChange={(e) => handleSize(e.target.value)}
            value={size}
          >
            <option value="text-2xl font-bold">Título</option>
            <option value="text-xl font-bold">Subtítulo</option>
            <option value="text-xl">Párrafo</option>
          </select>

          <button
            className="custom-select mt-2 cursor-pointer"
            onClick={agregarNuevo}
          >
            Agregar nuevo radio
          </button>
        </>
      )}

      {lista.map((item, index) => {
        const [texto, seleccionado] = item.split("|");
        return (
          <div className="checkbox-radio-container" key={index}>
            <input
              type="radio"
              className="mt-2"
              name={`radio-group-${name}`}
              style={{ width: "18px" }}
              checked={seleccionado === "true"}
              onChange={(e) =>
                handleChangeSeleccionado(index, e.currentTarget.checked)
              }
            />

            <textarea
              className={`custom-textarea mt-2 ${alignment} ${size}`}
              style={{
                height: "100px",
                color: elementos_configuraciones.color_texto,
              }}
              placeholder="Escribe aquí..."
              value={texto}
              onChange={(e) => handleChangeTexto(index, e.currentTarget.value)}
            />

            {!preview && (
              <>
                <button
                  onClick={() => {
                    const newList = lista.filter((_, i) => i !== index);
                    handleLista(newList);
                  }}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function ImageComponent(props: Props) {
  const { configuracion, elementos_configuraciones } = props;
  const [image, setImage] = useState<string>(
    elementos_configuraciones?.file || ""
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImage = (file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const valor = reader.result as string; // Base64 listo

      setImage(valor); // Ahora sí tiene valor
      configuracion?.("image", "", "", "", "", [], valor);
    };
    reader.onerror = () => {
      alert("Error al leer el archivo:");
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Input oculto */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          handleImage(file);
        }}
      />

      {/* Imagen o placeholder clickable */}
      <div onClick={handleClick} className="cursor-pointer">
        {image ? (
          <img
            src={image}
            alt="Vista previa"
            className="mt-2 rounded"
            style={{ width: "100%" }}
          />
        ) : (
          <div className="flex items-center justify-center bg-gray-200 text-gray-600 rounded shadow">
            📷 Subir imagen
          </div>
        )}
      </div>
    </div>
  );
}
