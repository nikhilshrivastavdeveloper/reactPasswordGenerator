import { useState, useCallback, useEffect , useRef } from 'react';
import "./Passwordgenerator.css";

function Passwordgenerate() {

    const [length, setLength] = useState(8) //input length
    const [numberAllow, setNumberAllow] = useState(false)
    const [characterAllow, setCharacterAllow] = useState(false)
    const [password, setPassword] = useState("") // for input field password

    const reference = useRef(null)
    
    const passwordgenerator = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        
        if(numberAllow) str+="1234567890";
        if(characterAllow) str+="!@#$%&";

        for (let i = 1; i <= length; i++) {
            let index = Math.floor(Math.random() * str.length)
            pass += str[index]
        }

        setPassword(pass)
    }, [length, numberAllow, characterAllow])
    
    const copyText = () => {
        reference.current.select();
        navigator.clipboard.writeText(password)
    }

    useEffect(() => {
        passwordgenerator()
    },[length, numberAllow, characterAllow])

    return (
        <div id="main-container">
            <div id="password-box">
                <h1>Password Generator</h1>

                <div id="password-field-container">
                    <input type="text" placeholder="Password" readOnly value={password} ref={reference} />
                    <button id="copybtn" onClick={copyText}>copies</button>
                </div>

                <div id="criteria-container">
                    <div id="first-criteria-container" className="criteria">
                        <input
                            type="range"
                            min={8} 
                            max={50}
                            value={length}
                            onChange={(e) => {
                                setLength(Number(e.target.value))
                            }}
                        />
                        <label className="label">Length : {length}</label>
                    </div>

                    <div id="second-criteria-container" className="criteria">
                        <input type="checkbox" id="number"  onChange={() => setNumberAllow((prev) => !prev)} />
                        <label className="label" htmlFor="number">Numbers</label>
                    </div>

                    <div id="third-criteria-container" className="criteria">
                        <input type="checkbox" id="characters" onChange={() => setCharacterAllow((prev) => !prev)} />
                        <label className="label" htmlFor="characters">Characters</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Passwordgenerate;