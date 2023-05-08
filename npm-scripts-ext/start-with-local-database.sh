#!/usr/bin/env bash

which mysql
if [ $? -ne 0 ]
then
  echo "Please intstall MySQL Client!"
  exit 1
fi

docker-compose -f ./docker-compose.yml -p pm-api up -d

while ! mysql -u"root" -p"test-password" -h"localhost" --protocol=tcp -e"SELECT 1" &> /tmp/setup-local-dev-env
do
  sleep 1
done

mysql -u"root" -p"test-password" -h"localhost" --protocol=tcp -s < ./setup.sql &> /tmp/setup-local-dev-env
