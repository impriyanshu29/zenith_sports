class apiResponse{
    constructor(data,message='sucess',status){
        this.data = data;
        this.message = message;
        this.status = status;
        this.success = data < 400;
        this.error = data >= 400;

    }
}

export {apiResponse}