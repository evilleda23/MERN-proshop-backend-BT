import { StatusCodes } from 'http-status-codes';

import { HTTP_RESPONSE } from '../utils/http-response.util.js';
import { uploadSingleImage } from '../config/plugins/multer.plugin.js';

// @desc    Upload image
// @route   POST /api/upload
// @access  Private
export const postUploadImageController = async (req, res) => {
  uploadSingleImage(req, res, function (error) {
    if (error) {
      return HTTP_RESPONSE(res, StatusCodes.BAD_REQUEST, error?.message);
    }
    const response = { image: `/${req.file.path.replace(/\\/g, '/')}` };
    return HTTP_RESPONSE(
      res,
      StatusCodes.OK,
      'Image uploaded successfully',
      response
    );
  });
};
