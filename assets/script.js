//Possible values are 1-4
correctAnswer = [3,3,4,3,4]

//Questions and answers written out
questionText = ["Commonly used data types DO Not Include:","The condition in an if/else statement is enclosed with _______.","Arrays in Javascript can be used to store ________.","String values must be enclosed within _______ when being assigned to variables.","A very useful tool used during development and debugging for printing content to the debugger is:"]
button1Text = ["1. strings","1. quotes","1. numbers and strings","1. commas","1. Javascript"]
button2Text = ["2. booleans","2. curly brackets","2. other arrays","2. curly brackets","2. terminal/bash"]
button3Text = ["3. alerts","3. parenthesis","3. booleans","3. quotes","3. for loops"]
button4Text = ["4. numbers","4. square brackets","4. all of the above","4. parenthesis","4. console.log"]

//All of the selectors from the HTML tags
var container = document.querySelector(".container");
var button1 = document.querySelector("#button1")
var button2 = document.querySelector("#button2")
var button3 = document.querySelector("#button3")
var button4 = document.querySelector("#button4")
var h3Text = document.querySelector('h3')
var timeText = document.querySelector('.time')
var startButton = document.querySelector(".startButton")
var introSlide = document.querySelector(".introSlide")
var allDoneSlide = document.querySelector(".allDoneSlide")
var finalScoreList = document.querySelector(".finalScore")
var submitButton = document.querySelector(".submitButton")
var initials = document.querySelector(".initials")
var viewHighScore = document.querySelector(".viewHighScore")
var highscoresList = document.querySelector(".highscoresList")
var clearHighscoresButton = document.querySelector(".clear-highscores-button")
var containerBackHighscores = document.querySelector(".container-back-highscores")
var h5Text = document.querySelector(".h5Text")

//Initialize variables
count = 0
var secondsLeft = 60;
initialsArray = []
scoreArray = []
var wrongRight = document.createElement("wrongRight");
document.body.appendChild(wrongRight);


//---Functions and Listeners below--------------------------------
//Function that controls the seconds clock counter
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeText.textContent = "Time="+secondsLeft;

    if(secondsLeft === 0 || count===button1Text.length) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      finalScore();
    }
  }, 1000);
}

//When the start button is clicked, the questions begin and the timer starts
startButton.addEventListener("click", function() {
    introSlide.setAttribute("style","display:none")
    container.setAttribute("style","display:show")
    h3Text.setAttribute("style","display:show")
    setTime()
})

//When the "View High Scores" link is clicked at the top-left of the screen, the high scores are displayed
viewHighScore.addEventListener("click", function(event) {
    viewHighscores();
    h5Text.setAttribute("style","display:show;")
    containerBackHighscores.setAttribute("style","display:show;")
})

//Questions appear and you go through questions one by one
container.addEventListener("click", function(event) {
    var element = event.target;
    console.log(element)
  
    if (element.matches("#button"+correctAnswer[count])) {
        wrongRight.textContent = "Correct";
        wrongRight.setAttribute("style","color:grey;display:block;font-size:36px;margin-left:250px;margin-right:250px;margin-top:50px;padding:20px;border-top:4px solid;border-color:grey;")
    }
    else{
        wrongRight.textContent = "Wrong";
        wrongRight.setAttribute("style","color:grey;display:block;font-size:36px;margin-left:250px;margin-right:250px;margin-top:50px;padding:20px;border-top:4px solid;border-color:grey;")
        secondsLeft = secondsLeft-10
    }
      count = count+1
      console.log(count)
      console.log(button1Text[count])
      timeText.textContent = "Time="+secondsLeft

      //If at the end of the questions, do to the end listing the score.
      if(count===button1Text.length){
        finalScore()
      }
      else{
      h3Text.textContent = questionText[count]
      button1.textContent = button1Text[count]
      button2.textContent = button2Text[count]
      button3.textContent = button3Text[count]
      button4.textContent = button4Text[count]
      }
})

//Displays the All-Done Slide with the final score
function finalScore(){
    h3Text.setAttribute("style","display:none;")
    container.setAttribute("style","display:none;")
    wrongRight.setAttribute("style","display:none;")
    allDoneSlide.setAttribute("style","display:show;")
    finalScoreList.textContent="Your final score is: "+secondsLeft
}


//When the submit button is clicked to submit your initials
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    var initialsValue = initials.value.trim();
    console.log(initialsValue)
    initialsArray.push(initialsValue)
    scoreArray.push(secondsLeft)
    localStorage.setItem("initials", JSON.stringify(initialsArray));
    localStorage.setItem("score", JSON.stringify(scoreArray));
    viewHighscores()
    h5Text.setAttribute("style","display:show;")
    containerBackHighscores.setAttribute("style","display:show;")
})

//After the submit button is pressed, all of the highscores appear
function viewHighscores(){
    introSlide.setAttribute("style","display:none")
    container.setAttribute("style","display:none")
    h3Text.setAttribute("style","display:none")
    timeText.setAttribute("style","display:none")
    allDoneSlide.setAttribute("style","display:none")
    viewHighScore.setAttribute("style","display:none")
    var initialsSorted = JSON.parse(localStorage.getItem("initials"));
    var scoresSorted = JSON.parse(localStorage.getItem("score"));
    //This code was gathered from ChatGPT. It puts the initials and score arrays into an object, sorts the object from best to worst score, and then puts the individla arrays back into their original form, but sorted for score (highest to lowest).
    if(initialsSorted!==null){
        var combinedArray = initialsSorted.map((initial, index) => ({
            initial: initial,
            score: scoresSorted[index]
        }));
        combinedArray.sort((a, b) => b.score - a.score);
        initialsSorted = combinedArray.map(item => item.initial);
        scoresSorted = combinedArray.map(item => item.score);
    
        //End of code gathered from ChatGPT
        //Clear high scores if need to 
        var liElements=document.querySelectorAll("li")
        for(i=0;i<liElements.length;i++){
            liElements[i].parentNode.removeChild(liElements[i]);
        }
        console.log(scoresSorted)
        //Write new high scores
        for(i=0;i<scoresSorted.length;i++){
            var li = document.createElement("li")
            li.textContent = initialsSorted[i]+"-"+scoresSorted[i]
            highscoresList.appendChild(li)
        }
    }       
    highscoresList.setAttribute("style","display:show")
    
}

//When the "Clear High Scores" button is pressed, local storage is cleared and the arrays storing the initials and scores are re-initialized. 
clearHighscoresButton.addEventListener("click", function() {
    localStorage.clear();
    initialsArray = []
    scoreArray = []
    var liElements=document.querySelectorAll("li")
    for(i=0;i<liElements.length;i++){
        liElements[i].parentNode.removeChild(liElements[i]);
    }
    highscoresList.setAttribute("style","display:none")
})

//When the "Go Back" button is pressed, a bunch of information becomes hidden and the start slide becomes visible. 
var goBackButton = document.querySelector(".go-back-button")
goBackButton.addEventListener("click", function() {
    count=0;
    secondsLeft = 60;
    timeText.textContent="Time="+secondsLeft
    highscoresList.setAttribute("style","display:none")
    h5Text.setAttribute("style","display:none;")
    containerBackHighscores.setAttribute("style","display:none;")
    timeText.setAttribute("style","display:show")
    viewHighScore.setAttribute("style","display:show")
    introSlide.setAttribute("style","display:show")

})








