const $guessForm = $('#guess-form');

$guessForm.on('submit', async handleSubmit(evt){
    evt.preventDefault();
    console.log($guessForm[0][0].value);
    let word = $guessForm[0][0].value;
    // $guessForm[0].reset();
    const response = await axios("/floyd", { params: { word: word } });
    // console.log(response.data.result);
    // const response = await axios({
    //     url: '/floyd',
    //     method: "GET",
    // });
    console.log(response.data.result);
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