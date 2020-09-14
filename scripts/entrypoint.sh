#!/bin/bash

mount -o bind /tmp/lux/node_modules /lux/node_modules
mount -o bind /tmp/custom-elements/node_modules /lux/src/custom-elements/node_modules

mount -t tmpfs tmpfs /lux/src/custom-elements/.stencil
#mkdir /tmp/dist
#mount -o bind /tmp/dist /lux/dist
#mount -t tmpfs tmpfs /lux/dist

RED='\E[0;31m'
GREEN='\E[0;32m'
NC='\E[0m' # No Color

if [ ! -h /lux/src/custom-elements/dist ]; then
    if [ -d /lux/src/custom-elements/dist ]; then
        echo -e "${RED}src/custom-elements/dist is a directory. Please, remove it${NC}";
        exit 1;
    fi
    ln -s /lux/dist/js/ce /lux/src/custom-elements/dist || ( echo "Cannot create symbolic link from src/custom-elements/dist to dist/js/ce"; exit 1 )
fi

addheader_lux() {
    while IFS= read -r line; do
        echo -e "${RED}[LUX]${NC} $line "
    done
    tput sgr0
}

addheader_custom_elements() {
    while IFS= read -r line; do
        echo -e "${GREEN}[CE]${NC} $line"
    done
}

start() {
    cd /lux
    unbuffer npm run start 2>&1 | addheader_lux &

    cd /lux/src/custom-elements
    while [ ! -d /lux/dist/js/ce ]; do sleep 1; done
    unbuffer npm run start 2>&1 | addheader_custom_elements
}

build() {
    cd /lux
    unbuffer npm run build 2>&1 | addheader_lux
    cd /lux/src/custom-elements
    unbuffer npm run build 2>&1 | addheader_custom_elements
}

test() {
    rm -rf /lux/reports /lux/test/bitmaps_test
    mkdir -p /lux/reports/html_report/non_responsive{,_ce}
    mkdir -p /lux/reports/html_report/responsive
    cp -a /lux/config/backstop_data/bitmaps_reference/non_responsive /lux/reports/html_report/non_responsive_ce/bitmaps_reference
    cp -a /lux/config/backstop_data/bitmaps_reference/non_responsive /lux/reports/html_report/non_responsive/bitmaps_reference
    cp -a /lux/config/backstop_data/bitmaps_reference/responsive /lux/reports/html_report/responsive/bitmaps_reference

    cd /lux
    npm run test
}

OPTION=$1
if [ -z ${OPTION} ]; then
    OPTION='start'
fi

case ${OPTION} in
    start)
        mount -t tmpfs tmpfs /lux/dist
        start
        ;;
    build)
        build
        ;;
    test)
        mount -t tmpfs tmpfs /lux/dist
        build
        test
        ;;
    test-e2e)
        mount -t tmpfs tmpfs /lux/dist
        build
        cd /lux
        npx gulp serve 2>&1 >/dev/null &
        ./node_modules/.bin/cypress run
        npx gulp serve:stop
        ;;
    approve)
        cd /lux
        mount -o bind /lux/config/backstop_data/bitmaps_reference/non_responsive /lux/reports/html_report/non_responsive/bitmaps_reference
        mount -o bind /lux/config/backstop_data/bitmaps_reference/responsive /lux/reports/html_report/responsive/bitmaps_reference
        npm run approve
        ;;
    *)
        exec "$@"
        ;;
esac
