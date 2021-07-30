# Chat app for test

## Running server
```sh
npm start
# or
yarn start
```

## For Building
### Server

Use debug mode in VsCode for developing

Next configs might help:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "LDev",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/index.ts",
      "cwd": "${workspaceFolder}",
      "outFiles": ["${workspaceFolder}/server/**/*.js"],
      "env": {
       
      }
    }
  ]
}
```

For building
```sh
npm run build
# or
yarn build
```

### Client
Go to `client-src` folder as it is an Angular app

And run
```sh
npm start
# or
yarn start
```

For building
```sh
npm run build
# or
yarn build
```

Happy codding!