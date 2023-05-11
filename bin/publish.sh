#!/bin/bash

npm run build:prod

cp -r dist/* docs
