import { SyncSupplier } from "@coglite/framework/common/model/SyncSupplier";
import { IUserProfile } from "../IUserProfile";
import { UserServiceContext } from "../service/UserServiceContext";

const UserProfileStore = new SyncSupplier<IUserProfile>();

UserProfileStore.loader = () => {
    return UserServiceContext.value.getUserProfile();
};

export { UserProfileStore };
