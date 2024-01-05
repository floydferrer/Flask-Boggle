const $guessForm = $('#guess-form');
const $result = $('#result');
let score = 0;

$guessForm.on('submit', async function handleSubmit(evt) {
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
        console.log(score)
    } 
    $result.append(response.data.result);
    setTimeout(() => {
        $result.empty();
    }, 3000);
});

// async function handleSubmit(evt) {
//     evt.preventDefault();
//     console.log($guessForm[0][0].value);
//     let word = $guessForm[0][0].value;
//     // $guessForm[0].reset();
//     const response = await axios("/floyd", { params: { word: word } });
//     // console.log(response.data.result);
//     // const response = await axios({
//     //     url: '/floyd',
//     //     method: "GET",
//     // });
//     console.log(response.data.result);
// }
