document.querySelector('#runBtn').addEventListener('click', e => {
  e.preventDefault();
  const url = endpoint + 'ksamsok/api?x-api=test&method=search&hitsPerPage=500&fields=url,mediaLicense,create_fromTime,create_toTime,byline,copyright&query=itemType=foto%20AND%20thumbnailExists=j%20AND%20NOT%20mediaLicense=%22*pdmark%22%20AND%20create_fromTime%3C1971%20AND%20NOT%20create_fromTime%3C1826%20AND%20serviceOrganization=' + select.value + '&recordSchema=xml';

  fetch(url, {
    headers: {
      'Accept': 'application/json',
    }
  }).then(response => {
    return response.json();
  }).then(data => {
    if (!data.result.totalHits) {
      renderMessage('Inga möjliga fel kunde upptäckas.');
      return;
    }

    var tableData = [['Källa', 'Fotograferat']];
    data.result.records.record.forEach(record => {
      record = parseFieldsRecord(record);
      var source = document.createElement('a');
      source.href = record['url'];
      source.append(document.createTextNode('Länk till källsystem'));
      var created = document.createElement('span');
      var createdTime;
      if (record['create_toTime'] && record['create_toTime'][0] !== record['create_fromTime'][0]) {
        createdTime = record['create_fromTime'][0] + ' - ' + record['create_toTime'][0];
      } else {
        createdTime = record['create_fromTime'][0];
      }

      created.append(document.createTextNode(createdTime));

      tableData.push([source, created]);
    });

    renderTable(tableData);
  }).catch(e => {
    console.log(e, 'booo');
  });
});


// **** INIT ****

populateOrgsSelect();
