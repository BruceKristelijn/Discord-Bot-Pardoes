docker stop pardoes
docker rm pardoes
docker build -t pardoes:latest ./
docker run --name pardoes -v "%cd%\data":"/app/data" pardoes
pause