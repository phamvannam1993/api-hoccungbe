module.exports = {
  apps: [
    {
      name: 'dropshipping-api-game',
      script: 'dist/main.js',
      cwd: '/var/www/api-game',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 5001
      }
    }
  ]
}