//Javascript & jQuery will be here.
var correctAnswers = 0; // total correct answers
var wrongAnswers = 0; // total incorrect answers
var timedOut = 0; // this will handle how many times the game timed out
var gameClock = 30; // game start @ 30secs (30,000)
var clockIntervalID;
var questionItem = [];
var gameQuestion;
var allTrue;
var gameAnswer1 = $("#answer1").text("Random asnwer text here");
var gameAnswer2 = $("#answer2").text("Random asnwer text here");
var gameAnswer3 = $("#answer3").text("Random asnwer text here");
var gameAnswer4 = $("#answer4").text("Random asnwer text here");

var inGameAndInf = [ /*Array to hold all info. Once answered flip questionAsked to true*/ {
        name: "DNA Phases",
        question: "The third phase of mitosis is",
        goodAnswer: "Metaphase",
        possibleAnswers: ["Interphase","Metaphase","Prophase","Anaphase"],
        questionAsked: false
    },
    {
        name: "DNA Phases",
        question: "DNA is copied during a process called?",
        goodAnswer: "Replication",
        possibleAnswers: ["Translation", "Transcription", "Replication", "Transfusion"],
        questionAsked: false
    },
    {
        name: "Reproduction",
        question: "What is the process by which a single parent reproduces itself?",
        goodAnswer: "Asexual Reproduction",
        possibleAnswers: ["Histone", "Asexual Reproduction", "Sexual Reproduction", "Genetic Engineering"],
        questionAsked: false
    },
    {
        name: "DNA Phase",
        question: "The third phase of mitosis is",
        goodAnswer: "Metaphase",
        possibleAnswers: ["Anaphase", "Metaphase", "Prophase", "Telophase"],
        questionAsked: false 
    },
    {
        name: "DNA Phase",
        question: "Mutation is 'best' described as?",
        goodAnswer: "A change in DNA sequence",
        possibleAnswers: ["A nucleotide in the DNA molecule", "The formation of a DNA molecule", "A change in DNA sequence", "The structure of a DNA molecule"],
        questionAsked: false
    },
    {
        name: "Molecule",
        question: "What type of macromolecule are RNA & DNA apart of?",
        goodAnswer: "Nucleic Acid",
        possibleAnswers: ["Carbohydrate", "Lipid", "Nucleic Acid", "Protein"],
        questionAsked: false
    },
    {
        name: "Reproduction",
        question: "Asexual reproduction is also known as what?",
        goodAnswer: "Mitosis",
        possibleAnswers: ["Spontaneous Generation", "Meiosis", "Mitosis", "Bacterial Recombination"],
        questionAsked: false
    }
];

$().ready(function () {
    //load up the questions and answers.
    questionAndAnswers();
    //run the timer - reset the questions when timer runs out
    runClock();
    //check to see how the player did and log their totals to wins/losses/timeout (draws).
    winDrawLossCheck();
    endGame() //check to see if al games show true - build in ending code to take to last screen.

});

function questionAndAnswers() {
    //pick an item from the array list - loop over each item
    //fill in the answer fields with the scrambled answers.
    questionItem = inGameAndInf[Math.floor(Math.random() * inGameAndInf.length)]; //gets a random item from the array
    //check to see if the question has been asked (question asked is true) if so then ask another question.
    if (questionItem.questionAsked) {
        questionAndAnswers();
        return;
    }

    gameQuestion = questionItem.question; //item holding the possible answers
    gameAnswerItm = questionItem.possibleAnswers; //item of the possible answers and push into a solid item
    gameValidAns = questionItem.goodAnswer //store the correct answer
    allTrue = questionItem.questionAsked;

    $("#iTxtQuestion").text(gameQuestion); //tell the lable to take in this text and display it.

    for (var i = 0; i < 10; i++) { //array to scramble the information
        var alphaScramble = Math.floor(Math.random() * gameAnswerItm.length); //first scramble answers 1-8
        var betaScramble = Math.floor(Math.random() * gameAnswerItm.length); //second scramble answers 1-8
        var storedAlpha = gameAnswerItm[alphaScramble]; //hold on to the original information.
        gameAnswerItm[alphaScramble] = gameAnswerItm[betaScramble]; //
        gameAnswerItm[betaScramble] = storedAlpha;
    }

    //push information into the desired fields
    $("#answer1").text(gameAnswerItm[0]);
    $("#answer2").text(gameAnswerItm[1]);
    $("#answer3").text(gameAnswerItm[2]);
    $("#answer4").text(gameAnswerItm[3]);
    // set the boolean to T = true means it's answers and should not be asked again.
    allTrue = true;



};

function winDrawLossCheck() {
    /*check each answer for the correct answer or if the timer timed out.*/
    $(".cUserAnswer1").click(function () {
        //pull the value of what the user guessed out
        var userGuess = $(this).text(); //pull the value of what the user guessed out
        if (userGuess === gameValidAns) { //compare the information of what was guessed to the correct answer.
            correctAnswers += 1;
            alert("Nicely done, next question!");
            questionAndAnswers(); //load the next question
            gameClock = 31; //put on an extra second so that the clock reads correctly.
            return;
        }
        if (userGuess !== gameValidAns) {
            wrongAnswers += 1; //add one to the loss score
            alert("That is not the correct answer. You actually want " + gameValidAns + ".");
            questionAndAnswers(); //load the next question
            gameClock = 31; //put on an extra second so that the clock reads correctly.
            return;
        }
    });
}

function endGame() {

}

function runClock() {
    //ticket to reduce the clock by 1 second.
    clockIntervalID = setInterval(reduceTime, 1000);
}

function reduceTime() {
    gameClock--; //removes 1 from the time

    //clock display
    $("#iLblTimer").html(gameClock);

    //if the clock reaches 0 then...
    if (gameClock === 0) {
        alert("Sorry your time is up, on to the next question");
        timedOut += 1; //add one to the total times that the clock timed out.  This will be displayed at the end.
        stopClock(); //stop the clock from running
        //reset the gameboard:
        questionAndAnswers();
        gameClock = 31;
        runClock();
    }
}

function stopClock() {
    //stop the timer and reset the clock
    clearInterval(clockIntervalID);
}