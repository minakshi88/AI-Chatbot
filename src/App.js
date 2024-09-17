import React, { useState } from "react";
import axios from "axios";
import "./styles.css"


const App = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    e.preventDefault();
    setGeneratingAnswer(true);
    setAnswer("Loading...");

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyA5QtGaU7t1rT7gsU54KBQOZ9LwR42Zs9o",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
      setAnswer("Something went wrong. Try again.");
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="main">
      <div className="container">
        <h1 className="title">AI ChatBot</h1>
        <form onSubmit={generateAnswer} className="form">
          <textarea
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something..."
            className="textarea"
          />
          <button
            type="submit"
            className={`button ${generatingAnswer ? "disabled" : ""}`}
            disabled={generatingAnswer}
          >
            {generatingAnswer ? "Loading..." : "Submit"}
          </button>
        </form>
        <div className="response">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
