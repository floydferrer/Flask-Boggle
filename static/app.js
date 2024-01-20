const $timer = $('#timer');
const $score = $('#score');
const $guessForm = $('#guess-form');
const $guessField = $('#guess-field');
const $submit = $('#submit');
const $restart = $('#restart');
const $result = $('#result');
const $words = $('#words');
const correctWords = [];
let score = 0;
let attempts = 0;

$guessForm.on('submit', async function handleSubmit(evt){
    evt.preventDefault();
    let word = $guessForm[0][0].value;
    $guessForm[0].reset();
    const response = await axios("/check", { params: { word: word } });
    if (response.data.result === 'ok' && correctWords.indexOf(word) === -1) {
        score += word.length;
        $score.text(`Score: ${score}`);
        correctWords.push(word);
        $words.append(`<li>${word}</li>`);
        $result.text(response.data.result);
        console.log(score);
    } else if (response.data.result === 'ok' && correctWords.indexOf(word) !== -1) {
        $result.text('Already found!');
    } else if (response.data.result !== 'ok') {
        $result.text(response.data.result);
    }
});

async function restart(){
    await axios("/restart");
}

$restart.on('click', restart)

async function scoreGame(){
    const response = await axios.post("/stats", { score: score });
    if (response.data.brokeRecord){
        $score.text(`New Record: ${score}`);
    } else {
        $score.text(`Final score: ${score}`);
    }
}

function handleTimer(){
    let counter = 10;
    let intervalId = setInterval(() => {
        if (counter >= 1) {
            counter --;
            $timer.text(`Timer: ${counter}`);
        } else {
            clearInterval(intervalId);
            disableForm(true);
            scoreGame();
        }
    }, 1000)
}

function disableForm(value) {
    $guessForm[0][0].value = "";
    $guessField.attr('disabled', value);
    $submit.attr('disabled', value);
}

handleTimer();