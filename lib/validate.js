const login_validate = (values)=>{
    const errors = {}

    if(!values.email){
        errors.email ="Required";
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = 'Invalid email address';
    }

    if(!values.password){
        errors.password ="Required";
    }else if(values.password.length < 8 || values.password.length > 20){
        errors.password ="Must be Grater than 8 and less than 20 characters long";
    }else if(values.password.includes(" ")){
        errors.password ="Invalid Password";
    }

    return errors;
}

const register_validate = (values)=>{
    const errors = {}

    if(!values.username){
        errors.username ="Required";
    }else if(values.username.includes(" ")){
        errors.username = 'Invalid username address';
    }

    if(!values.email){
        errors.email ="Required";
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = 'Invalid email address';
    }

    if(!values.password){
        errors.password ="Required";
    }else if(values.password.length < 8 || values.password.length > 20){
        errors.password ="Must be Grater than 8 and less than 20 characters long";
    }else if(values.password.includes(" ")){
        errors.password ="Invalid Password";
    }
    if(!values.cpassword){
        errors.cpassword ="Required";
    }else if(values.password !== values.cpassword){
        errors.cpassword ="Password Not Match";
    }

    return errors;
}

export {login_validate, register_validate};