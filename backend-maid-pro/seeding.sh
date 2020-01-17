#!/bin/bash
fileSeed=('user-seed' 'building-type-seed' 'services-seed');

for flie in ${fileSeed[@]}
do
  eval "$1 sequelize db:seed --seed $flie"
done
