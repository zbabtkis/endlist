<?php

class Library {
	public function __construct($file) {
		$f_info = pathinfo($file);
		$this->path = $file;
		if(isset($f_info['extension'])) {
			$this->extension = $f_info['extension'];
		}
		$this->filename = $f_info['filename'];
	}
	public function renderJS(){
		$this->rendered['tag'] = "<script";
		$this->rendered['path'] = " src='" . $this->path . "'";
		$this->rendered['type'] = " type='text/javascript'";
		$this->rendered['end'] = "></script>";
		$this->rendered = $this->rendered['tag'] . 
							$this->rendered['path'] .
							$this->rendered['type'] . 
							$this->rendered['end'];
	}
	public function render() {
		if(!isset($this->extension)) {
			return 0;
		}
		switch($this->extension) {
			case 'js':
				$this->renderJS();
				print($this->rendered);
			default:
				break;
		}
	}
}
$include_dirs = array(
	'libs' => 'libraries/*',
	'js' => 'js/*');
foreach($include_dirs as $dir) {
	$dir_files = glob ($dir);
	foreach($dir_files as $file) {
		$lib_files[] = $file;
	}
}
foreach($lib_files as $lib) {
	$libs[] = new Library($lib);
}

function renderJS() {
	global $libs;
	foreach($libs as $lib) {
		if(isset($lib->extension)) {
			if($lib->extension == 'js') {
				$lib->render();
			}
		}
	}
}

?>