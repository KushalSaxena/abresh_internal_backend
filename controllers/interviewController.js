// Create a new interview booking
const nodemailer = require('nodemailer');
const Interview = require('../models/interviewModel'); // Assuming this is the correct path to the Interview model

exports.createInterview = async (req, res) => {
    try {
        const { username, email, selectedDate, selectedSlot, googleMeetLink, resume } = req.body;
        
        let fileData = {};

    // Check if a file (image or PDF) was uploaded
        if (req.file) {
      // Multer-Cloudinary has already uploaded the file, so the data is available in req.file
            fileData = {
                public_id: req.file.filename, // Cloudinary's public ID
                url: req.file.path, // Cloudinary's secure URL
                format: req.file.mimetype // To store the file format (e.g., image/jpeg, application/pdf)
            };

      console.log('File Uploaded to Cloudinary');
    }

        // Create new interview
        const newInterview = new Interview({
            username,
            email,
            selectedDate,
            selectedSlot,
            googleMeetLink,
            file:fileData
        });

        // Save to the database
        await newInterview.save();

        // Set up Nodemailer
        const transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            auth: {
                user: process.env.MAIL_AUTH_USER,
                pass: process.env.MAIL_AUTH_PASSWORD
            }
        });

        // Format the selected date for email
        const formattedDate = new Date(selectedDate).toLocaleDateString('en-US');

        // Email options
        const mailOptions = {
            from: process.env.MAIL_FROM, // Sender address
            to: email, // Recipient's email (the one stored in the database)
            subject: 'Interview Scheduled: Confirmation',
            text: `Dear ${username},\n\nYour interview has been scheduled for ${formattedDate} during the ${selectedSlot} time slot.\n\nGoogle Meet Link: ${googleMeetLink}\n\nBest of luck!\n\nBest Regards,\nABResh Events`
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent');
            }
        });

        return res.status(201).json({ message: 'Interview booked successfully and email sent', interview: newInterview });
    } catch (error) {
        return res.status(500).json({ message: 'Error booking interview', error: error.message });
    }
};


// Get all interview bookings
exports.getInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find();
        return res.status(200).json(interviews);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving interviews', error: error.message });
    }
};

