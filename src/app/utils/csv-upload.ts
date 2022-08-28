import multer from 'multer';
import path from "path";
const XLSX = require('xlsx')
const csvStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'tmp/', 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

export const csvUpload = multer({
    storage: csvStorage,
    limits: {
      fileSize: 5000000 // 5000000 Bytes = 5 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.xlsx$/)) { 
         // upload only xlsx format
         return cb(null, false);
       }
     cb(null, true)
  }
});

export const readXLSX_File = async (filePath: any) => {
  var workbook = XLSX.readFile(filePath);
  var sheet_name_list = workbook.SheetNames;
  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  return xlData;
};