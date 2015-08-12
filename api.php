<?php
header('Access-Control-Allow-Origin: *');

define('DB_NAME', 'prometheuskpo_c');
define('DB_USER', 'prometheuskpo_c');
define('DB_PASSWORD', 'DJKNJ2aR');
define('DB_HOST', 'prometheuskpo.com.mysql');

$dbp = @mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);	// logging in db
@mysql_select_db(DB_NAME, $dbp) or die("db connect err");

if((isset($_GET['data']))&& $_GET['data']=="accounts"){
	$sql = "SELECT * FROM `pro_crm_accounts`";
	$query = mysql_query($sql);
	$rows = mysql_num_rows($query);
	if($rows > 0){
		$accounts = array();
		while($account = mysql_fetch_array($query,MYSQL_ASSOC){
			$accounts[] = array('account_name'=>$account['account_name']);
			$output = json_encode(array('Accounts' => $accounts));
			echo $output;
		}
	}
}

if((isset($_GET['data']))&& $_GET['data']=="contacts"){
	$sql = "SELECT * FROM `pro_crm_contacts`";
	$query = mysql_query($sql);
	$rows = mysql_num_rows($query);
	if($rows > 0){
		$contacts = array();
		while($contact = mysql_fetch_array($query,MYSQL_ASSOC){
			$contacts[] = array('firstname'=>$contact['firstname']);
			$output = json_encode(array('Contacts' => $contacts));
			echo $output;
		}
	}

}

if((isset($_GET['data']))&& $_GET['data']=="employees"){
	$sql = "SELECT * FROM `pro_employees`";
	$query = mysql_query($sql);
	$rows = mysql_num_rows($query);
	if($rows > 0){
		$employees = array();
		while($employee = mysql_fetch_array($query,MYSQL_ASSOC){
			$employees[] = array('firstname'=>$employee['firstname']);
			$output = json_encode(array('Employees' => $employees));
			echo $output;
		}
	}

}