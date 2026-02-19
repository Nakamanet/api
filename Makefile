docker build:
	docker build --no-cache -t adonis-app .

docker run:
	docker run -p 3333:3333 adonis-app
# 	we need to specify the port of the container 
#   so we can access the server listening on that port