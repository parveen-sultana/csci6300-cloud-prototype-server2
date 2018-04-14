export default {
 // "port": 3000,
 // "mongoUrl": "",
  "port": process.env.PORT,
  "mongoUrl": process.env.MONGODB_URI,
  "bodyLimit": "100kb"
}
