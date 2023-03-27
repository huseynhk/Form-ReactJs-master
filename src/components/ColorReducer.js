import React, { useReducer, useEffect } from "react";
import "./modal.css";
import Swal from "sweetalert2";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

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

const initialState = {
  selectedColor: null,
  text: "",
  divs: [],
  editingIndex: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED_COLOR":
      return { ...state, selectedColor: action.payload };
    case "SET_TEXT":
      return { ...state, text: action.payload };
    case "SET_DIVS":
      return { ...state, divs: action.payload }; // divs arrayinin icinde olan info dispatch ile ...state-e update olunur
    case "SET_EDITING_INDEX":
      return { ...state, editingIndex: action.payload };
    case "RESET_FORM":
      return { ...state, selectedColor: null, text: "", editingIndex: null };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const ColorReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedColor, text, divs, editingIndex } = state;

  useEffect(() => {
    const storedDivs = JSON.parse(localStorage.getItem("divs"));
    if (storedDivs) {
      dispatch({ type: "SET_DIVS", payload: storedDivs });//localda olanlar "SET_DIVS"-e update olacaq
    }
  }, []);

  const createNewDiv = () => {
    if (!text || !selectedColor) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter text and select a color",
      });
      return;
    }
  
    const newDiv = {
      backgroundColor: selectedColor,
      text: text,
    };
  
    if (editingIndex === null) {
      const updatedDivs = [...divs, newDiv];//null olsa ancaq newDiv-i gotursun
      dispatch({ type: "SET_DIVS", payload: updatedDivs });//updatedDivs-i "SET_DIVS"-e set edirik
      localStorage.setItem("divs", JSON.stringify(updatedDivs));
    } else {
      const updatedDivs = [...divs];//null deyilse tam arrayi yai gelen deyer editin olan elementin deyeridise
      updatedDivs[editingIndex] = newDiv;// div-in icine newDiv-i atiriq
      dispatch({ type: "SET_DIVS", payload: updatedDivs });
      localStorage.setItem("divs", JSON.stringify(updatedDivs));
      dispatch({ type: "SET_EDITING_INDEX", payload: null });//edit olan deyer oldugu ucun index deyerin deyismirik
    }
    dispatch({ type: "RESET_FORM" });
  };
  


  const editDiv = (index) => {
    const divToEdit = divs[index];
    dispatch({ type: "SET_SELECTED_COLOR", payload: divToEdit.backgroundColor });
    dispatch({ type: "SET_TEXT", payload: divToEdit.text });
    dispatch({ type: "SET_EDITING_INDEX", payload: index });
    localStorage.setItem("divs", JSON.stringify(divs));
  };


  
  const deleteDiv = (index) => {
    Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
            const updatedDivs = [...divs];
            updatedDivs.splice(index, 1);
            dispatch({ type: "SET_DIVS", payload: updatedDivs });
            dispatch({ type: "SET_TEXT", payload: "" });
            dispatch({ type: "SET_SELECTED_COLOR", payload: "" });
            localStorage.setItem("divs", JSON.stringify(updatedDivs));
            Swal.fire("Deleted!", "Your div has been deleted.", "success");
        }
      });
  };
  

  return (
    <div className="colorDivs" >
    <h1 className="m-2 text-danger">Add Title</h1>
    {colors.map((color, index) => (
      <div
        key={index}
        className="colorButton "
        style={{ backgroundColor: color.color }}
        onClick={() =>
          dispatch({ type: "SET_SELECTED_COLOR", payload: color.color })
        }
      />
    ))}

    <input
      type="text"
      placeholder="Title"
      style={{backgroundColor: selectedColor}}
      value={state.text}
      className="w-50"
      onChange={(e) =>
        dispatch({ type: "SET_TEXT", payload: e.target.value })
      }
    />
    
    <input
      id="colorInput"
      type="color"
      className="mb-4"
      onChange={(e) =>
        dispatch({ type: "SET_SELECTED_COLOR", payload: e.target.value })
      }
    />
    <button className="btn btn-primary cs" onClick={createNewDiv}>
      {state.editingIndex === null ? "Create" : "Save"}
    </button>
    {colors.map((color, index) => (
      <div
        key={index}
        className="colorDiv"
        id="dvs"
        style={{backgroundColor: color.color}}
        onClick={() =>
          dispatch({ type: "SET_SELECTED_COLOR", payload: color.color })
        }
      >
        <span className="text">{color.name}</span>
      </div>
    ))}
    {state.divs.map((div, index) => (
      <div
        key={index}
        className="colorDiv"
        id="dvs2"
        style={{backgroundColor: div.backgroundColor}}
        onClick={() => editDiv(index)}
      >
        <span className="text">{div.text}</span>
        <p>
        <button className="btn btn-dark " onClick={() => editDiv(index)}>
        <FiEdit/>
        </button>
        <button className="btn btn-dark mx-2" onClick={() => deleteDiv(index)}>
        <BsFillTrashFill/>
        </button>
        </p>
      </div>
    ))}
  </div>
);




};

export default ColorReducer;
