import { Context } from "@coglite/framework/common/Context";
import { IPaths, Paths } from "./Paths";

const PathsContext = new Context<IPaths>({
    factory() {
        return new Paths()
    }
});

export { PathsContext }