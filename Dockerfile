<<<<<<< HEAD
FROM public.ecr.aws/docker-library/node:20-alpine
=======
FROM node:20-alpine
>>>>>>> 0da40e17b0f7f865fc892123bfacd1386a829d44
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
RUN chmod +x docker/entrypoint.sh

ENV NODE_ENV=production
EXPOSE 3000

ENTRYPOINT ["docker/entrypoint.sh"]
