import React, { useRef, useState } from "react";
import { FaPlus, FaTrash, FaPencilAlt, FaCheck } from "react-icons/fa";
const Todo = () => {
  const [value, setValue] = useState("");
  const [toDo, setToDo] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const focus = useRef(null);

  const addItem = (e) => {
    e.preventDefault();
    if (value !== "") {
      const todo = {
        text: value,
        id: toDo.length + 1,
      };
      setToDo([...toDo, todo]);
      setValue("");
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
    setIsChange(false);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addItem(e);
    }
  };
  const deleteItem = (id) => {
    const filtered = toDo.filter((item) => item.id !== id);
    setToDo(filtered);
    setIsChange(false);
  };
  const editText = (item) => {
    focus.current.focus();
    setValue(item.text);
    setIsChange(true);
  };

  const completeEdit = (id) => {
    const updatedToDo = toDo.map((item) => {
      if (item.id === id) {
        return {
          text: value,
        };
      }
      return item;
    });
    setToDo(updatedToDo);
    setIsChange(false);
    setValue("");
  };
  const deleteAll = () => {
    setToDo([]);
  };
  return (
    <div className="h-[100vh] flex flex-col items-center mt-10">
      <div className="h-[100px] w-2/4 flex justify-center relative">
        <input
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          ref={focus}
          value={value}
          className="border border-indigo-600 w-screen h-[50px] p-3 flex items-center justify-center text-xl outline-none rounded"
          type="text"
          placeholder="Add New Task"
        />
        <div className="absolute right-0 bg-violet-500 h-[50px] flex justify-center items-center p-3">
          <FaPlus
            onClick={addItem}
            className="cursor-pointer text-white "
            size={30}
          />
        </div>
      </div>
      {isCompleted && (
        <ul className="w-2/4">
          {toDo?.map((item) => (
            <li
              className="w-full bg-violet-500 text-white mb-5 p-3 relative text-xl rounded"
              id={item.id}
            >
              {item.text}
              {isChange ? (
                <FaCheck
                  className="absolute top-4 right-2 text-white cursor-pointer"
                  onClick={() => completeEdit(item.id)}
                  size={23}
                />
              ) : (
                <>
                  <FaPencilAlt
                    className="text-white absolute top-4 right-9 cursor-pointer"
                    onClick={() => editText(item)}
                    size={20}
                  />
                  <FaTrash
                    className="absolute top-4 right-2 text-white cursor-pointer"
                    onClick={() => deleteItem(item.id)}
                    size={20}
                  />
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={deleteAll}
        className="border border-indigo-600 w-1/6 text-2xl bg-violet-500 text-white p-2 mt-5 rounded"
      >
        Clear All
      </button>
    </div>
  );
};
export default Todo;
