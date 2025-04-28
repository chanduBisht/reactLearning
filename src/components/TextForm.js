import React, {useState} from 'react'

export default function TextForm(props) {
   const [text, setText] = useState('Enter text here ...');

   const handleUpClick = (e) => {
    console.log("Uppercase was clicked");
    setText(text.toUpperCase());  
   }

   const handleOnChange = (e) => {
    console.log("On change");
    setText(e.target.value);
   }

  return (
    <>
        <h3>Enter the text to analyze : {text}</h3>
        <div className="mb-3">
            <label htmlFor="myBox" className="form-label"> For Testing</label>
            <textarea className="form-control" id="myBox" rows="8" value={text} onChange={handleOnChange}></textarea>
        </div>

        <button className='btn btn-primary' onClick={handleUpClick}>Convert to Uppercase</button>
    </>
  )
}
