#! /bin/bash

source ${HOME}/source/scripts/bash_utils.sh

print_general_help() {
    echo
    print_color "Welcome to the Development Environment available functions" $COLOR_GREEN
    echo
    print_color "Syntax: help [bump|bump_docker]" $COLOR_PINK
    echo
    print_color "options:" $COLOR_WHITE
    print_color "bump         Bumps version and creates tag" $COLOR_YELLOW
    print_color "bump_docker  Bumps docker image version" $COLOR_YELLOW
    echo
}

print_bump_help() {
    print_color "Run with one of the allowed options: patch | minor | major" $COLOR_GREEN
}

help() {
    local argument="$1"
    case "$argument" in
        test)
            print_test_help $@
        ;;
        precommit)
            print_precommit_help $@
        ;;
        bump)
            print_bump_help $@
        ;;
        bump_docker)
            print_bump_help $@
        ;;
        *)
            print_general_help $@
        ;;
    esac
}

help $@