<?php
$n = intval(isset($_GET['n']) ? $_GET['n'] : 0);
if ($n < 0) {
    
    echo json_encode(array('error' => 'Invalid input: n must be a non-negative integer'));
} 
else {
    
    $fibSequence = array(0, 1);

    
    for ($i = 2; $i < $n; $i++) {
        $nextValue = $fibSequence[$i - 1] + $fibSequence[$i - 2];
        $fibSequence[] = $nextValue;
    }
$response = array(
        'length' => $n,
        'fibSequence' => $fibSequence,
    );
 header('Content-Type: application/json');
    echo json_encode($response);
}
?>
