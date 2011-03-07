SHELL = /bin/sh
CHMOD = chmod
CP = cp
MV = mv
NOOP = $(SHELL) -c true
RM_F = rm -f
RM_RF = rm -rf
TEST_F = test -f
TOUCH = touch
UMASK_NULL = umask 0
DEV_NULL = > /dev/null 2>&1
MKPATH = mkdir -p
CAT = cat
MAKE = make
OPEN = open
ECHO = echo
ECHO_N = echo -n
JAVA = java

all :: js copy_js package deploy run

custom :: js copy_js package deploy

clean :: clean_libs

clean_libs:
	-$(RM_RF) lib
	
package:
	cp index.html app/views/First/First-scene.html
	palm-package.bat .

deploy:
	palm-install.bat com.nojco.babylog_1.0.0_all.ipk
	
run:
	palm-launch.bat com.nojco.babylog
	
copy_js:
	cp lib/phonegap.js scripts/phonegap.js
	
js: lib/phonegap.js

lib/phonegap.js: scripts/palm-scripts/phonegap.js.base scripts/palm-scripts/acceleration.js scripts/palm-scripts/accelerometer.js scripts/palm-scripts/audio.js scripts/palm-scripts/camera.js scripts/palm-scripts/contacts.js scripts/palm-scripts/debugconsole.js scripts/palm-scripts/device.js scripts/palm-scripts/file.js scripts/palm-scripts/geolocation.js scripts/palm-scripts/map.js scripts/palm-scripts/network.js scripts/palm-scripts/notification.js scripts/palm-scripts/orientation.js scripts/palm-scripts/position.js scripts/palm-scripts/sms.js scripts/palm-scripts/storage.js scripts/palm-scripts/telephony.js
	$(MKPATH) lib
	$(RM_F) $@
	$(CAT) scripts/palm-scripts/phonegap.js.base >> $@
	$(CAT) scripts/palm-scripts/acceleration.js >> $@
	$(CAT) scripts/palm-scripts/accelerometer.js >> $@
	$(CAT) scripts/palm-scripts/audio.js >> $@
	$(CAT) scripts/palm-scripts/camera.js >> $@
	$(CAT) scripts/palm-scripts/contacts.js >> $@
	$(CAT) scripts/palm-scripts/debugconsole.js >> $@
	$(CAT) scripts/palm-scripts/device.js >> $@
	$(CAT) scripts/palm-scripts/file.js >> $@
	$(CAT) scripts/palm-scripts/geolocation.js >> $@
	$(CAT) scripts/palm-scripts/map.js >> $@
	$(CAT) scripts/palm-scripts/network.js >> $@
	$(CAT) scripts/palm-scripts/notification.js >> $@
	$(CAT) scripts/palm-scripts/orientation.js >> $@
	$(CAT) scripts/palm-scripts/position.js >> $@
	$(CAT) scripts/palm-scripts/sms.js >> $@
	$(CAT) scripts/palm-scripts/storage.js >> $@
	$(CAT) scripts/palm-scripts/telephony.js >> $@
