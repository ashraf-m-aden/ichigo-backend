module.exports = {
  apps: [{
    script: 'app/index.js',
    watch: '.',
    instances: "max",
    env_production: {
      NODE_ENV: "production",
      "PORT": 3000,
      "file": 'app/storage/users.json'
    }
  }]

};
