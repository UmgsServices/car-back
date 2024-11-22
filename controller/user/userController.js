const bcrypt = require(`bcrypt`);
const express = require("express");
const User = require("../../model/User");
const Signup = require("../../model/Singup");
const jwt = require("jsonwebtoken");
const Singup = require("../../model/Singup");
require("dotenv").config();
const registerUser = async (req, res) => {
  try {
  const  firstname = req.body?.firstname;
  const  lastname = req.body?.lastname
  const   email= req.body?.email
  const  password = req.body?.password
  const  username = req.body?.username
  if(firstname&&lastname&&email&&password&&username){

  }else { console.log('err')
    return res.status(400).json({message:'incomplete data'})}
   const pwd = await bcrypt.hash(password, 10);
    const verifyDuplicate =
      await Singup.findOne({ email: email }).exec()||
       await Singup.findOne({ username: username }).exec()
     ;

    if (verifyDuplicate)
      return res.status(404).json({ message: "user already registered" });

    const result = await Singup.create({
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: pwd,
      email: email,
    });
    //or

    console.log(result);
    res.status(201).json({ message: `New user ${username} created!` });
  } catch (err) {
    console.error(err);
  }
};
const verifyUser = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const foundUser =
      username? await User.findOne({ username: username }).exec() :
      (await User.findOne({ email: email }).exec());

    if (foundUser) {
      const match = password
        ? await bcrypt.compare(password, foundUser.password)
        : false;
      const user = await Singup.findOne({ username: username }).exec();
      if (match) {
        res.status(200);
        const accessToken = jwt.sign(
          {
            username: foundUser.username,
            email: foundUser.email,
            role: foundUser.role,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "3600s" }
        );
        const refreshToken = jwt.sign(
          {
            username: foundUser.username,
            email: foundUser.email,
            role: foundUser.role,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        foundUser.refreshToken = refreshToken;
        const result = foundUser.save();
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.send({
          username: foundUser.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: foundUser.email,
          accessToken:accessToken,
          role: foundUser.role,
          message: "login succesful",
        });
      } else {
        res.status(401).send("401 User password eror");
        console.log(password)
      }
    } else {
      res.status(401).send("401 User eror");
      console.log(foundUser)
    }
  } catch (err) {}
};
const logOutUser = async (req, res) => {

  const cookies = req.cookies;
 
  if (!cookies?.jwt)
    return res.json({ message: "logout successfull" }).status(204);
  const refreshToken = cookies.jwt;
  
  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
 
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.json({ message: "logout successfull" }).status(204);
  }
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  foundUser.refreshToken = "";
  const result = foundUser.save();
  console.log('logout successfull')
  res.json({ message: "logout successfull" });
};
const getUser = async (req, res) => {
  const users=await User.find()
  const singups = await Signup.find()
const all=singups.map((data)=>{
const role=users.filter((user)=>data.username==user.username)[0]?.role
return {firstname:data?.firstname,lastname:data?.lastname,role:role,username:data?.username}
})
const manager=all.filter((item)=>item.role==3)
const admin = all.filter((item)=>item.role==2)
const edittor=all.filter((item)=>item.role==1)
const pending=all.filter((item)=>item.role==null)

  res.json({ admin: admin,edittor:edittor,manager:manager, all: all,pending:pending});
};
const acceptUser = async (req, res) => {
  const username = req.body.accept.username;
  const foundUser = await Singup.findOne({ username: username }).exec();
  const verifyDuplicate = await User.findOne({ username: username }).exec();
  if (foundUser && !verifyDuplicate) {
    const result = await User.create({
      username: foundUser.username,
      password: foundUser.password,
      email: foundUser.email,
    })
 
    return res.status(203).json({ message: "user aproved" });
  }
  if(verifyDuplicate) {
    verifyDuplicate.role=1
    const result=verifyDuplicate.save()
    return res.status(203).json({ message: "user aproved" });
  }
  res.status(401).json({ message: "encountered error" });
};
const revokeUser = async (req, res) => {
  console.log(req.body.accept.username)
  const username = req.body.accept.username;
  const foundUser = await User.findOne({ username: username }).exec();

  if (foundUser && foundUser.username != "Umgs") {
    const result =await User.deleteOne({ username: username });
    return res.status(203).json({ message: `user ${username} revoked"` });
  }
  res.status(401).json({ message: "encountered error" });
};
const handdleRole = async (req, res) => {
  const username = req.body?.accept?.username;
  if(username){
  const foundUser = await User.findOne({ username: username }).exec();

  if (foundUser && foundUser.username != "Umgs") {
    foundUser.role = req.body?.accept?.role;
    const result = foundUser.save();
    return res.status(203).json({ message: "role Assined" });
  }
}
  res.status(401).json({ message: "error" });
};
const handdleRefresh = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401);

  const refreshToken = cookies.jwt;

  try {
    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) res.status(401).send("forbidden");
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || !foundUser.username == decoded.username)
          return res.sendStatus(403); //invalid token
        const accessToken = jwt.sign(
          { username: decoded.username, email: decoded.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "3600s" }
        );
        res.json({accessToken:accessToken});
      }
    );
  } catch (err) {}
};
module.exports = {
  registerUser,
  verifyUser,
  getUser,
  logOutUser,
  handdleRefresh,
  acceptUser,
  handdleRole,
  revokeUser,
};
