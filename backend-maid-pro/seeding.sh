#!/bin/bash
fileSeed=('user-seed' 'building-type-seed' 'services-seed');

for i in ${fileSeed[@]}
do
  eval "$1 sequelize db:seed --seed $i"
done
