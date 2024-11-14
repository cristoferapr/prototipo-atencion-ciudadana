import React, { useState, useEffect } from "react";
import Select from "react-select";

const AutoCompleteAddress = ({ onSelectAddress }) => {  // <-- Aquí estamos usando onSelectAddress como prop
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const fetchAddresses = async () => {
    if (inputValue.length < 3) {
      setOptions([]); // No hacer nada si el valor es menor a 3 caracteres
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&street=${inputValue}&city=Villa Alemana&country=Chile&bounded=1&viewbox=-71.44,-33.02,-71.32,-33.06`
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        const formattedOptions = data.map((item) => {
          const label = item.display_name || `${item.address.road || ""} ${item.address.house_number || ""}`.trim();
          return {
            label,
            value: {
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon),
            },
          };
        });
        setOptions(formattedOptions);
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.error("Error al obtener direcciones:", error);
      setOptions([]);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAddresses();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <div className="autocomplete-address">
      <label>Dirección:</label>
      <Select
        options={options}
        onInputChange={(value) => setInputValue(value)}
        onChange={(selectedOption) => {
          if (selectedOption) {
            onSelectAddress(selectedOption.value); // <-- Aquí estamos usando onSelectAddress
          }
        }}
        placeholder="Ingresa la calle y número..."
        noOptionsMessage={() => "No se encontraron direcciones"}
        isClearable
      />
    </div>
  );
};

export default AutoCompleteAddress;
