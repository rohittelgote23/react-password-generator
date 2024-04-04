import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumallowed] = useState(false);
  const [charAllowed, setCharallowed] = useState(false);

  const [password, setPassword] = useState("");

  const [savedPassword, setsavedPssword] = useState("");

  // ref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*;_+-=?/~";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length + 1);
    window.navigator.clipboard.writeText(password);
    localStorage.setItem("password-generate", password);
    setsavedPssword(localStorage.getItem('password-generate'))
  }, [password]);

  useEffect(() => {
    passwordGenerator();
    setsavedPssword(localStorage.getItem('password-generate'))
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-screen h-screen flex flex-col gap-y-4 justify-center items-center">
        <div className="flex flex-col gap-3 w-[95vw] max-w-md shadow-md rounded-lg py-[50px] px-6 text-orange-500 bg-gray-700">
          <h1 className="text-white text-3xl font-bold text-center my-3">
            Password Generator
          </h1>

          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-2 px-4 "
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPassword}
              className=" outline-none bg-blue-700 text-white px-4 py-0.5 shrink-0 "
            >
              Copy
            </button>
          </div>

          <div className="flex flex-wrap text-sm gap-x-2 gap-y-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={8}
                max={32}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length : {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                id="numberInput"
                onChange={() => {
                  setNumallowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput"> Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="charInput"
                onChange={() => {
                  setCharallowed((prev) => !prev);
                }}
              />
              <label htmlFor="charInput"> Characters</label>
            </div>
          </div>
        </div>
        <div className="w-[95vw] max-w-md shadow-md rounded-lg py-[50px] px-6 bg-gray-700">
          <h2 className="text-center text-white font-bold text-lg">Saved Password</h2>
          <p className="text-center text-orange-500">{savedPassword}</p>
        </div>
      </div>
    </>
  );
}

export default App;
