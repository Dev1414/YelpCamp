const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const {isLoggedIn, validateCampground, isAuthor} = require('../middleware')
const campgrounds = require('../controllers/campgrounds');
const {storage} = require('../cloudinary')
const multer = require('multer')
const upload = multer({ storage })


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, campgrounds.newForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync(campgrounds.editForm))

module.exports = router;

//Order matters while restructuring