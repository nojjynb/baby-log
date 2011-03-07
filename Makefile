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
	cp lib/phonegap.js js/phonegap.js
	
js: lib/phonegap.js

lib/phonegap.js: js/palm-js/phonegap.js.base js/palm-js/acceleration.js js/palm-js/accelerometer.js js/palm-js/audio.js js/palm-js/camera.js js/palm-js/contacts.js js/palm-js/debugconsole.js js/palm-js/device.js js/palm-js/file.js js/palm-js/geolocation.js js/palm-js/map.js js/palm-js/network.js js/palm-js/notification.js js/palm-js/orientation.js js/palm-js/position.js js/palm-js/sms.js js/palm-js/storage.js js/palm-js/telephony.js
	$(MKPATH) lib
	$(RM_F) $@
	$(CAT) js/palm-js/phonegap.js.base >> $@
	$(CAT) js/palm-js/acceleration.js >> $@
	$(CAT) js/palm-js/accelerometer.js >> $@
	$(CAT) js/palm-js/audio.js >> $@
	$(CAT) js/palm-js/camera.js >> $@
	$(CAT) js/palm-js/contacts.js >> $@
	$(CAT) js/palm-js/debugconsole.js >> $@
	$(CAT) js/palm-js/device.js >> $@
	$(CAT) js/palm-js/file.js >> $@
	$(CAT) js/palm-js/geolocation.js >> $@
	$(CAT) js/palm-js/map.js >> $@
	$(CAT) js/palm-js/network.js >> $@
	$(CAT) js/palm-js/notification.js >> $@
	$(CAT) js/palm-js/orientation.js >> $@
	$(CAT) js/palm-js/position.js >> $@
	$(CAT) js/palm-js/sms.js >> $@
	$(CAT) js/palm-js/storage.js >> $@
	$(CAT) js/palm-js/telephony.js >> $@
