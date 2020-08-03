

getLocationData = (location) => {

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data,error) => {
    
            if(data.error){
                message1.textContent = data.error;
                message2.textContent = "";
            }
            else{
                message1.textContent = "";
                message2.textContent = data.location.name;

            }

        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit',(e) => {

    e.preventDefault();
    const location = search.value;
    getLocationData(location)

    
})