<?php
	if (!$_GET['tag']) {
		http_response_code(400);
		exit();
	}

	// data setup
	$tag = $_GET['tag'];
	$last_week_utc = time() - (7 * 24 * 60 * 60 * 1000);
	$url_new_questions = "https://api.stackexchange.com/2.2/questions?pagesize=10&fromdate=$last_week_utc&tagged=$tag&order=desc&sort=creation&site=stackoverflow&filter=!gB7l8-9K.tX5xdn(l0fHLOUzt3.ed4wnOzL";
	$url_most_voted = "https://api.stackexchange.com/2.2/questions?pagesize=10&fromdate=$last_week_utc&tagged=$tag&order=desc&sort=votes&site=stackoverflow&filter=!gB7l8-9K.tX5xdn(l0fHLOUzt3.ed4wnOzL";

	$result_new;
	$result_most_voted;

	// curl setup
	$curl = curl_init();
	curl_setopt_array($curl, [
		CURLOPT_RETURNTRANSFER => 1,
		CURLOPT_URL => $url_new_questions,
		CURLOPT_ENCODING => 'gzip'
	]);

	// curl fetch
	$result_new = json_decode(curl_exec($curl), true);

	curl_setopt($curl, CURLOPT_URL, $url_most_voted);
	$result_most_voted = json_decode(curl_exec($curl), true);

	curl_close($curl);

	// data parse
	$merged_data = array_merge($result_new['items'], $result_most_voted['items']);

	usort($merged_data, function($a, $b) {
		return ($a['creation_date'] > $b['creation_date'] ? -1 : 1);
	});

	// send response
	http_response_code(200);
	header('Content-Type: application/json');
	echo(json_encode($merged_data));
?>