function validate() {
    const input = document.getElementById('email');
    const regex = new RegExp('[a-z]+@[a-z]+.[a-z]+');

    inputElement.addEventListener('change', validateEmailField);

    function validateEmailField(e){
        if(regex.test(input.value)){
            input.className = '';
        } else {
            input.className = 'error'
        }
    }
}