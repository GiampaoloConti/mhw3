function onJsonTraslate(json){
    console.log('JSON Ricevuto');
    console.log(json);

    const results = document.querySelector('#box');

    results.textContent = json[0];

}

function Callfetch2(lingua_dest){

    const content = document.querySelector('#text').value;
    const testo = encodeURIComponent(content);
    const lingua = document.querySelector('#options').value; // prendiamo il contenuto di select
    

    const translate_request = translation_endpoint + '?q=' + testo + '&source=it&target=' + lingua;

    console.log(isoLangs[lingua_dest].name);

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '292ae27e60msh40971a170e38a78p14e270jsn2e20da44d65b',
            'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
        },
        body: JSON.stringify({
           from : lingua_dest,
            to : lingua,
            q: content 
               })
    };

    const results = document.querySelector('#lingua_decifrata');
    results.textContent = isoLangs[lingua_dest].name;
    
    fetch(translation_endpoint, options).then(onResponse).then(onJsonTraslate);

}

function onJsonText(json){
    console.log('JSON Ricevuto');
    console.log(json);

    const lingua_dest = json.detectedLangs[0].lang;

    Callfetch2(lingua_dest);

}

function translate(event){

    event.preventDefault();

    const content = document.querySelector('#text').value; // prendiamo il testo dal input text

    if(content){

        const testo = encodeURIComponent(content);
        console.log('Hai inserito ' + testo);
        const lingua = document.querySelector('#options').value; // prendiamo il contenuto di select
        console.log('Lingua in cui tradurre: ' + lingua);

        fetch(detection_endpoint + '/?text=' + encodeURIComponent(testo) + '&token=' + detection_token).then(onResponse).then(onJsonText);
        }
    }

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }

const translation_endpoint = 'https://rapid-translate-multi-traduction.p.rapidapi.com/t';
const detection_endpoint = 'https://api.dandelion.eu/datatxt/li/v1';
const detection_token = 'e6d3815072964da4929380c811038f34';

const form = document.querySelector('#submit');
form.addEventListener('click', translate);