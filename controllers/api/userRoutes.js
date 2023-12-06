const router = require('express').Router();
const { User } = require('../../models');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

// Create a transporter for Nodemailer using OAuth2
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  }
});

// GET route to fetch all users 
router.get('/', async (req, res) => {
  try {
    const usersData = await User.findAll();

    // Serialize data if necessary
    const users = usersData.map(user => user.get({ plain: true }));

    // Send response
    res.json(users);
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ message: 'Internal Server Error', error: err });
  }
});

// GET route to fetch a user by user_id
router.get('/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id;
    const userData = await User.findByPk(userId);

    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Serialize data if necessary
    const user = userData.get({ plain: true });

    // Send response
    res.json(user);
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ message: 'Internal Server Error', error: err });
  }
});


// Login route: authenticates a user
router.post('/login', async (req, res) => {
  try {
    // Find user by email
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Check if the provided password is correct
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Save user info in the session
    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;
      req.session.name = userData.name;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Signup route: registers a new users
router.post('/signup', async (req, res) => {
  try {
    // Create a new user
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;
      req.session.name = userData.name;

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: userData.email,
        subject: 'Welcome',
        text: 'Hello from cellar vault!',
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      // Send the response back to the client
      res.status(200).json({ user: userData, message: 'Signup successful, verification email sent' });
    });

  } catch (err) {
    // Ensure this is called only if no response has been sent yet
    if (!res.headersSent) {
      res.status(400).json(err);
    }
  }
});

// Logout route: logs a user out by destroying the session
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send('Error logging out');
      } else {
        res.clearCookie('connect.sid');
        res.redirect('/auth')
      }
    });
  } else {
    res.status(404).send('Not logged in');
  }
});

// PUT route: Update a user's password
router.put('/:user_id', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userData = await User.findByPk(req.session.user_id);

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(currentPassword, userData.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Incorrect current password' });
    }

    await userData.update({ password: newPassword });

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// DELETE route: deletes the logged-in user
router.delete('/:user_id', async (req, res) => {
  // Check if the user ID in the parameter matches the logged-in user's ID
  if (req.params.user_id != req.session.user_id) {
    return res.status(403).json({ message: 'Unauthorized to delete this account' });
  }

  try {
    const userData = await User.destroy({
      where: {
        user_id: req.params.user_id, // Use 'id' instead of 'user_id'
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    // Clear the session as the user is now deleted
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.status(200).json({ message: 'User successfully deleted' });
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router for use in the main app
module.exports = router;