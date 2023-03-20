import React, {useRef, useState, useEffect } from "react";
import "./modal.css";
import Swal from "sweetalert2";

const colors = [
  {
    name: "Red",
    color: "#ff0000",
  },
  {
    name: "Blue",
    color: "#0000ff",
  },
  {
    name: "Green",
    color: "#00ff00",
  },
  {
    name: "Yellow",
    color: "#ffff00",
  },
  {
    name: "Purple",
    color: "#800080",
  },
  {
    name: "Orange",
    color: "#ff8e03",
  }
];

const ColorSelector = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [text, setText] = useState("");
  const [divs, setDivs] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const storedDivs = JSON.parse(localStorage.getItem("divs"));
    if (storedDivs) {
      setDivs(storedDivs);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("divs", JSON.stringify(divs));
  }, [divs]);

  const createNewDiv = () => {
    if (!selectedColor || !text) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Text ve Reng daxil edin",
      });
      return;
    }
  
    const newDiv = {
      backgroundColor: selectedColor,
      text: text,
    };

    const updatedDivs = [...divs, newDiv];
    setDivs(updatedDivs);
    localStorage.setItem("divs", JSON.stringify(updatedDivs));
    setText("");
    setSelectedColor(null);
  
    // setDivs([...divs, newDiv]);
    // setText("");
    // setSelectedColor(null);

    
  };
  
  

  const deleteDiv = (index) => {
    const updatedDivs = [...divs];
    updatedDivs.splice(index, 1);
    setDivs(updatedDivs);
  };

  return (
    <div className="colorDivs">
      {colors.map((color) => (
        <button
          key={color.name}
          className="m-2 w-25 rounded"
          style={{
            backgroundColor: color.color,
          }}
          onClick={() => setSelectedColor(color.color)}
        >
          {color.name}
        </button>
      ))}
      <input
        type="color"
        className="ms-2 w-25 rounded"
        value={text}
        onChange={(e) => setSelectedColor(e.target.value)}
        style={{
          backgroundColor: selectedColor,
        }}
      >
      </input>

      <input
        type="text"
        value={text}
        ref={inputRef}
        className="rounded m-2 w-50"
        placeholder="Enter Title"
        onChange={(e) => setText(e.target.value)}
        style={{
          backgroundColor: selectedColor,
        }}
      />

      <button  className="rounded m-2 btn btn-success" onClick={createNewDiv}>Add Title</button>

      {divs.map((div, index) => (
        <div
          key={index}
          className="rounded my-2 d-flex justify-content-between"
          style={{
            backgroundColor: div.backgroundColor,
            padding: "5px",
            color:"white"
          }}
        >
          {div.text}
          <button  className="rounded btn btn-dark" onClick={() => deleteDiv(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default ColorSelector;
