import { Context } from "@coglite/framework/common/Context";
import { IUserDataService } from "./IUserDataService";

const UserDataServiceContext = new Context<IUserDataService>();

export { UserDataServiceContext }
