#!/bin/sh

#set fail-on-error
set -e;

#Constant names
EXE_NAME="mcl"
CONTROL_SRC="./src/packaging/PKGBUILD"
CONTROL_DEST="./Dist/.tmp/PKGBUILD"
PKG_EXT="*.pkg*"


function do_dep_checks() {
	MISSING_DEP=0;
	echo "[!] Checking dependencies... "
	#DEPS DEFINED HERE
	for name in makepkg
	do
		echo -n "Checking for $name... "
		if [ $(which $name 2>/dev/null) ]
		then
			echo "FOUND";
		else
			echo "MISSING";
			MISSING_DEP=1;
		fi
	done
	
	if [ $MISSING_DEP -eq 1 ]
	then
		echo "Some dependency checks failed. Cannot proceed.";
		exit 1;
	fi
}


#make directories for the model
function make_directories() {
	echo "[!] Creating directories...";
	mkdir -pv "Dist" || true;
    mkdir -pv "Dist/.tmp" || true;
}


#prepare build
function prepare() {
	echo "[!] Preparing package resources...";

    #copy executable
    cp -v "./Build/$EXE_NAME" "./Dist/.tmp/$EXE_NAME";

    #copy control
    cp -v "$CONTROL_SRC" "$CONTROL_DEST";
}


#build package
function build() {
	echo "[!] Building package...";
    cd "./Dist/.tmp";
    makepkg;
    cd ../../
}


#export package
function export_packages() {
    echo "[!] Exporting packages...";
    find "./Dist/.tmp" -name $PKG_EXT -exec cp -v "{}" "./Dist" \;
}


#clean temporaries
function clean_tmp() {
    echo "[!] Cleaning temporaries...";
    rm -r "./Dist/.tmp"
}


#smooth exit function
function do_smooth_exit() {
	echo "[!] Packaging complete.";
	exit 0;
}

do_dep_checks;
make_directories;
prepare;
build;
export_packages;
clean_tmp;
do_smooth_exit;