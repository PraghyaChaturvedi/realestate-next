import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//Schema
import HomeSecondSectionSchema from '../Models/HomeSecondSection.js';
import ProjectSchema from '../Models/Project.js';
import AreaSchema from '../Models/Area.js';
import leadSchema from '../Models/Leads.js';
import HomeThirdSectionSchema from '../Models/HomeThirdSection.js';
import HomeFourthSectionSchema from '../Models/HomeFourthSection.js';
import HomeFifthSectionSchema from '../Models/HomeFifthSection.js';
import FooterSchema from '../Models/Footer.js';
import companyProfileSchema from '../Models/CompanyProfile.js';
import PrivacyPolicySchema from '../Models/PrivacyPolicy.js';
import TeamSchema from '../Models/Team.js';
import EventSchema from '../Models/Event.js';
import CareerSchema from '../Models/Career.js';
import VisionMissionSchema from '../Models/VisionMission.js';
import LegalInformationSchema from '../Models/LegalInformation.js';
import LoanForNRISchema from '../Models/LoanForNRI.js';
import InquirySchema from '../Models/Inquiry.js';
import BuilderSchema from '../Models/Builder.js';

// import HomeFirstSectionSchema from '../Models/HomeFirstSection.js';

// CONNECTION STRINGS
const mongo_url = process.env.MONGO_CONN;
const mongo_url_admin = process.env.MONGO_CONN_ADMIN;

// CONNECTIONS
const conn = mongoose.createConnection(mongo_url, {});
const admin_conn = mongoose.createConnection(mongo_url_admin, {});

// MODELS
const HomeSecondSection = admin_conn.model('HomeSecondSection', HomeSecondSectionSchema);
const Project = conn.model('Project', ProjectSchema);
const Area = conn.model('Area', AreaSchema);
const Leads = conn.model('Leads', leadSchema);
const HomeThirdSection = admin_conn.model('HomeThirdSection', HomeThirdSectionSchema);
const HomeFourthSection = admin_conn.model('HomeFourthSection', HomeFourthSectionSchema);
const HomeFifthSection = admin_conn.model('HomeFifthSection', HomeFifthSectionSchema);
const Footer = admin_conn.model('Footer', FooterSchema);
const CompanyProfile = admin_conn.model('CompanyProfile', companyProfileSchema);
const PrivacyPolicy = admin_conn.model('PrivacyPolicy', PrivacyPolicySchema);
const Team = admin_conn.model('Team', TeamSchema);
const Career = conn.model('Career', CareerSchema);
const Event = conn.model('Event', EventSchema);
const VisionMission = admin_conn.model('VisionMission', VisionMissionSchema);
const LegalInformation = admin_conn.model('LegalInformation', LegalInformationSchema);  
const LoanForNRI = admin_conn.model('LoanForNRI', LoanForNRISchema);
const Inquiry = admin_conn.model('Inquiry', InquirySchema);
const Builder = conn.model('Builder', BuilderSchema);

// const HomeFirstSection = admin_conn.model('HomeFirstSection', HomeFirstSectionSchema);


export const connectToDBs = async () => {
  try {
    await conn.asPromise();
    console.log("✅ Connected to CRM DB");
    await admin_conn.asPromise();
    console.log("✅ Connected to Admin Panel DB");
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
};

// EXPORT MODELS
export const models = {
  conn,
  admin_conn,
  HomeSecondSection,
  Project,
  Area,
  Leads,
  HomeThirdSection,
  HomeFourthSection,
  HomeFifthSection,
  Footer,
  CompanyProfile,
  PrivacyPolicy,
  Team,
  Career,
  Event,
  VisionMission,
  LegalInformation,
  LoanForNRI,
  Inquiry, 
  Builder,
//   HomeFirstSection,
};

