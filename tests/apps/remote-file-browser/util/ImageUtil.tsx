import {PREVIEW_IMAGE_FORMAT, ROW_INNER_HEIGHT, SEARCH_IMAGE_FORMAT} from '../settings';

class ImageUtil {

/**{{thumbnail: *, preview: *, slug: *, width, height}}*/
convertImageData = (image) => {
    return {
        thumbnail: image.images[SEARCH_IMAGE_FORMAT],
        preview: image.images[PREVIEW_IMAGE_FORMAT],
        slug: image.slug
    };
};

normalizeImageSize = (width, height) => {
    const ratio = Math.min(ROW_INNER_HEIGHT / height, 1);

    return {
        width: Math.floor(width * ratio),
        height: Math.floor(height * ratio)
    }
};

normalizeImageData = (imageData) => {
    const size = this.normalizeImageSize(imageData.width, imageData.height);

    return {
        ...imageData,
        ...size
    }
};
}

export default new ImageUtil()