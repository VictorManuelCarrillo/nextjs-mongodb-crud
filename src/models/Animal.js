import mongoose from 'mongoose'

const AnimalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Animals title is required'],
    trim: true,
    maxlength: [40, 'title cannot be grater than 40 characters'],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: [40, 'title cannot be grater than 40 characters'],
  }
}, {
  timestamps: true,
  versionKey: false
})

export default mongoose.models.Animal || mongoose.model('Animal', AnimalSchema)