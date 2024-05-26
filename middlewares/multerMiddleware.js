import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/images/users");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (error, name) => {
      const fileName = name.toString("hex") + path.extname(file.originalname); // generating a unique fileName
      cb(null, fileName);
    });
  },
});

export const upload = multer({ storage });
