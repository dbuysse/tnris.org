XDOMAIN_FILE := ../static/bower_components/xdomain/dist/xdomain.min.js 

all: upload

bower: $(XDOMAIN_FILE)

$(XDOMAIN_FILE):
	cd ../ && bower install

upload: bower
	aws s3 cp xdomain-proxy.html s3://tnris-datadownload/xdomain-proxy.html
	aws s3 cp --recursive ../static/bower_components/xdomain s3://tnris-datadownload/bower_components/xdomain
