import { Context } from "@coglite/framework/common/Context";
import { IUserService } from "./IUserService";

const UserServiceContext = new Context<IUserService>();

export { UserServiceContext }