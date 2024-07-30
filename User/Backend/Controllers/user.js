const asyncErrorWrapper = require("express-async-handler")
const User = require("../Models/user")
const Book = require("../Models/book")
const bcrypt = require("bcryptjs")




const private = async (req, res) => {
    if (req.session.user) {
        const user = await User.findById(req.session.user.id)
        // console.log(user)
      res.json(user);

    } else {
      res.status(401).send('Unauthorized');
    }
  };

const register = asyncErrorWrapper (async  (req,res,next) => {

    try {
        
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({ username : username, password: hashedPassword });
        await newUser.save();
        req.session.user = { id: newUser._id, username: newUser.username };
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.log(err)
        newUser.destroy();
        res.status(500).send('Error registering user');
    }
  

})

const login = asyncErrorWrapper(async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            console.log("User not found");
            return res.status(400).send('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            console.log("Password does not match");
            return res.status(400).send('Passwoed does not match');
        }
        req.session.user = { id: user._id, username: user.username };
        res.send('Logged in successfully');
    } catch (err) {
        console.log("Error logging in:", err);
        res.status(500).send('Error logging in');
    }
});


const logout =  (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send('Could not log out.');
      }
      res.clearCookie('connect.sid');
      res.send('Logged out');
    });
  };


  const addBookToReadList = asyncErrorWrapper(async (req, res, next) => {

    const { slug } = req.params
    const { activeUser } = req.body;
    // console.log("d")

    const book = await Book.findOne({ slug : slug })

    const user = await User.findById(activeUser._id)

    if (!user.readList.includes(book._id)) {

        user.readList.push(book._id)
        user.readListLength = user.readList.length
        await user.save();
    }

    else {
        const index = user.readList.indexOf(book._id)
        user.readList.splice(index, 1)
        user.readListLength = user.readList.length
        await user.save();
    }

    const status = user.readList.includes(book._id)

    return res.status(200).json({
        success: true,
        book: book,
        user: user,
        status: status
    })

})


const readListPage = asyncErrorWrapper(async (req, res, next) => {
    // console.log("d")
    const user = await User.findById(req.session.user.id)
    // console.log(user.username)
    const readList = []

    for (let index = 0; index < user.readList.length; index++) {

        var book = await Book.findById(user.readList[index]).populate("author")
        if(book != null){
            readList.push(book)
        }
        if(book== null){
            user.readList.splice(index, 1)
            index--;
            await user.save();
        }
        // readList.push(story)
        // user.readListLength = readList.length

    }
    // console.log(readList)
    return res.status(200).json({
        success: true,
        data: readList
    })

})



module.exports ={
    private,
    register,
    login,
    logout,
    addBookToReadList,
    readListPage
}