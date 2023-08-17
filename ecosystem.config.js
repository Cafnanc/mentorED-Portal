module.exports = {
    apps: [
      {
        name: 'angular-ssr-app',
        script: 'dist/mentorEd-portal/server/main.js', // Path to the SSR server entry file
        instances: 'max', // Adjust based on your server resources
        exec_mode: 'cluster',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };