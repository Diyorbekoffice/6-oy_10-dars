import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Board() {
  const [boards, setBoards] = useState([]);
  const boardNameRef = useRef();
  const boardColorRef = useRef();
  const boardDescRef = useRef();

  const handleCreateBoard = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token mavjud emas!');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/boards/create`, {
        name: boardNameRef.current.value,
        color: boardColorRef.current.value,
        description: boardDescRef.current.value,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      console.log(response.data.board);
      fetchBoards();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBoards = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error('Token mavjud emas!');
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/boards/my-boards`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBoards(response.data.boards);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <form onSubmit={handleCreateBoard} className="flex flex-col space-y-4 w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Yangi Board Yarating</h2>
        <input
          type="text"
          ref={boardNameRef}
          placeholder="Board nomi"
          className="border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select ref={boardColorRef} className="border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="" disabled selected>Rangni tanlang</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="orange">Orange</option>
          <option value="blue">Blue</option>
        </select>
        <textarea
          ref={boardDescRef}
          placeholder="Tavsif"
          className="border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />
        <button type="submit" className="bg-blue-600 text-white font-semibold rounded-md p-4 hover:bg-blue-700 transition">
          Yasash
        </button>
      </form>

      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-lg font-semibold text-center text-white mb-4">Boardlar ro'yxati:</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.length > 0 ? (
            boards.map((board) => (
              <li key={board.id} className="flex flex-col p-6 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition">
                <h3 className="font-semibold text-lg text-gray-900">{board.name}</h3>
                <h4 className="text-sm text-gray-600">{board.color}</h4>
                <p className="text-gray-700">{board.description}</p>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-100">Hozircha boardlar mavjud emas.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Board;
