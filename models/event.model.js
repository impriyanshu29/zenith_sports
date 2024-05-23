import mongoose from "mongoose";
import  {Schema} from "mongoose";


const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eventDate: {
    type: String,
    required: true,
  },
  eventVenue: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
 
  eventOrganizer: {
    type: String,
    required: true,
  },
  eventOrganizerContact: {
    type: String,
    required: true,
  },
  eventOrganizerEmail: {
    type: String,
    required: true,
  },
  eventOrganizerInstagram: {
    type: String,

  },
  eventOrganizerLinkedin: {
    type: String,
  
  },
  eventCategory: {
    type: String,
    required: true,
  },
    eventWinningAmount: {
        type: String,
        required: true,
    },
    eventRegistrationAmount: {
        type: String,
        required: true,
    },
    eventRegistrationLastDate: {
        type: String,
        required: true,
    },
    eventRegistrationLink: {
        type: String,
        required: true,
    },
    eventRules: {
        type: String,
        required: true,
    },
    teamNumber: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
},
{ timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;