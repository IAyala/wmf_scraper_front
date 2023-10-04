#! /bin/bash

source_utils () {
  local current_dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
  pushd $current_dir
  source ./bash_utils.sh
  popd
}

source_utils

print_color "Adding 'bump' function to bash" $COLOR_PINK
bump () {
    ${HOME}/source/scripts/run_bump.sh $@
}
print_color "Adding 'bump_docker' function to bash" $COLOR_PINK
bump_docker () {
    ${HOME}/source/scripts/run_bump.sh docker $@
}
print_color "Adding 'help' function to bash" $COLOR_PINK
help () {
    ${HOME}/source/scripts/run_help.sh $@
}