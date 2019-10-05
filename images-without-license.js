document.querySelector('#runBtn').addEventListener('click', e => {
  e.preventDefault();
  const url = endpoint + 'ksamsok/api?x-api=test&method=search&hitsPerPage=500&fields=url&query=thumbnailExists=j AND NOT mediaLicense=* AND serviceOrganization=' + select.value + '&recordSchema=xml';

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

    var tableData = [['Källa']];
    data.result.records.record.forEach(record => {
      record = parseFieldsRecord(record);
      var source = document.createElement('a');
      source.href = record['url'];
      source.append(document.createTextNode('Länk till källsystem'));

      tableData.push([source]);
    });

    renderTable(tableData);
  }).catch(e => {
    console.log(e, 'booo');
  });
});


// **** INIT ****

populateOrgsSelect();
