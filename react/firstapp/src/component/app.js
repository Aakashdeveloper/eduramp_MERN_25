import {useState} from 'react';
import Header from './Header';

//jsx > Javascript XML
function App(){

    const [title] = useState('React Search App') 
    const [count,setCount] = useState(0)
    const [keyword,setKeyword] = useState('User Input Here')
    
    const handleCount = () => {
        setCount(count+1)
    }
    console.log("render")

    const handleChange = (event) => {
        console.log(event.target.value)
        setKeyword(event.target.value?event.target.value:"User Input Here")
    }

    return(
        <>
            <Header/>
            <h1>{title}</h1>
            <h2>{2*2}</h2>
            
            <div>
                <p>{count}</p>
                <button onClick={handleCount}>Counter</button>
                <div>
                    <input onChange={handleChange}/>
                    <div>{keyword}</div>
                </div>
                
            </div>
        </>
    )
}


export default App;



// const App = () => {
//     return(
//         <>
//             <h1>Hii</h1>
//             <h2>Test</h2>
//         </>
//     )
// }