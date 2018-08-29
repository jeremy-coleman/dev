import { SyncSupplier } from "@coglite/framework/common/model/SyncSupplier";
import { UserServiceContext } from "../service/UserServiceContext";
import { IUserProfile } from "../IUserProfile";

const UserProfileStore = new SyncSupplier<IUserProfile>();
UserProfileStore.loader = () => {
    return UserServiceContext.value.getUserProfile();
};

export { UserProfileStore }