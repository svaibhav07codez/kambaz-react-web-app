import { useState } from "react";
export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((_item, i) => i !== index));
    };
    return (
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>
            <button className="btn btn-success my-2" onClick={addElement}>Add Element</button>
            <ul>
                {array.map((item, index) => (
                    <li key={index}> {item}
                        <button className="btn btn-danger mx-3 my-1" onClick={() => deleteElement(index)}>
                            Delete</button>
                    </li>))}
            </ul>
            <hr />
        </div>);
}

