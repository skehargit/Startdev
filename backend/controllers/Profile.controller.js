
const mongoose = require("mongoose")
const UserModel = require("../models/User.model.js")
const ProfileModel = require("../models/Profile.model")

// Method for updating a profile
exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body
    const id = req.user.id

    // Find the profile by id
    const userDetails = await UserModel.findById(id)
    const profile = await ProfileModel.findById(userDetails.additionalDetails)

    const user = await UserModel.findByIdAndUpdate(id, {
      firstName,
      lastName,
    })
    await user.save()

    // Update the profile fields
    profile.dateOfBirth = dateOfBirth
    profile.about = about
    profile.contactNumber = contactNumber
    profile.gender = gender

    // Save the updated profile
    await profile.save()

    // Find the updated user details
    const updatedUserDetails = await UserModel.findById(id)
      .populate("additionalDetails")
      .exec()

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    })
  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      error: error.message,
    })
  }
}

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id
    console.log(id)
    const user = await UserModel.findById({ _id: id })
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      })
    }
    // Delete Assosiated Profile with the User
    await ProfileModel.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(user.additionalDetails),
    })

    // Now Delete User
    await UserModel.findByIdAndDelete({ _id: id })
    res.json({
      success: true,
      message: "User deleted successfully",
    })
    
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "User Cannot be deleted successfully" })
  }
}