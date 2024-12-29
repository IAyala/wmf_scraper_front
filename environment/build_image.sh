#! /bin/bash

run () {
	export DOCKER_BUILDKIT=1
	local current_dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
	pushd $current_dir > /dev/null
	buildkit_progress=plain docker build \
	  -f Dockerfile.dev \
	  --build-arg SSH_KEY="$(cat ${HOME}/.ssh/id_rsa)" \
	  -t wmf_scraper_front:1.0.1 \
	  --progress=plain \
	  ..
	popd > /dev/null
}

run