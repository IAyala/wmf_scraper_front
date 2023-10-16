#! /bin/bash

run () {
	local current_dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
	pushd $current_dir > /dev/null
	docker stop wmf_scraper_front || true
	docker rm wmf_scraper_front || true
	docker run \
		--security-opt seccomp=unconfined \
		--name wmf_scraper_front \
		-p 10000:10000 \
		-p 9999:9999 \
		-v ${current_dir}/../:/home/coder/source \
		--entrypoint /home/coder/init.sh \
		wmf_scraper_front:1.0.1
	popd > /dev/null
}

run $@
