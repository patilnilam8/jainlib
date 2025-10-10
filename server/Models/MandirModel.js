const mongoose = require ('mongoose')


const mandirSchema = new mongoose.Schema ({

name: { type: String , required:true },
address :{type: String ,required: true},
imageUrl:[String],

contactperson:{ type:String, required: true},
contactnumber:{type: Number, required: true},
location:{type: String, required:true},
createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
})

mandirSchema.pre("findOneAndUpdate", function(next){
  this.set  ({updatedAt: new Date()})
  next();
})

module.exports =mongoose.model("Mandir",mandirSchema);