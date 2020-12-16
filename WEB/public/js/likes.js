let like = document.querySelector('#btn-like')
let dislike = document.querySelector('#btn-dislike')
let input1 = document.querySelector('#input1')
let input2 = document.querySelector('#input2')


like.addEventListener('click', () =>{
    res.value(input1.value = parseInt(input1.value) + 1);
});