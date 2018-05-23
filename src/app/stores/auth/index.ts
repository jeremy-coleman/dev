import { Auth } from "./Auth";
import { create } from "mobx-persist";

const auth = new Auth();

export default auth;

const hydrate = create();
hydrate("auth", auth);