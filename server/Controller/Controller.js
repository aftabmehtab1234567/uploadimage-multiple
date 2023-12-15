import multer from 'multer';
import User from '../module/Schema.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Allow only image files with specific mime types (adjust as needed)
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);
  }
};

export const Upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export async function handleAction(req, res) {
  console.log('hi');
  try {
    // Hash the user's password before saving it

    if (req.files && req.files.length > 0) {
      if (req.files.length > 6) {
        // If the number of files is more than 6, generate an error message
        res.status(400).json({ error: 'Cannot upload more than six files' });
        return;
      }

      // Assuming you want to handle multiple files
      const newUsers = req.files.map((file) => ({
        images: file.filename, // Fix the typo here
      }));

      // Save the user data to the database
      const savedUsers = await User.insertMany(newUsers);

      // Extract image URLs from the saved users
      const imageUrls = savedUsers.map((user) => user.images);

      // Send the image URLs in the response
      res.status(200).json({
        message: 'Users created successfully',
        imageUrls: imageUrls,
      });
    } else {
      res.status(400).json({ error: 'No files uploaded' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
  