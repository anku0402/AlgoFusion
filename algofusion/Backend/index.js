const express = require('express');
const axios = require('axios');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const databaseUrl = process.env.DATABASE_URL;

const JWTSecret = process.env.JWTSECRET;

const User = require("./Models/Users");


mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(pw, salt);
    return secPassword;
}

const matchPassword = async (password, hp) => {
    const pwdCompare = await bcrypt.compare(password, hp);
    if (!pwdCompare) {
        return false;
    }
    return true;
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-control-Allow-Headers",
        "origin, x-Requested-with, Content-Type, Accept"
    );
    next();
})

app.get('/', (req, res) => {
    res.send("Welcome To AlgoFusion Backend");
})

app.post('/signup', async (req, res) => {
    try {
        const pa = req.body.password
        const p = await hashPassword(pa)

        const u = await User.findOne({ username: req.body.username })
        if (u) {
            return res.json({ success: false, message: "The Username has already been used" })
        }

        const user = new User();
        user.username = req.body.username
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.leetcode = req.body.leetcode
        user.codeforces = req.body.codeforces
        user.password = p;
        if (req.body.photo !== "") user.photo = req.body.photo
        await user.save()
        const token = jwt.sign({ username: req.body.username }, JWTSecret, { expiresIn: '7d' })
        return res.json({ success: true, token: token , user: user })
    } catch (error) {
        console.error('Error Signing Up', error);
        res.status(500).json({ message: 'An error occurred' });
    }
})


app.post('/signin', async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.token, JWTSecret)
        const user = await User.findOne({username: decoded.username})
        return res.json({ success: true, decoded: decoded, user: user });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.json({ success: false, error: 'JWT token has expired.' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.json({ success: false, error: 'Invalid JWT token.' });
        } else {
            return res.json({ success: false, error: 'Verification Failed' });
        }
    }
})

app.post('/login', async (req, res) => {
    try {
        const username = req.body.username
        const pass = req.body.password
        const user = await User.findOne({ username: username });
        if (!user) return res.json({ success: false, message: "Username or password not matched" })
        const resp = await matchPassword(pass,user.password);
        if(!resp){
            return res.json({success: false,message: "Username or password didn't matched"});
        }
        const token = jwt.sign({ username: user.username }, JWTSecret, { expiresIn: '7d' })
        return res.json({ success: true, token: token , user: user })
    } catch (error) {
        console.log(console.error)
        return res.json({success: false,message: "An Error Occured"})
    }
})

app.post('/algofusion/leetcode', async (req, res) => {
    try {
        const username = req.body.username
        // const parent = req.body.parent
        // const user = await User.findOne({username: parent})
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        const response = await axios.get(url);
        // if (!user.leetcodeHandlesSearched.includes(username)) {
        //     user.leetcodeHandlesSearched.push(username)
        //     await user.save();
        // }
        return res.json({ success: true, data: response.data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
})

app.post('/algofusion/codeforces/getpastcontests', async (req, res) => {
    try {
        const count = req.body.count
        const url = 'https://codeforces.com/api/contest.list'
        const response = await axios.get(url);
        const output = response.data.result;
        const filteredData = output.filter(item => item.phase === "FINISHED");
        const limitedArray = filteredData.slice(0, count);
        return res.json({ success: true, output: limitedArray })
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).json({ error: 'An error occurred' })
    }
})

app.post('/algofusion/codeforces/getproblems', async (req, res) => {
    try {
        const id = req.body.id
        const url = `https://codeforces.com/api/contest.standings?contestId=${id}&from=1&count=5&showUnofficial=true`
        const response = await axios.get(url);
        const output = response.data.result.problems;
        // console.log(output)
        return res.json({ success: true, output: output })
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).json({ error: 'An error occurred' })
    }
})

app.post('/algofusion/codeforces/getproblemset', async (req, res) => {
    try {
        const str = req.body.tags
        const url = `https://codeforces.com/api/problemset.problems?tags=${str}`
        const response = await axios.get(url);
        const problems = response.data.result.problems;
        const submissions = response.data.result.problemStatistics;
        return res.json({ success: true, problems: problems, submissions: submissions })
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).json({ error: 'An error occurred' })
    }
})

app.post('/algofusion/codeforces/searchuser', async (req, res) => {
    try {
        const str = req.body.handle
        const url = `https://codeforces.com/api/user.info?handles=${str}`
        const response = await axios.get(url);
        const url2 = `https://codeforces.com/api/user.rating?handle=${str}`
        const resp = await axios.get(url2)
        return res.json({ success: true, result: response.data.result, contests: resp.data.result })
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).json({ error: 'An error occurred' })
    }
})

app.post('/algofusion/codeforces/usercontests', async (req, res) => {
    try {
        const str = req.body.handle
        const url2 = `https://codeforces.com/api/user.rating?handle=${str}`
        const resp = await axios.get(url2)
        return res.json({ success: true, contests: resp.data.result })
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).json({ error: 'An error occurred' })
    }
})

app.post('/algofusion/codeforces/upcomingcontests', async (req, res) => {
    try {
        const url2 = `https://codeforces.com/api/contest.list`
        const resp = await axios.get(url2)
        const arr = resp.data.result;
        const filteredData = arr.filter((item) => item.phase === "BEFORE")
        return res.json({ success: true, contests: filteredData.reverse() })
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).json({ error: 'An error occurred' })
    }
})

app.listen(5000, () => {
    console.log("listening on port 5000");
})