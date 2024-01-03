const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemon = require('nodemon');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const currentDate = new Date();

const app = express();

// MongoDB connection
mongoose.connect("mongodb+srv://adityalambat:KrW4Pwkju658EP7T@reactnativecluster.jvqr2hg.mongodb.net/HireMe?retryWrites=true&w=majority");

// Create a mongoose model for user registration
const users = require('./models/users')
const jobs = require('./models/jobs')

// Middleware for parsing JSON data
app.use(bodyParser.json());

// CORS setup
app.use(cors());

var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'mc222437@zealeducation.com',
    pass: 'Ad1301@anjajylmbt'
  }
};

// Importing IP
const IPURL = require('./ip')

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { fname, lname, email, mobile, password } = req.body;
    // Check if the username already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with a verification flag set to false
    const newUser = new users({ fname, lname, email, mobile, password: hashedPassword, isVerified: false });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token for email confirmation
    const token = jwt.sign({ email }, 'secret_key'); // Replace 'secret_key' with your secret

    // Send a confirmation email
    const transporter = nodemailer.createTransport(smtpConfig)

    const mailOptions = {
      from: 'aditya.lambat@gmail.com',
      to: email,
      subject: 'HireMe Email Verification',
      html: `<div>
      <img src="https://i.ibb.co/yWsDJDq/Hire-Me-Icon.png" alt="Hire-Me-Icon" style="border-radius: 50%">
      <div>
        <h3>Hey Aditya Lambat &#x1F60A;,</h3>
        <p>You’re almost ready to start connecting with the future. Simply click below &#x1F447 button; to verify your email
          address.</p>
        <a style="color: white; font-size: 15px;background-color: #27695F; border: 2px solid #27695F; padding: 4px 8px 4px 8px; border-radius: 5px; cursor: pointer; text-decoration: none;" href="http://192.168.222.121:8090/confirm/${token}">Verify</a>
  
      </div>
      <p>&copy; 2023 HireMe, All Right Reserved.</p>
    </div></a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Email confirmation failed' });
      } else {
        console.log('Email confirmation sent: ' + info.response);
        res.json({ message: 'Registration successful. Check your email for confirmation.' });
        // console.log(res.status)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Email confirmation route
app.get('/confirm/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { email } = jwt.verify(token, 'secret_key'); // Verify the token with your secret

    // Mark the user as verified
    await users.updateOne({ email }, { $set: { isVerified: true } });
    res.json({ message: 'Email Address Verified. You can now Login !!!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Email confirmation failed' });
  }
});

//Login Route

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database using their email
  const existUser = await users.findOne({ email });

  if (!existUser) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // // Verify the password
  const passwordMatch = await bcrypt.compare(password, existUser.password)
  // const hashedPassword = await bcrypt.hash(password, 10);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate a JWT token for authentication
  const token = jwt.sign({ email }, 'secret_key'); // Replace 'secret_key' with your secret
  res.status(200).json({ token });
});


app.get('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Find the user by email in the MongoDB database
    const user = await users.findOne({ email });

    if (user) {
      res.status(200).json(user); // Send the entire user object
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/jobs', async (req, res) => {
  try {

    const job = await jobs.find()
    console.log(job)
    res.json(job);
  } catch (error) {
    console.error('Error fetching Jobs data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

app.get('/jobdetails/:jid', async (req, res) => {
  try {
    const { jid } = req.params;
    // console.log("1st" + jid)
    const jobDetails = await jobs.findOne({ "jid": jid })
    console.log("2nd" + jobDetails)
    res.json(jobDetails);
  } catch (error) {
    console.error('Error fetching Jobs data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})


const PORT = 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
