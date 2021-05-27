docker stop pardoes
docker rm pardoes
docker build -t pardoes:latest ./
docker volume create pardoes-vol
docker run --name pardoes --mount source=pardoes-vol,target=/bot-settings pardoes