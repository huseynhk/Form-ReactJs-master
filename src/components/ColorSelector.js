import React, { useRef, useState, useEffect } from "react";
import "./modal.css";
import Swal from "sweetalert2";

const colors = [
  {
    name: "Blue",
    color: "#0000ff",
  },
  {
    name: "Red",
    color: "#ff0000",
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
  },
];

const ColorSelector = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [text, setText] = useState("");
  const [divs, setDivs] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const storedDivs = JSON.parse(localStorage.getItem("divs"));
    if (storedDivs) {
      setDivs(storedDivs);
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, []);

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

    if (editingIndex === null) {
      const updatedDivs = [...divs, newDiv];
      setDivs(updatedDivs);
      localStorage.setItem("divs", JSON.stringify(updatedDivs));
    } else {
      const updatedDivs = [...divs];
      updatedDivs[editingIndex] = newDiv; //gelen deyer bos deyilse arrya daxil etsin
      setDivs(updatedDivs);
      localStorage.setItem("divs", JSON.stringify(updatedDivs));
      setEditingIndex(null);
    }

    setText("");
    setSelectedColor(null);
  };

  const editDiv = (index) => {
    const divToEdit = divs[index];
    setSelectedColor(divToEdit.backgroundColor);
    setText(divToEdit.text);
    setEditingIndex(index);
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
      ></input>

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

      <button className="rounded m-2 btn btn-success" onClick={createNewDiv}>
        Add Title
      </button>

      {divs.map((div, index) => (
        <div
          key={index}
          className="rounded my-2 d-flex  justify-content-between align-items-center"
          style={{
            backgroundColor: div.backgroundColor,
            padding: "5px",
            color: "gray",
          }}
        >
          <h4 className="ms-1">{div.text}</h4>

          <p className="mt-3">
            <button
              className="rounded btn btn-dark"
              onClick={() => editDiv(index)}
            >
              Update
            </button>
            <button
              className="rounded btn btn-dark mx-1"
              onClick={() => deleteDiv(index)}
            >
              Remove
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ColorSelector;
