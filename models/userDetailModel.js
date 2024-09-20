const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: Number, required: true },
}, { _id: false });

const userDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: Number, required: true },
  address: { type: addressSchema, required: true },
  file: { // Renamed 'image' to 'file' to handle both images and PDFs
    public_id: { type: String, required: true },
    url: { type: String },
    format: { type: String }, // Added format to store file format (e.g., 'image/jpeg', 'application/pdf')
  },
    role: { 
    type: String, 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('UserDetails', userDetailsSchema);
