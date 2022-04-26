/* eslint-disable react/style-prop-object */
import Arrows from "./components/Arrows";
import TextBox from "./components/TextBox";
import axios from 'axios'
import Button from "./components/Button";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";

const App = () => {
  const [inputLanguage, setInputLanguage] = useState("Select Language");
  const [outputLanguage, setOutputLanguage] = useState("Select Language");
  const [showModal, setShowModal] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState('');

  console.log("input language", inputLanguage);
  const getlanguages = async () => {
    const response = await axios('http://localhost:8000/languages')
    setLanguages(response.data)
    
  };

  const translate = async () => {
    const data = {textToTranslate, outputLanguage, inputLanguage}
    const response = await axios('http://localhost:8000/translate', {params:data})
    setTranslatedText(response.data)
      
  };


  useEffect(() => {
    getlanguages();
    console.log("use effect is firing")
  }, []);

  

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  };

  return (
    <div className="app">
      {!showModal && 
        <>
          <TextBox
            selectedLanguage={inputLanguage}
            style="input"
            setShowModal={setShowModal}
            textToTranslate={textToTranslate}
            setTextToTranslate={setTextToTranslate}
            setTranslatedText={setTranslatedText}
          />
          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>
          <TextBox
            selectedLanguage={outputLanguage}
            style="output"
            setShowModal={setShowModal}
            translatedText={translatedText}
            
          />
          <div className="button-container" onClick={translate}>
            <Button/>
          </div>
        </>
      }

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          languages={languages}
          chosenLanguage={
            showModal === "input" ? inputLanguage : outputLanguage
          }
          setChosenLanguage={
            showModal === "input" ? setInputLanguage : setOutputLanguage
          }
        />
      )}
    </div>
  );
};
export default App;
