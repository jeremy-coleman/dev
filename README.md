# electron-fusebox-react
starter kit for electron / monorepo with fusebox

#current
src/
-packages(monorepo)
-project(desktop app directory)


#alternative
## 1) change alias in tsconfig from "@coglite/*": ["src/packages/*"] to "@coglite/*": ["src/project/packages/*"]
## 2) change alias in fuse.js from alias : {"@coglite" : "~/packages"} to alias : {"@coglite" : "~/project/packages"}
src/
project/
-app
-desktop
-packages(monorepo)


#yarnrc alternative
save-exact true
disturl "https://atom.io/download/electron"
target "2.0.3"
runtime "electron"
build-from-source true