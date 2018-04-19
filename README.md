# nginxstatic
A docker image for static file sefver based on [nginx](https://nginx.org/en/)


## Usage
1. Pull the repo. and put all your static files in the web directory.
2. Build the docker image by ```docker build``` to build your docker image.
3. Push the image to your Docker Registry then deploy.

You can use it in aliyun cloud platform just like what I did in the docker-compose.yml file. It makes you support green-blue deployment and healthcheck when you use swarm mode docker. Just configure ```replicas``` to scale as you like. 


## Features
* single node && swarm mode support.



## License

[MIT License](http://posa88.mit-license.org/) © Yongbo Wu 
