const UserDetails = require('../models/userDetailModel');

// Controller to create a new user detail
exports.createUserDetails = async (req, res) => {
  try {
    const { name, email, contactNumber, address, role } = req.body;

    // Validate required fields
    if (!name || !email || !contactNumber || !address || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    // Check for existing email
    const existingUser = await UserDetails.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Parse address if it's a string
    let parsedAddress = address;
    if (typeof address === 'string') {
      try {
        parsedAddress = JSON.parse(address);
      } catch (err) {
        return res.status(400).json({ message: 'Invalid address format' });
      }
    }

    // Handle file upload
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

    // Create new user detail
    const newUserDetails = new UserDetails({
      name,
      email,
      contactNumber,
      address: parsedAddress,
      file: fileData,
      role,
    });

    await newUserDetails.save();

    res.status(201).json({ message: 'User details saved successfully', userDetails: newUserDetails });
  } catch (error) {
    console.error('Error in createUserDetails:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to get user details by role
exports.getUserDetailsByRole = async (req, res) => {
  try {
    const { name } = req.query;

    // Validate if role is provided
    if (!name) {
      return res.status(400).json({ message: 'name is required' });
    }


    // Fetch user details based on role
    const users = await UserDetails.find({ name });

    if (users.length === 0) {
      return res.status(404).json({ message: `No users found with name: ${name}` });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error in getUserDetailsByRole:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
