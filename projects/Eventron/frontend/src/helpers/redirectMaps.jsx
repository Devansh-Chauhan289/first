import React from 'react';

function RedirectButton() {
  // The URL you provided
  const url = "https://www.google.com/maps/place/Mama+Chicken+Mama+Franky+house/@27.1469251,78.0117335,14z/data=!3m1!5s0x397476c9cd9a5e53:0xfc746a0524ad6869!4m14!1m7!3m6!1s0x397476ce51dabfdd:0x25df2218d6c48667!2sMama+Chicken+Mama+Franky+house!8m2!3d27.1618105!4d78.0116294!16s%2Fg%2F124sq_cr7!3m5!1s0x397476ce51dabfdd:0x25df2218d6c48667!8m2!3d27.1618105!4d78.0116294!16s%2Fg%2F124sq_cr7?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoJLDEwMjExMjMzSAFQAw%3D%3D";

  // Function to extract the name from the URL
  function ExtractName(url) {
    // Using URLSearchParams to parse the URL and extract the place name
    const placeNameMatch = url.match(/place\/([^/]+)/);
    if (placeNameMatch) {
      return decodeURIComponent(placeNameMatch[1].replace(/\+/g, ' '));
    }
    return "Unknown Place";
  }

  const placeName = ExtractName(url);

  // Function to handle button click (redirect to the link)
  function handleRedirect() {
    window.location.href = url;
  }

  return (
    <div>
      <button onClick={handleRedirect}>
        {placeName} {/* Display the name on the button */}
      </button>
    </div>
  );
}

export default RedirectButton;
