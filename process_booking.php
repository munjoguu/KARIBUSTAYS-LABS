<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'db_connect.php';
echo "Connected to: " . $conn->host_info . " | Server: " . $conn->server_info . "<br>";

$hotelMap = [
    "diani-villa" => 1, "mara-tent" => 2, "naivasha-cabin" => 3,
    "nairobi-studio" => 4, "mtkenya-cottage" => 5, "lamu-house" => 6
];

$guestName   = $conn->real_escape_string($_POST['guestName']);
$guestEmail  = $conn->real_escape_string($_POST['guestEmail']);
$hotelId     = $hotelMap[$_POST['property']];
$checkInDate = $_POST['checkInDate'];
$numNights   = (int)$_POST['numNights'];
$numGuests   = (int)$_POST['numGuests'];

$checkInObj = new DateTime($checkInDate);
$checkInObj->modify("+$numNights days");
$checkOutDate = $checkInObj->format('Y-m-d');
$bookingDate = date('Y-m-d');

$stmt = $conn->prepare("INSERT INTO bookings (customer_name, customer_email, hotel_id, check_in, check_out, guests, booking_date) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssisssi", $guestName, $guestEmail, $hotelId, $checkInDate, $checkOutDate, $numGuests, $bookingDate);

if ($stmt->execute()) {
    echo "<h2>SUCCESS</h2><p>Booking saved for $guestName.</p>";
} else {
    echo "<h2>FAILED</h2><p>" . $stmt->error . "</p>";
}
$stmt->close();
$conn->close();
?>