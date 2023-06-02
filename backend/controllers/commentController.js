var CommentModel = require('../models/commentModel.js');
var PhotoModel = require('../models/photoModel.js');

/**
 * commentController.js
 *
 * @description :: Server-side logic for managing comments.
 */
module.exports = {

    /**
     * commentController.list()
     */
    list: function (req, res) {
        CommentModel.find(function (err, comments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment.',
                    error: err
                });
            }

            return res.json(comments);
        });
    },

    /**
     * commentController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        CommentModel.findOne({_id: id}, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment.',
                    error: err
                });
            }

            if (!comment) {
                return res.status(404).json({
                    message: 'No such comment'
                });
            }

            return res.json(comment);
        });
    },

    /**
     * commentController.create()
     */
    create: function (req, res) {
        var comment = new CommentModel({
            title: req.body.title,
            postedBy: req.session.userId
        });

        comment.save(function (err, savedComment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating comment',
                    error: err
                });
            }

            savedComment.populate('postedBy', function (err, populatedComment) {

                // Update the photo with the new comment
                PhotoModel.findOneAndUpdate(
                    {_id: req.body.photoId},
                    {$push: {comments: populatedComment._id}},
                    {new: true},
                    function (err, updatedPhoto) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error when updating photo with comment',
                                error: err
                            });
                        }

                        return res.status(201).json(populatedComment);
                    }
                );
            });
        });
    },

    /**
     * commentController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        CommentModel.findOne({_id: id}, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment',
                    error: err
                });
            }

            if (!comment) {
                return res.status(404).json({
                    message: 'No such comment'
                });
            }

            comment.title = req.body.title ? req.body.title : comment.title;
            comment.postedBy = req.body.postedBy ? req.body.postedBy : comment.postedBy;

            comment.save(function (err, comment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating comment.',
                        error: err
                    });
                }

                return res.json(comment);
            });
        });
    },

    /**
     * commentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        var photoId = req.body.photoId;

        // Remove the comment from the photo
        PhotoModel.findOneAndUpdate(
            {_id: photoId},
            {$pull: {comments: id}},
            {new: true},
            function (err, updatedPhoto) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo with comment',
                        error: err
                    });
                }
                CommentModel.findByIdAndRemove(id, function (err, comment) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when deleting the comment.',
                            error: err
                        });
                    }

                    return res.status(204).json();
                });
            });


    }
};

//TODO: Dodaj funktionalnost za dodajenje lajkov za slike..uporabnik lahko poda samo en lajk
