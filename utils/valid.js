const valid = (name, email, password, cf_password) => {
    if(!name || !email || !password)
    return 'Veuillez remplir tous les champs.'

    if(!validateEmail(email))
    return 'Email Invalide.'

    if(password.length < 6)
    return 'Le mot de passe doit être au moins de 6 caractères.'

    if(password !== cf_password)
    return 'Confirmer que le mot de passe ne correspond pas.'
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default valid