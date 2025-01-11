const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Add a new admin
exports.addAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists." });
    }

    const admin = new Admin({ name, email, password, role });
    await admin.save();

    res.status(201).json({ message: "Admin added successfully!", admin });
  } catch (error) {
    logger.error("Error adding admin:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the admin." });
  }
};

// Admin login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(200)
      .json({
        token,
        admin: { id: admin._id, email: admin.email, role: admin.role },
      });
  } catch (error) {
    logger.error("Error logging in admin:", error);
    res.status(500).json({ message: "An error occurred while logging in." });
  }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password"); // Exclude password
    res.status(200).json(admins);
  } catch (error) {
    logger.error("Error fetching admins:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching admins." });
  }
};

// Get admin by ID
exports.getAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the admin by ID, excluding the password
    const admin = await Admin.findById(id).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error("Error fetching admin:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the admin." });
  }
};

// Update an admin
exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    // Update fields
    admin.name = name || admin.name;
    admin.email = email || admin.email;
    admin.role = role || admin.role;

    // Hash new password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }

    const updatedAdmin = await admin.save();
    res
      .status(200)
      .json({ message: "Admin updated successfully.", admin: updatedAdmin });
  } catch (error) {
    console.error("Error updating admin:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the admin." });
  }
};

// Delete an admin
exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    await Admin.findByIdAndDelete(id);
    res.status(200).json({ message: "Admin deleted successfully." });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the admin." });
  }
};
