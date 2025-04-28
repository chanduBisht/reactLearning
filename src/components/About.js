import React from 'react'

export default function About() {
  return (
    <div>
       <h1>About</h1>
       <p>This is a text analyzer app that allows you to analyze text and get the word count, character count, and other text statistics.</p>

       <h2>How to use</h2>
       <ol>
        <li>Enter text in the text area</li>
        <li>Click the button to analyze the text</li>
        <li>See the results in the text area</li>
       </ol>            

       <h2>Features</h2>
       <ul>
        <li>Word count</li>
        <li>Character count</li>
        <li>Sentence count</li>
        <li>Paragraph count</li>
        <li>Average word length</li>
       </ul>

       <h2>Technologies Used</h2>
       <ul>
        <li>React</li>
        <li>Node.js</li>
        <li>Express</li>
        <li>MongoDB</li>
       </ul>

       <h2>Contact</h2>
       <p>If you have any questions or feedback, please contact us at <a href="mailto:contact@textanalyzer.com">contact@textanalyzer.com</a>.</p>
    </div>
  )
}
