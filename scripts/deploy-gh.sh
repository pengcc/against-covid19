#!/bin/bash

DIST="wwwroot/dist"
DOMAIN="www.againstcovid.org"

function _createCnameFile() {
    echo "preparing deploy -- create a CNAME FILE"
    echo $DOMAIN > ${DIST}/CNAME
}

function _depoly() {
    echo "start deploy to github pages ##############"
    gh-pages -d wwwroot/dist
}

function main() {
    _createCnameFile
    _depoly
}

main