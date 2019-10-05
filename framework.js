const endpoint = 'http://www.kulturarvsdata.se/';
const select = document.querySelector('#orgSelect');

function populateOrgsSelect() {
  const url = endpoint + 'ksamsok/api?method=getServiceOrganization&value=all&x-api=test';

  fetch(url, {
    headers: {
      'Accept': 'application/json',
    }
  }).then(response => {
    return response.json();
  }).then(data => {
    const orgs = data.result.institution.map(inst => {
      return { name: inst.namnswe, code: inst.kortnamn };
    }).sort((a, b) => a.name.localeCompare(b.name));

    orgs.forEach(org => {
      const opt = document.createElement('option');
      opt.setAttribute('value', org.code);
      opt.appendChild(document.createTextNode(org.name));

      select.appendChild(opt);
    });
  }).catch(() => {
    console.log('Booo');
  });
}

function parseFieldsRecord(record) {
  var recordToReturn = {};
  record.field.forEach(field => {
    if (field.name in field) {
      recordToReturn[field.name].push(field.content);
      return;
    }
    recordToReturn[field.name] = [field.content];
  });
  return recordToReturn;
}

function renderTable(rows) {
  const table = document.createElement('table');
  table.classList.add(['raa-table']);
  table.id = 'resultTable';
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');

  rows[0].forEach((header) => {
    const th = document.createElement('th');
    const thNode = document.createTextNode(header);
    th.appendChild(thNode);
    tr.appendChild(th);
  });
  rows.shift();
  thead.appendChild(tr);
  table.appendChild(thead);

  tbody = document.createElement('tbody');
  rows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(variable => {
      const td = document.createElement('td');
      td.appendChild(variable);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  document.querySelector('#table-container').innerHTML = '';
  document.querySelector('#table-container').appendChild(table);
}

function renderMessage(message) {
  document.querySelector('#table-container').innerHTML = '';
  var p = document.createElement('p');
  p.appendChild(document.createTextNode(message));
  document.querySelector('#table-container').appendChild(p);
}
