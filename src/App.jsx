import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
const passowordRef=useRef(null)

  const [length, setLength] = useState(8);
  const [numberAllowed,setNmberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState("")

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()-_=+[]{}|;:,.<>?/`~\'"

    for(let i=0;i<length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
      
    }
     setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])
   
  const copyPassword=useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    passowordRef.current.select();
  },[password])
  


  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  
  return (
    <>
       <div className="main   w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-white h-32 bg-gray-700 ">
        <p>Password Generator</p>
        <div className="sub-container">
          <input
            type="text"
         
            value={password}
            className="outline-none w-full py-1 px-3 text-orange-500"
            placeholder="Password"
            readOnly
            ref={passowordRef}
          />
          <button onClick={copyPassword}>Copy</button>
        </div>
        <div className="inputs flex text-sm ">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>



            <div className="flex items-center gap-x-1 m-2">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNmberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Length</label>
            </div>


            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">Character</label>
            </div>


          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
