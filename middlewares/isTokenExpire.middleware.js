import jwt from 'jsonwebtoken';
const isTokenExpire = (token) =>{
    try {
        const decodeedToken = jwt.decode(token);
        if(!decodeedToken||Date.now() >= decodeedToken.exp*1000){
            return true
        }
        else{
            return false
        }
    } catch (error) {
        return true
    }
}