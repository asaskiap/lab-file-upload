const express = require('express');
const router = express.Router();
const PostModel = require('./../models/Post.model');

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const storage = new multerStorageCloudinary.CloudinaryStorage({
    cloudinary: cloudinary.v2
});

const uploadMiddleware = multer({ storage });

const routeGuard = require('../configs/route-guard.config');

/* GET home page */
router.get('/', (req, res) => {
    PostModel.find()
        .populate('creator')
        .then(posts => {
            console.log(posts);
            res.render('index', { posts });
        })
        .catch(error => {
            next(error);
        });
});

// handle user posts
// display post form
router.get('/create-post', routeGuard, (req, res) => res.render('users/post'));

// handle file upload and user posts
router.post('/create-post', uploadMiddleware.single('postPicture'), (req, res, next) => {
    const picture = req.file && req.file.path;
    const content = req.body.content;
    const picName = req.body.picName;
    const creator = req.body.creator;
    console.log(picName, content, creator, picture);
    PostModel.create({
            content: content,
            picName: picName,
            creator: creator,
            picPath: picture
        })
        .then(res.redirect('/'))
        .catch(error => {
            next(error);
        });
});

module.exports = router;