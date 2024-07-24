const dns = require('dns');

const connectionString = 'mongodb://louislee0996:1111@ac-ilfztka-shard-00-00.ppvzsyb.mongodb.net:27017,ac-ilfztka-shard-00-01.ppvzsyb.mongodb.net:27017,ac-ilfztka-shard-00-02.ppvzsyb.mongodb.net:27017/mydatabase?authSource=admin&replicaSet=atlas-435b5x-shard-0&retryWrites=true&w=majority&ssl=true';

// Extract the hostnames from the connection string
const hostnames = connectionString.match(/\/\/(.*?):/)[1].split(',');

// Resolve each hostname to an IP address
hostnames.forEach(hostname => {
  const cleanHostname = hostname.split(':')[0];
  dns.lookup(cleanHostname, (err, address, family) => {
    if (err) {
      console.error(`Error resolving ${cleanHostname}:`, err);
    } else {
      console.log(`IP address of ${cleanHostname}: ${address} (IPv${family})`);
    }
  });
});