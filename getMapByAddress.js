const getMapByAddress = () => {
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
    const data = Maps.newGeocoder().geocode(cells[i][0]).results[0];
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

  fillCell("B2", arrAddress);
  fillCell("C2", arrLat);
  fillCell("D2", arrLng);
  fillCell("E2", arrPostal);
  fillCell("F2", arrCountry);
  fillCell("G2", arrState);
  fillCell("H2", arrCity);
  fillCell("I2", arrStreet);
  fillCell("J2", arrNumber);
  fillCell("K2", arrLink);
};
