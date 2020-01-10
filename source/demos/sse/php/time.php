<?php
function show_time(){
    set_time_limit(0);
    header("Content-Type: text/event-stream\n\n");
    header('X-Accel-Buffering: no');
    header('Cache-Control: no-cache');
    $counter = rand(1, 10);
    while (1) {
      echo "event: ping\n";
      $curDate = date(DATE_ISO8601);
      echo 'data: {"time": "' . $curDate . '"}';
      echo "\n\n";
      $counter--;
      if (!$counter) {
        echo 'data: This is a message at time ' . $curDate . "\n\n";
        $counter = rand(1, 10);
      }
      #ob_flush();
      flush();
      sleep(1);
    }

}
function show_time1(){
    $time = date('r');
    echo "data: {$time}\n\n";
    flush();
}
function show_time2(){
    set_time_limit(0);
    header('Content-Type: text/event-stream');
    header('X-Accel-Buffering: no');
    while(true) {
        $sleepSecs = mt_rand(250, 500) / 1000.0;
        usleep($sleepSecs * 1000000);
        $bid = mt_rand(1000, 2000) / 1000.0;
        $t = microtime(true);
        $d = array(
            'timestamp' => gmdate('Y-m-d H:i:s', $t) . sprintf('. %03d', ($t*1000)%1000),
            'symbol' => 'funny',
            'bid' => $bid,
        );
        echo 'data:' . json_encode($d) . PHP_EOL . PHP_EOL;
        @ob_flush(); @flush();
    }
}
#show_time2();
show_time2();
?> 

