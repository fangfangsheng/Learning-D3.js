# Visualization with d3.js

1. bar chart
   - basic bar chart

   - interactive bar chart

2. Map 
  - bar chart and map interactive project Airlines Routes

3. Simple Frontend, API, and Model with Python + Vue.js

Note: After installing Node and NPM, go over to the Vue CLI page and install the Vue CLI. While trying to install the new package by typing 'npm install -g @vue/cli' in terminal, I got permission denied. The error message looks like the following:

```bash
npm ERR! code EACCES
npm ERR! syscall symlink
npm ERR! path ../lib/node_modules/@vue/cli/bin/vue.js
npm ERR! dest /usr/local/bin/vue
npm ERR! errno -13
npm ERR! Error: EACCES: permission denied, symlink '../lib/node_modules/@vue/cli/bin/vue.js' -> '/usr/local/bin/vue'
npm ERR!  [OperationalError: EACCES: permission denied, symlink '../lib/node_modules/@vue/cli/bin/vue.js' -> '/usr/local/bin/vue'] {
npm ERR!   cause: [Error: EACCES: permission denied, symlink '../lib/node_modules/@vue/cli/bin/vue.js' -> '/usr/local/bin/vue'] {
npm ERR!     errno: -13,
npm ERR!     code: 'EACCES',
npm ERR!     syscall: 'symlink',
npm ERR!     path: '../lib/node_modules/@vue/cli/bin/vue.js',
npm ERR!     dest: '/usr/local/bin/vue'
npm ERR!   },
npm ERR!   stack: "Error: EACCES: permission denied, symlink '../lib/node_modules/@vue/cli/bin/vue.js' -> '/usr/local/bin/vue'",
npm ERR!   errno: -13,
npm ERR!   code: 'EACCES',
npm ERR!   syscall: 'symlink',
npm ERR!   path: '../lib/node_modules/@vue/cli/bin/vue.js',
npm ERR!   dest: '/usr/local/bin/vue'
npm ERR! }
npm ERR! 
npm ERR! The operation was rejected by your operating system.
npm ERR! It is likely you do not have the permissions to access this file as the current user
npm ERR! 
npm ERR! If you believe this might be a permissions issue, please double-check the
npm ERR! permissions of the file and its containing directories, or try running
npm ERR! the command again as root/Administrator.


The reason is I do not have the required privileges to install globally. I could either try installing with sudo or (recommended) move NPM\'s default directory to one which I have read/write permissions on:

	1. Create directory in your home directory, say `~/.npm-global`.
	2. Run `npm config set prefix '~/.npm-global'`
	3. Update your PATH: `export PATH=~/.npm-global/bin:$PATH`
  4. Run `npm install -g @vue/cli`



