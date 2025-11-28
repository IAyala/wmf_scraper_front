#! /bin/bash

source_bashrc() {
  source ${HOME}/.bashrc
}

source_bash_utils() {
  if [ -d ${HOME}/source/scripts/ ]
  then
    source ${HOME}/source/scripts/bash_utils.sh
  fi
}

init_git() {
    pushd ${HOME}/source
    if [ -d ${HOME}/source/.git ]; then
        print_color "Git already initialized" $COLOR_GREEN
    else
        print_color "Initializing Git repo" $COLOR_PINK
        git init
        print_color "Adding remote" $COLOR_PINK
		git remote add origin https://github.com/IAyala/wmf_scraper_front.git
    fi
    popd
}

init_npm() {
    npm install
}

change_permissions() {
    chmod +x -R ${HOME}/source/scripts
}

convert_line_endings() {
    directories_to_convert="${HOME}/source/scripts"
    for directory in ${directories_to_convert}; do
        print_color "Converting file endings for ${directory}" $COLOR_PINK
        pushd ${directory}
        find . -type f -exec sed -i 's/\r$//' {} \;
        popd
    done
}

change_local_ownership() {
    if [ -d ${HOME}/.local/share/code-server/User ]
    then
      print_color "Change coder-server mount ownership" $COLOR_PINK
      find ${HOME}/.local/share/code-server/User -print0 | xargs -0 -n 1 -P 8 chown coder:coder
    fi
}

change_source_ownership() {
    if [ -d ${HOME}/source ]
    then
      print_color "Change source mount ownership" $COLOR_PINK
      find ${HOME}/source -print0 | xargs -0 -n 1 -P 8 chown coder:coder
    fi
}

run () {
    source_bashrc
    source_bash_utils
    init_git
    init_npm
    convert_line_endings
    change_local_ownership
    change_source_ownership
    change_permissions
}

run