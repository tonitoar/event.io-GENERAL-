const mongoose = require ("mongoose");
const {Schema} = mongoose; 

const EventsUserSchema = new Schema ({
  title: String,
  Date: String,
  Location: String,
  Description: String,
  NumInvitados : Number,
  MaxInvitados: Number,
  ImageUrl: String,
  Buyers: [{
    type: Schema.Types.ObjectId,
    ref:"User"
    }],
    isCancelled: Boolean, 

});

const EventsUser = mongoose.model("Event", EventsUserSchema);
module.exports = EventsUser; 
