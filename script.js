let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
let sound = document.getElementById('sound')
let search = document.getElementById('search')
let result = document.getElementById('results')

search.addEventListener('click', () => {
    let input = document.getElementById('input')
    let word = input.value
    input.value = ""
    result.innerHTML = " "
    if (word === '') {
        return
    }
    // console.log(result.innerHTML);
    fetch(`${url}${word}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {

            console.log(data);
            let val = data[0].meanings[0].definitions[0].example
            if(!val) val = ''
            result.innerHTML = `<div class='output-word'>
            <h3 id='word'>${data[0].word}</h3>
                    <button id='sound-button'>
                    <i class='fa-solid fa-volume-high' onclick = 'playSound()'></i>
                    </button>
                    </div>
                    
                    <div class='details'>
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic} /</p>
                    </div>
                <p class='word-meaning'>
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                 ${val}
                </p>`
                sound.setAttribute('src' ,data[0].phonetics[0].audio);

        })
        .catch(() =>{
            results.innerHTML = `<h3> Results Not Found For This Word<h3>`
        })
})
function playSound(){
    sound.play()
}