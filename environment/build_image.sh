#! /bin/bash

run () {
	local current_dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
	pushd $current_dir > /dev/null
	buildkit_progress=plain docker build \
	  -f Dockerfile.dev \
	  -t wmf_scraper_front:0.1.1 \
	  --progress=plain \
	  ..
	popd > /dev/null
}

run