import jwt, {decode} from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.auth_secret;


const auth = async(req,res,next) => 
{
    try {
        const need = req.headers["authorization"]
        const token = need.split(" ")[1];
        let decodedData = jwt.verify(token, secret);
        if(decodedData?.id)
        {
            req.userId = decodedData.id;
            next();
        }
        else {
            return res.sendStatus(403);
        }
        
    } catch (error) {
        console.log(error);
    }
}
export default auth;