import "./Question.css"

//functional component - must be Capitalised
function Question(props){
    //HTML goes in the return.

    function handleButtonClick(e) {
        // the value to be passed in we want to be what is written on the button that is pressed
        props.onChange(e.target.textContent)
        console.log(props.correct)
       }

        return(
            <div className="Question">
                <h1>{props.q}</h1>
            <div id="answers">
                    <h2 onClick={(e) => handleButtonClick(e,'value')}>{props.answers[0]}</h2>
                    <h2 onClick={(e) => handleButtonClick(e,'value')}>{props.answers[1]}</h2>
                    <h2 onClick={(e) => handleButtonClick(e,'value')}>{props.answers[2]}</h2>
                    <h2 onClick={(e) => handleButtonClick(e,'value')}>{props.answers[3]}</h2>
            </div>
        </div>
        )
    }


export default Question