function Validation (Email){
    if(values.email===""){
        error.email="Name should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email="Email didn't match "
    }
    else{
        error.email=""
    }
}