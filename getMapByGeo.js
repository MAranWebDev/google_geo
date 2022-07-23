const getMapByGeo = () => {
  const sheet = SpreadsheetApp.getActiveSheet();
  const cells = sheet.getDataRange().getValues();
  const arrAddress = [],
    arrLat = [],
    arrLng = [],
    arrPostal = [],
    arrCountry = [],
    arrState = [],
    arrCity = [],
    arrStreet = [],
    arrNumber = [],
    arrLink = [];

  const findType = (arr) => (value) => {
    const result = arr.filter(
      ({ types }) => types.filter((el) => el === value)[0]
    )[0];
    if (result) return result.long_name;
    return;
  };

  const fillCell = (range, arr) =>
    sheet.getRange(range).offset(0, 0, arr.length).setValues(arr);

  for (let i = 1; i < cells.length; i++) {
    const data = Maps.newGeocoder().reverseGeocode(cells[i][0], cells[i][1])
      .results[0];
    let address,
      lat,
      lng,
      postalCode,
      country,
      state,
      city,
      street,
      streetNumber,
      link;

    if (data) {
      const addressComponents = findType(data.address_components);
      address = data.formatted_address;
      lat = data.geometry.location.lat;
      lng = data.geometry.location.lng;
      postalCode = addressComponents("postal_code");
      country = addressComponents("country");
      state = addressComponents("administrative_area_level_1");
      city = addressComponents("locality");
      street = addressComponents("route");
      streetNumber = addressComponents("street_number");
      link = `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`;
    }

    arrAddress.push([address]);
    arrLat.push([lat]);
    arrLng.push([lng]);
    arrPostal.push([postalCode]);
    arrCountry.push([country]);
    arrState.push([state]);
    arrCity.push([city]);
    arrStreet.push([street]);
    arrNumber.push([streetNumber]);
    arrLink.push([link]);

    Utilities.sleep(1000);
    // console.log(JSON.stringify(data, null, 4));
  }

  fillCell("C2", arrAddress);
  fillCell("D2", arrLat);
  fillCell("E2", arrLng);
  fillCell("F2", arrPostal);
  fillCell("G2", arrCountry);
  fillCell("H2", arrState);
  fillCell("I2", arrCity);
  fillCell("J2", arrStreet);
  fillCell("K2", arrNumber);
  fillCell("L2", arrLink);
};
