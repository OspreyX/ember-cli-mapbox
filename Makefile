all: \
	mapbox

mapbox: node_modules/mapbox.js
	$(MAKE) -C node_modules/mapbox.js
	mkdir -p vendor/mapbox.js/dist
	cp -r node_modules/mapbox.js/dist/* vendor/mapbox.js/dist

clean:
	rm -rf vendor/mapbox.jsmake
	$(MAKE) clean -C node_modules/mapbox.js

.PHONY: clean mapbox