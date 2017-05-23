<?php
//ini_set('error_reporting', E_WARNING);
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);

class webpack {
    static $config = array(
        "manifestPath" => "/public/assets/manifest.json",
    );

    static function compile() {
        $cmd = "echo `npm run build-production`;";
        $output = system($cmd);
        var_dump($output);

        return $output;
    }

    function getManifest() {
        $str = file_get_contents($_SERVER["DOCUMENT_ROOT"].self::$config["manifestPath"]);
        $json = json_decode($str, true);
        return is_array($json) ? $json : false;
    }

    static function path($filename) {
        $cache = new CPHPCache;
        $cacheTime = getenv("NODE_ENV") != 'development' ? 86400 : 0;
        $cacheId = 'webpack.manifest';
        $cachePath = 'webpack';
        $json = false;

        if ($cacheTime > 0 && $cache->InitCache($cacheTime, $cacheId, $cachePath)) {
            $json = $cache->GetVars();
            if (file_exists($_SERVER["DOCUMENT_ROOT"].$json[$filename])) {
                return $json[$filename];
            } else {
                // it's mean manifest now is not actual
                $json = false;
            }
        }

        if (!$json) {
            $json = self::getManifest();
            if ($cacheTime > 0) {
                $cache->StartDataCache($cacheTime, $cacheId, $cachePath);
                $cache->EndDataCache($json);
            }
        }

        if ($json) {
            return $json[$filename];
        } else {
            throw new Exception('Please generate front application. Use `npm run build` in current template directory ');
        }
    }
}

?>
