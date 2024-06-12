import cryptoHash from 'crypto';
import User from '../models/user.model.js';
import { signUpValidator } from '../../user.validator.js';
import { formatZodError } from '../../errorMessage.js';

 function hashValue(value) {
     const hash = cryptoHash.createHash('sha256');
     hash.update(value);
     return hash.digest('hex');
 }
 
  function comparePasswords(inputPassword, hashedPassword) {
     return hashValue(inputPassword) === hashedPassword;
   }
 

export const signUp = async (req, res) => {
    const registerResults = signUpValidator.safeParse(req.body)
    if (!registerResults) {
        return res.status(400).json(formatZodError(registerResults.error.issues))
    }
    try {
        const {userName, phoneNumber, email}=req.body 
        const user = await User.findOne({for:[{email},{phoneNumber},{userName}]})
        if (user) {
            res.status(409).json({messaage:'User with email already exists'})
        } else {
            const {
                userName,
                password,
                email,
                phoneNumber,
                bio,
                gender
            } = req.body
   
            const encryption = hashValue(password, confirmPassword)
            const newUser = new User({
                userName,
                password: encryption,
                email,
                phoneNumber,
                bio,
                gender
            })
            await newUser.save()
            res.status(200).json({message: 'User registered succesfully',newUser})
            console.log('User registered succesfully',newUser);
        }
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log('INTERNAL SERVER ERROR',error.message)
    }
}


export const signIn = async (req, res, next) => {
    const loginResults = signInValidator.safeParse(req.body);
    if (!loginResults.success) {
        return res.status(400).json(formatZodError(loginResults.error.issues));
    } 
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User with email not found' });
        }
        
        const comparePass = comparePasswords(password, user.password);
        if (!comparePass) {
            console.log({ message: 'Password is incorrect' });
            return({})
        }
        
        
        const accessToken = generateToken(user._id, user.name);
        

        user.token = accessToken;
        
        console.log('Login   successful', user, accessToken);
        return res.json({ accessToken });
        

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('INTERNAL SERVER ERROR', error.message);
    }
};



export default {signUp, signIn};