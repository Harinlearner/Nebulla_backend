import Register from '../models/UserModel.js';
export const create = async(req,res) => {
    try
    {
    const userDetails = new Register(req.body);
    const {email} = userDetails;
    const isExist= await Register.findOne({email})
    if(isExist)
    {
       return res.status(400).json({message:"user already exists"})
    }
    const newUser = await userDetails.save();
    console.log(userDetails);
    res.send(200).status(userDetails);
    }
    catch{
        res.status(500).json({message:"Internal server error"})
    }
}

export const fetch = async(req,res) =>{
try {
    const { email, password } = req.body;
    const user = await Register.findOne({ email ,password});

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json(user);
}
catch(error)
{
    console.log(error);
}
}
