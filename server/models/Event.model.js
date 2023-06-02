const mongoose = require ("mongoose");
const {Schema} = mongoose; 

const EventSchema = new Schema ({
  Title: String,
  Date: String,
  Hour: String,
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

const Event = mongoose.model("Event", EventSchema);
module.exports = Event; 

