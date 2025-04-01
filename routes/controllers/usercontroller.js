import User from "../../models/user.js";
import bcrypt from "bcrypt";

export function createUser(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10); // Password hashed 10 times

    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword, // Use the hashed password
        role: req.body.role
    });

   

    user.save() // Fixed .save() usage
        .then((data) => {
            res.json({ message: "User created successfully" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed to create user", error: error.message });
        });
}
export function loginUser(req, res){
    const email=req.body.email;
    const password=req.body.password;

    User.findOne({email:email}).then(
        (user)=>{
            if(user==null){
                res.status(404).json({
                    message:"user not found"
                })
            }else{
                const isPasswordCorrect=bcrypt.compareSync(password,user.password)
                if(isPasswordCorrect){
                    res.json({
                        message:"login successfully"
                    })
                }else{
                    res.status(401).json({
                       message:"invalid password"
                    })
                }
                    
                }
            }
        
    )
}