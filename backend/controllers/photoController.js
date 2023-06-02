var PhotoModel = require('../models/photoModel.js');
var CommentModel = require('../models/commentModel.js');
const fs = require('fs');

/**
 * photoController.js
 *
 * @description :: Server-side logic for managing photos.
 */
module.exports = {

    /**
     * photoController.list()
     */
    list: function (req, res) {
        PhotoModel.find({ isFlagged: false })
            .populate('postedBy')
            .sort({ date: -1 })
            .exec(function (err, photos) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photos.',
                        error: err
                    });
                }
                return res.json(photos);
            });
    },


    listUserPhotos: function (req, res) {
        let user = req.session.userId;
        PhotoModel.find({postedBy: user})
            .populate('postedBy')
            .sort({date: -1})
            .exec(function (err, photos) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }
                var data = [];
                data.photos = photos;
                //return res.render('photo/list', data);
                return res.json(photos);
            });
    },

    /**
     * photoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOneAndUpdate({_id: id}, {$inc: {views: 1}})
            .populate("postedBy")
            .exec(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }

                if (!photo) {
                    return res.status(404).json({
                        message: 'No such photo'
                    });
                }
                return res.json(photo);
            });
    },
    getComments: function (req, res) {
        const id = req.params.id;

        PhotoModel.findOne({_id: id})
            .populate({
                path: 'comments',
                populate: {
                    path: 'postedBy',
                    select: 'username'
                }
            })
            .exec(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }
                return res.json(photo.comments);
            });
    },


    /**
     * photoController.create()
     */
    create: function (req, res) {
        var photo = new PhotoModel({
            name: req.body.name,
            path: "/images/" + req.file.filename,
            postedBy: req.session.userId,
            views: 0,
            likes: 0,
            date: new Date(),
            category: req.body.category
        });

        photo.save(function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating photo',
                    error: err
                });
            }

            return res.status(201).json(photo);
            //return res.redirect('/photos');
        });
    },

    /**
     * photoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({_id: id}, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            photo.name = req.body.name ? req.body.name : photo.name;
            photo.path = req.body.path ? req.body.path : photo.path;
            photo.postedBy = req.body.postedBy ? req.body.postedBy : photo.postedBy;
            photo.views = req.body.views ? req.body.views : photo.views;
            photo.likes = req.body.likes ? req.body.likes : photo.likes;

            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }

                return res.json(photo);
            });
        });
    },

    like: function (req, res) {
        let userId = req.session.userId;
        let photoId = req.params.id;
        PhotoModel.findOneAndUpdate({_id: photoId}, {$inc: {likes: 1}, $push: {likedBy: userId}})
            .exec(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }
                return res.json(photo);
            });
    },

    unlike: function (req, res) {
        let userId = req.session.userId;
        let photoId = req.params.id;
        PhotoModel.findOneAndUpdate({_id: photoId}, {$inc: {likes: -1}, $pull: {likedBy: userId}})
            .exec(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }
                return res.json(photo);
            });
    },

    dislike: function (req, res) {
        let userId = req.session.userId;
        let photoId = req.params.id;
        PhotoModel.findOneAndUpdate(
            { _id: photoId },
            { $inc: { dislikes: 1 }, $push: { dislikedBy: userId } },
            { new: true } // Return the updated photo document
        )
            .exec(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }

                // Check if the photo has reached 3 or more dislikes
                if (photo.dislikes >= 2) {
                    // Update isFlagged to true
                    photo.isFlagged = true;
                    photo.save(function (err) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error when updating photo.',
                                error: err
                            });
                        }
                        return res.json(photo);
                    });
                } else {
                    return res.json(photo);
                }
            });
    },


    undislike: function (req, res) {
        let userId = req.session.userId;
        let photoId = req.params.id;
        PhotoModel.findOneAndUpdate({_id: photoId}, {$inc: {dislikes: -1}, $pull: {dislikedBy: userId}})
            .exec(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }
                return res.json(photo);
            });
    },

    /**
     * photoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PhotoModel.findById(id).then((photo) => {
            const commentIds = photo.comments;
            const filePath = "C:\\Users\\Asus\\Desktop\\sp_v4_sample\\backend\\public" + photo.path;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                photo.remove();
                CommentModel.deleteMany({_id: {$in: commentIds}}, function (err, comment) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when deleting the comment.',
                            error: err
                        });
                    }
                });
            });

        });
    },

    publish: function (req, res) {
        return res.render('photo/publish');
    }
};
