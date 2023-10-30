import multer from "multer";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "static/uploads");
  },
  filename: (req, file, cb) => {
    const id = JSON.parse(JSON.stringify(req.body.id));
    console.log(id);
    cb(null, `${String(id)}.png`);
  },
});

const storagePost = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "static/post_images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
export const uploadPost = multer({ storage: storagePost });
