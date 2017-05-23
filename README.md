# webpack-php-sample
Sample application based on webpack (dev server) + php

* For compile front app: 
``` npm run build-production ``` or use ` yarn `

* For dev mode: 
``` npm run dev ``` and go to your local php host, ex: ` http://localhost `

* In your html page assets will be included from webpack-dev-server host ` http://localhost:5001 ` 

#### Tips:
1. global system env variable NODE_ENV='develop' (you can do it from php config file)
2. It's possible to compile front-app on production server insensibly for the user. In the main for small projects
3. Node version 5.10.0 or higher