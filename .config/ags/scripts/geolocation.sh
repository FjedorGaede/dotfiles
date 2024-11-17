#!/bin/bash

# Returns { country, city, region, coordinates: { long: number, lat: number } } as JSON
curl -s ipinfo.io | jq '{ country: .country, city: .city, region: .region, coordinates: .loc | split(",") | {lat: .[0], long: .[1]} }'
