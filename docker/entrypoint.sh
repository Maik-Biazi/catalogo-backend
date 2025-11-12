#!/bin/sh
set -e

echo "[entrypoint] aguardando DB..."

# espera o banco ficar pronto
until nc -z $PG_HOST $PG_PORT; do
  echo "Aguardando banco $PG_HOST:$PG_PORT..."
  sleep 6
done

echo "[entrypoint] knex migrate:latest"
npm run migrate

echo "[entrypoint] knex seed:run"
npm run seed

echo "[entrypoint] start API"
exec npm start
