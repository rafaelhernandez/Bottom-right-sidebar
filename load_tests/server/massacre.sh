#!/bin/bash
for number in {1..4}
do
 artillery run ./artillery_sidebar_ssr_aws.yml &
done
exit 0
