
class UrlsService {

  constructor() {
    this.last_id = -1;
    this.urls = [];
    this.create_1st_block();
  }

  create_1st_block() {
    const timestamp = Date.now();
    this.urls.push({
        id: this.last_id + 1, //faker.datatype.uuid(),
        timestamp: timestamp,
        url: "https://santiago.orozcoh.com/",
        note: "Una memoria virtual"
    });
    this.last_id += 1;
  }

  getDbSize(){
    return this.urls.length;
  }

  async create(data) {
    const size = this.last_id + 1;
    const timestamp = Date.now();
    const newUrl = {
        id: size,
        timestamp: timestamp,
        ...data

    }
    this.urls.push(newUrl);
    this.last_id += 1;
    return newUrl;
  }

//   find () {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(this.products);
//         }, 500);
//     });
// }

  async getUrls() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(this.urls);
      }, 100);
    });
    //return this.urls;
  }

  async getOneUrl(id) {
    console.log(id);
    const index = this.urls.findIndex(item => item.id === id);
    //const a = this.funcionQueRompe();
    const prod = this.urls.find(item => item.id === id);
    if (index === -1){
      return -1;
    }
    else{
      return prod;
    }
  }

  async delete(id) {
    const index = this.urls.findIndex(item => item.id === id);
    if (index === -1) {
        return -1;
    }
    const prod = this.urls[index];
    this.urls.splice(index, 1);
    return prod;
  }

  async update(id, changes) {
    const index = this.urls.findIndex(item => item.id === id);
    console.log(changes);
     if (index === -1) {
         return -1;
     } else {
      const url = this.urls[index];
      this.urls[index] = {
          ...url,
          ...changes
      };
      return this.urls[index];
     }
 }
}

module.exports = UrlsService;