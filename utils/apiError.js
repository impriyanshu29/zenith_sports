import express from 'express'

class apiError extends Error{
    constructor(
        statusCode,
        message = "Somethinfg Went wrong ",
        errors =[],
        stack = ""
    ){
        super(message)
        this.statuscode= statusCode
        this.errors = errors;
        this.data = null;
        this.message = message;
        this.sucess = false;

        if(stack){
            this.stack = stack;

        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default apiError;