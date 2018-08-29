import { Context } from "@coglite/framework/common/Context";
import { IImageService } from "./IImageService";

const ImageServiceContext = new Context<IImageService>();

export { ImageServiceContext }