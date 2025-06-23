import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  // Project Overview
  projectName: String,
  projectType: {
    type: [String],
    enum: ["Residential", "Commercial", "Land"],
  },
  projectSubType: {
    type: [String],
    enum: ["Apartment", "Bunglows/Villa/Row House", "Penthouse", "Office Space", "Shop/Showrooms", "Warehouse", "Industrial Shed", "Plot"],
  },
  builder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Builder"
  },
  status: {
    type: String,
    enum: ["Under Construction", "Ready to Move"]
  },
  possessionDate: String,
  reraNumber: String,

  // Location Details
  area: { type: mongoose.Schema.Types.ObjectId, ref: "Area"},
  city: String,
  state: String,
  mapLink: String,

  projectSpecification: [
    {
      unitType:{type: String, enum: ["1BHK", "2BHK", "3BHK", "4BHK", "Shops", "Offices", "Villas", "Plots"]},
      subType:{type: String, enum: ["Apartment", "Bunglows/Villa/Row House", "Penthouse", "Office Space", "Shop/Showrooms", "Warehouse", "Industrial Shed", "Plot"]},
      area: {type: String, enum: ["Carpet Area", "Super Built-up Area"]},
      minSize: String,
      maxSize: String,
      constructionAreaMinSize: String,
      constructionAreaMaxSize: String,
      measurementUnit: {type: String, enum: ["sqft", "sqyd", "acres", "bigha"]},
      possessionDate: String,
      price: String
    }
  ],
  carpetAreaMin: String,
  carpetAreaMax: String,
  priceMin: String,
  priceMax: String,

  // Key Features
  amenities: {type:[String]},

  // Detailed Description
  description: String,
  usps: [String],

  // Media Uploads
  coverImages: [{
    url: String,
    description: String
  }],

  galleryImages: [{
    url: String,
    description: String
  }],

  videoLink: String,
  layoutPlans: [{
    url: String,
    description: String
  }],

  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Pre-save hook to update the updatedAt field
ProjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default ProjectSchema;