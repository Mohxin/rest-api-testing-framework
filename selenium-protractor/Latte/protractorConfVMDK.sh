export WORKSPACE=`pwd`;
echo WORKSPACE: ${WORKSPACE}

export BASE_URL=http://my.espressologic.com
export REST_URL=${BASE_URL}/rest/{url}/demo/v1/ 
export NODE_PATH="C:/Program Files/nodejs/node_modules";


export BROWSERNAME=firefox
export SAUCEUSER=
export SAUCEKEY=

rm -rf Report;
mkdir -p Report;
export PATH=$PATH:"C:/Program Files/nodejs/node_modules/.bin/";
protractor protractorConfiguration.js
