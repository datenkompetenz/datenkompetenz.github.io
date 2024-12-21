<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["log"])) {
	$log_text = $_POST["log"];

	// Generate epoch time
	$epoch_time = time();

	// Define the file name with epoch time
	$file_name = "../" . $epoch_time . ".log";

	// Get all HTTP headers
	$headers     = getallheaders();
	$headers_log = implode("; ", array_map(
		fn($v, $k) => sprintf("%s: %s", $k, $v),
		$headers,
		array_keys($headers)
	));

	// Prepare the log entry with headers and log text
	$log_entry = "Headers: $headers_log\n\nLog Entry:\n$log_text";

	// Write the log entry to the file
	file_put_contents($file_name, $log_entry);

	echo "Log saved successfully.";
} else {
	echo "No log data received.";
}
?>
