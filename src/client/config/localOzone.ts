import { UserServiceContext } from "@coglite/framework/ozone/user/service/UserServiceContext";
import { RestUserService } from "@coglite/framework/ozone/user/service/RestUserService";
import { UserDataServiceContext } from "@coglite/framework/ozone/user/service/UserDataServiceContext";
import { RestUserDataService } from "@coglite/framework/ozone/user/service/RestUserDataService";
import { ListingServiceContext } from "@coglite/framework/ozone/listing/service/ListingServiceContext";
import { RestListingService } from "@coglite/framework/ozone/listing/service/RestListingService";
import { ImageServiceContext } from "@coglite/framework/ozone/media/service/ImageServiceContext";
import { RestImageService } from "@coglite/framework/ozone/media/service/RestImageService";
import { UserAdminContext } from "@coglite/framework/ozone/user/UserAdminContext";
import { isMemberOfGroup } from "@coglite/framework/ozone/user/UserHelper";
import { RestCategoryService } from "@coglite/framework/ozone/category/service/RestCategoryService";
import { CategoryServiceContext } from "@coglite/framework/ozone/category/service/CategoryServiceContext";


const localOzone = (env : any) => {
    console.log("-- Applying Local Configuration");
    UserAdminContext.value = userProfile => {
        return isMemberOfGroup(userProfile, "APPS_MALL_STEWARD");
    };
    const apiBaseUrl = env["ozone.api.baseUrl"] || "http://localhost:8000/api";
    const iwcApiBaseUrl = env["ozone.iwc.api.baseUrl"] || "http://localhost:8000/iwc-api";
    const auth = {
        username: env["ozone.api.username"] || "bigbrother",
        password: env["ozone.api.password"] || "password"
    };
    const userService = new RestUserService();
    userService.baseUrl = apiBaseUrl;
    userService.auth = auth;
    UserServiceContext.value = userService;
    const userDataService = new RestUserDataService();
    userDataService.baseUrl = iwcApiBaseUrl;
    userDataService.auth = auth;
    UserDataServiceContext.value = userDataService;
    const listingService = new RestListingService();
    listingService.baseUrl = apiBaseUrl;
    listingService.auth = auth;
    ListingServiceContext.value = listingService;
    const imageService = new RestImageService();
    imageService.baseUrl = apiBaseUrl;
    imageService.auth = auth;
    ImageServiceContext.value = imageService;
    const categoryService = new RestCategoryService();
    categoryService.baseUrl = apiBaseUrl;
    categoryService.auth = auth;
    CategoryServiceContext.value = categoryService;
};

export { localOzone, localOzone as default }