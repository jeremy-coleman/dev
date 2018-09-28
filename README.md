# Monorepo with pnpm workspaces and typescript

# The composite build settings
tsconfig.json: by default this is what the typescript compiler/IDE is going to pick up
{ 
  "compilerOptions":{
    "lib":["dom", "esnext"]
  },
  "files": [],
  "references": [
    { "path": "shared" },
    { "path": "client" },
    { "path": "server" }
  ]
}

tsconfig.settings.json: the sub-projects are gonna extend this setting, you dont have to do it that way, but it keeps the proper composite settings for sub packages
{
  "compilerOptions": {
    // Always include these settings
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,

    // ..other project specific settings, as an example
    "esModuleInterop": true,
    "target": "es5",
    "module": "commonjs",
    "strict": false,
    "lib":["dom", "esnext"]
  }
}


## Steps
#1 setup
npm i -g pnpm if you havn't yet

```
git clone
pnpm recursive i
```

*why this is great*
now notice, you have proper types in the client and server folder! *WITHOUT BUILDING ANYTHING*

#2 build
pnpm recursive run build *or* pnpm run build-all(its just an alias script in the root pkgjson)

#3 start
pnpm run start
*or*
node packages/server/build/index.js

then open http://localhost:8000

#extras
in packages/_package_template you will find an excellent rollup starter
*why its different than others*
if you run the build and inspect the lib.d.ts, you will see the types don't have definitions like 'namespace/path/path', they are bundled into a single file matching your lib
this can be good or bad, depending on your needs, but it's often difficult to find this option. 
-note that on larger project builds, your types may conflict with each other because they're all put into 1 scope for your package. This is the behavior I wanted.



#credits and other resources
https://github.com/pnpm/pnpm
https://github.com/Microsoft/TypeScript
https://github.com/jsedlacek/monorepo (template i used originally using yarn workspaces)