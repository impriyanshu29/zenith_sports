const asyncHandler = (fn) =>async(req,res,next)=>{
    try{
        await fn(req,res,next)
    }catch(error){
            res.status(error.code||500).json({
                sucess:false,
                error:error.message||"Internal Erorr occured"
            })
    }
}

export default asyncHandler