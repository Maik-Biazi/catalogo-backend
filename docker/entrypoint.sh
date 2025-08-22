#!/bin/sh
set -e

echo "[entrypoint] aguardando DB..."
sleep 2

echo "[entrypoint] knex migrate:latest"
npm run migrate

echo "[entrypoint] knex seed:run"
npm run seed

echo "[entrypoint] start API"
exec npm start
