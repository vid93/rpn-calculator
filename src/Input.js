import { useState } from "react"

const Input = () => {
    let operators = 0;
    let operands = 0;

    const [message, setMessage] = useState("")
    const [inputText, setInputText] = useState("")

    const clear = () => {
        setInputText("");
        setMessage(<div></div>)
    }

    const change = (e) => {
        setInputText(e.target.value)
    }

    const compute = () => {
        let input = inputText.split(',')
        let stack = []
        

        for(let i = 0; i < input.length; i++){
            if(inputText !== "" && !isNaN(input[i])){
                stack.push(input[i])
                operands++; 
            }else{
                let a = stack.pop()
                let b = stack.pop()
                if(input[i] === "+") {
                    stack.push(parseFloat(a) + parseFloat(b));
                    operators++;
                  } else if(input[i] === "-") {
                      stack.push(parseFloat(b) - parseInt(a));
                      operators++;
                  } else if(input[i] === "*") {
                      stack.push(parseFloat(a) * parseFloat(b));
                      operators++;
                  } else if(input[i] === "/") {
                      stack.push(parseFloat(b) / parseFloat(a));
                      operators++;
                  }
            }
        }
        if(isNaN(inputText)){
                setMessage(<div>Only numbers and arithmetic operators are valid!</div>);
        }
        if(operands > operators + 1){
            setMessage(<div>Something went wrong! Check the number of OPERANDS!</div>) 
        }else if(operands < operators) {
            setMessage(<div>Something went wrong! Check the number of OPERATORS!</div>)
        }
        
        if(inputText !== ""){
            if(stack.length === 1 && !isNaN(stack[0])) {
                    setInputText(`${inputText}=${stack[0]}`)
                    setMessage(<div></div>)
            }
        }else{
                setMessage(<div>You did not enter anything!</div>)
            }
        
    }        
    return(
        <div>
            <input onChange={change} value={inputText} className="field" placeholder="Enter the operand and operator: 2,6,5.5,4,*,-,+" />
            <button onClick={clear} className="button" >Clear</button>
            <button onClick={compute} className="button" >Compute</button>
                <br/>
            <div className="message">
                {message}
            </div>
        </div>
    )
}
export default Input;