docker stop pardoes
docker rm pardoes
docker build -t pardoes:latest ./
docker create --name pardoes pardoes
docker start pardoes