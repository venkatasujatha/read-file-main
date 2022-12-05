const fs = require('fs')
const { json } = require('body-parser')
const { unlink } = require('fs')
const path = require('path')
const sharp = require('sharp')

//convert .tiff to png
const readFile = async (req, res) => {
  try {
    const file = req.file.path

    console.log(file)

    const resp = await sharp(file)
      .rotate()
      .resize(100, 100)
      .toFormat('png')
      .png({ quality: 50 })
      .toFile(`images/${new Date()}-sample.png`)
    console.log('result', resp)
    await unlink(file, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('.tiff file is deleted')
      }
    })
    res.status(200).json({
      message: 'file converted successfully',
      res: resp
    })
  } catch (err) {
    console.log(err)
    res.send(400).json({
      message: 'file convetion is failed'
    })
  }
}

//convert png to blob
const convert = (req,res)=>{
  try {    
    const con =fs.readFileSync(req.file.path);
    console.log(con.toString());
    //  fs.unlinkSync(req.file.path, function (err) {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     console.log('.png file is deleted')
    //   }
    // })
    fs.rmdirSync(`./images`, {
      recursive: true
    })
      res.send(con.toString())
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = { readFile,convert }
