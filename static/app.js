const $guessForm = $('#guess-form');
const $guess = $('#guess');
const $submitGuessBtn = $('#submit-guess');
const $result = $('#result');
const $points = $('#points');
const $countDown = $('#count-down');
const $gameResetBtn = $('#reset-game');
let score = 0;

// Action when guess is submitted
$guessForm.on('submit', handleSubmit);

// When timer runs allow user to reset the game with a reset button
$gameResetBtn.on('click', resetGame);

// call endpoint to submit quess and get a result to determine new score
async function handleSubmit(evt) {
    evt.preventDefault();
    console.log($guessForm[0][0].value);
    let word = $guessForm[0][0].value;
    // $guessForm[0].reset();
    const response = await axios("/floyd", { params: { word: word } });
    console.log(response.data);
    // const response = await axios({
    //     url: '/floyd',
    //     method: "GET",
    // });
    // console.log(response.data.result);
    if (response.data.result === 'ok') {
        score += word.length;
        $points.text(score)
    } 
    $result.append(response.data.result);
    setTimeout(() => {
        $result.empty();
    }, 3000);
}

// count down from 60 and disable form when it hits zero.
function handleTimer () {
    let counter = 10
    let intervalId = setInterval(() => {
        if (counter >= 1) {
            counter--;
            $countDown.text(counter)
        } else {
            clearInterval(intervalId)
            // disable input and button
            disableForm(true)
            // show reset button
            $gameResetBtn.text('Reset Game')
            $gameResetBtn.removeClass('hidden')
        }
    }, 1000)
}

// handle form disabling
function disableForm (value) {
    $guess[0].value = ""
    $guess.attr('disabled', !!value);
    $submitGuessBtn.attr('disabled', !!value)
}

// all logics to reset game goes in here. This way, we are sure to know where to look for a reset or start up logic
function resetGame () {
    $gameResetBtn.addClass('hidden');
    disableForm(false);
    handleTimer();
    
}
