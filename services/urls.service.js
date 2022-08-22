// -------------------------------- model ------------------------------------
const mongoose = require('mongoose');
	
const Schema = mongoose.Schema;

const mySchema = new Schema({
  user: String,
  id: String,
  type: String,
  url: String,
  title: String,
  author: String,
  extra: String

}, { timestamps: true },{ collection: 'urls' }, { versionKey: false });

const Model = mongoose.model('Url', mySchema);

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

class UrlsService {

  constructor() {
    this.nDataGet = 60;
    this.last_id = -1;
    this.data = [];
    //this.create_1st_block();
  }

  create_1st_block() {
    const timestamp = Date.now();
    for (let i=0; i<100; i++){
      this.data.push({
        id: this.last_id + 1, //faker.datatype.uuid(),
        timestamp: timestamp,
        "Temp (°C)": "20.40",
        "Humidity (%)": "84.00",
        "Light": "0"
      });
      this.last_id += 1;
    }
  }

  async postData2mongo(data){
    const newDataLog = {
        ...data
    }
    this.last_id += 1;
    const data2post = new Model(newDataLog);
    try{
      await data2post.save();                             // how to get status of connection to mongo before .save()
      return newDataLog;
    }
    catch {
      return "something went wrong with mongo";
    }

  }

  async getData() {
      const data = await Model.find().sort({ _id: -1 }).limit(60)
      return data;   
  }

  async getAllData(){
    const data = await Model.find();
    return data;
  }

  async getOne(id) {
    //console.log(id);
    const oneData = Model.where({'id':id});
    if (oneData == null) {
      return -1;
    }
    else {
      return oneData;
    }
  }

  async getLast(){
    const lastData = await Model.find().sort({ _id: -1 }).limit(1);
    return lastData;
  }

  async lastUpdated() {
    const DateNow = Math.floor(Date.now()/1000);
    const _date = await this.getLast()
    const lastUpdate = _date[0]["timestamp"];
    const difference = (DateNow - lastUpdate);
    
    let output = ``;
    if (difference < 60) {
        // Less than a minute has passed:
        output = `${difference} seconds ago`;
    } else if (difference < 3600) {
        // Less than an hour has passed:
        output = `${Math.floor(difference / 60)} minutes ago`;
    } else if (difference < 86400) {
        // Less than a day has passed:
        output = `${Math.floor(difference / 3600)} hours ago`;
    } else {
        // Less than a month has passed:
        output = `${Math.floor(difference / 86400)} days ago`;
    }
    return output;
  }

  async delete(id) {
    const prod = await Model.findOneAndDelete({id: id});
    return prod;
  }

  async update(id, changes) {
    const filter = { id: id };
    const doc = await Model.findOneAndUpdate(filter, changes, {new: true});

     if (doc === null) {
        //console.log("error updating");
        return -1;
     } else {
        //console.log("All good");
        return doc;
     }
 }
}

module.exports = UrlsService;