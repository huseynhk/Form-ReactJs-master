import React, {useState, useEffect} from "react";
import './modal.css';


const colors = [
    {
        name: "Red",
        color: "#ff0000"
    }, {
        name: "Blue",
        color: "#0000ff"
    }, {
        name: "Green",
        color: "#00ff00"
    }, {
        name: "Yellow",
        color: "#ffff00"
    }, {
        name: "Purple",
        color: "#800080"
    }
];

const ColorSelector = () => {
    const [selectedColor,
        setSelectedColor] = useState(null);
    const [text,
        setText] = useState("");
    const [divs,
        setDivs] = useState([]);

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
        if (!selectedColor) 
            return;
        
        const newDiv = {
            backgroundColor: selectedColor,
            text: text
        };

        setDivs([
            ...divs,
            newDiv
        ]);
        setText("");
        setSelectedColor(null);
    };

    const deleteDiv = (index) => {
        const updatedDivs = [...divs];
        updatedDivs.splice(index, 1);
        setDivs(updatedDivs);
    }

    return (
        <div className="colorDivs">
            {colors.map(color => (
                <button
                    key={color.name}
                    style={{
                    backgroundColor: color.color
                }}
                    onClick={() => setSelectedColor(color.color)}>
                    {color.name}
                </button>
            ))}
            <input
                type="color"
                value={text}
                onChange={e => setSelectedColor(e.target.value)}
                style={{
                backgroundColor: selectedColor
            }}></input>
            <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                style={{
                backgroundColor: selectedColor
            }}/>

            <button onClick={createNewDiv}>Create Div</button>

            {divs.map((div, index) => (
                <div
                    key={index}
                    style={{
                    backgroundColor: div.backgroundColor,
                    padding: "10px",
                    marginBottom: "10px"
                }}>
                    {div.text}
                    <button onClick={() => deleteDiv(index)}>Delete</button>
                </div>
            ))}

            
        </div>
    );
};

export default ColorSelector;
