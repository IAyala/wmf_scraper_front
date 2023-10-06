source /home/coder/source/scripts/bash_utils.sh
source /home/coder/source/scripts/bash_functions.sh
print_color "Setting CURL_CA_BUNLDE" $COLOR_PINK
export CURL_CA_BUNLDE=/etc/ssl/certs/ca-certificates.crt
print_color "Setting REQUESTS_CA_BUNDLE" $COLOR_PINK
export REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
print_color "Setting LD_LIBRARY_PATH" $COLOR_PINK
export LD_LIBRARY_PATH=/usr/local/lib
echo
print_color "############################" $COLOR_GREEN
print_color "#                          #" $COLOR_GREEN
print_color "#   ENVIRONMENT IS READY   #" $COLOR_GREEN
print_color "#       run 'help' to      #" $COLOR_GREEN
print_color "#        see options       #" $COLOR_GREEN
print_color "#                          #" $COLOR_GREEN
print_color "############################" $COLOR_GREEN
source ${HOME}/.nvm/nvm.sh
print_color "NODE VERSION = $(node -v)" $COLOR_PINK
print_color "NPM VERSION = $(npm -v)" $COLOR_PINK
print_color "YARN VERSION = $(yarn -v)" $COLOR_PINK