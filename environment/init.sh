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

setup_bashrc_symlink() {
    print_color "Setting up bashrc symlink" $COLOR_PINK
    # Backup existing .bashrc if it exists and is not already a symlink
    if [ -f ${HOME}/.bashrc ] && [ ! -L ${HOME}/.bashrc ]; then
        print_color "Backing up existing .bashrc" $COLOR_YELLOW
        mv ${HOME}/.bashrc ${HOME}/.bashrc.backup
    fi
    
    # Create symlink to custom bashrc
    if [ ! -L ${HOME}/.bashrc ]; then
        print_color "Creating symlink to custom bashrc" $COLOR_GREEN
        ln -sf ${HOME}/source/environment/.bashrc ${HOME}/.bashrc
    else
        print_color "Bashrc symlink already exists" $COLOR_GREEN
    fi
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
    setup_bashrc_symlink
    init_git
    init_npm
    convert_line_endings
    change_local_ownership
    change_source_ownership
    change_permissions
}

run