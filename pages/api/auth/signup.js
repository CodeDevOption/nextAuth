import MongoConnection from '../../../database/conn'
import User from '../../../model/schema'
import { hash } from 'bcryptjs';
const handler = async (req,res)=>{
    MongoConnection().catch((error) => res.json({message:'Database Connection Filed'}));

    //only allowed POST Requests 
    if(req.method === "POST"){
        if(!req.body) return res.status(404).json({message:"Don't have form data"});
        const {username,email,password} = req.body;
        //check duplicate user
        const checkExisting = await User.findOne({email});
        if(checkExisting) return res.status(422).json({message:"User Already Exists!"});

        //hash password
        const create = new User({username,email,password:await hash(password,12)});
        create.save().then(()=>{
            return res.status(201).json({status:true,user:create});
        }).catch((error)=>{
            return res.status(404).json({error});
        })        

    }else{
        res.status(500).json({message:'HTTP method not valid only POST Accepted'})
    }

}

export default handler;