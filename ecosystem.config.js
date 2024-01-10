module.exports = {
	apps: [
	  {
	    name: 'earthworm',
	    script: 'pnpm',
	    args: 'start',
	    cwd: '.',  // 替换为你的项目路径
	    instances: 1,
	    autorestart: true,
	    watch: false,
	    max_memory_restart: '1G',
	    env: {
	      NODE_ENV: 'production',
	    },
	  },
	],
      };
      