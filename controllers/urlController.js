const Url = require('../models/urlModel');
const shortid = require('shortid');
exports.createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;
        const shortUrl = shortid.generate();

        const newUrl = await Url.create({ originalUrl, shortUrl });

        res.status(201).json({
            status: 'Success',
            data: {
                url: newUrl
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message
        });
    }
};
exports.getUrlById = async (req, res) => {
    try {
        const url = await Url.findById(req.params.id);

        if (!url) {
            return res.status(404).json({
                status: 'Failed',
                message: 'URL not found'
            });
        }

        res.status(200).json({
            status: 'Success',
            data: {
                url
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message
        });
    }
};

exports.getAllUrls = async (req, res) => {
    try {
        const urls = await Url.find();
        res.status(200).json({
            status: 'Success',
            results: urls.length,
            data: {
                urls
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message
        });
    }
};

exports.updateUrl = async (req, res) => {
    try {
        const updatedUrl = await Url.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedUrl) {
            return res.status(404).json({
                status: 'Failed',
                message: 'URL not found'
            });
        }

        res.status(200).json({
            status: 'Success',
            data: {
                url: updatedUrl
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message
        });
    }
};

exports.deleteUrl = async (req, res) => {
    try {
        const url = await Url.findByIdAndDelete(req.params.id);

        if (!url) {
            return res.status(404).json({
                status: 'Failed',
                message: 'URL not found'
            });
        }

        res.status(204).json({
            status: 'Success',
            message: 'URL deleted successfully'
        });
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err.message
        });
    }
};
