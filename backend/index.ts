import  app  from './app';
Bun.serve({
    port: 3000,
    fetch : app.fetch,
});

console.log('Server is running on port 3000');