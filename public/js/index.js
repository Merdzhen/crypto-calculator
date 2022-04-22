console.log('index js');

function searchTable() {
  let input; let filter; let found; let table; let tr; let td; let i; let
    j;
  input = document.querySelector('.js-search-input');
  filter = input.value.toUpperCase();
  table = document.querySelector('.js-main-table-body') || document.querySelector('.js-deals-table-body');
  tr = table.getElementsByTagName('tr');
  for (i = 0; i < tr.length; i += 1) {
    td = tr[i].getElementsByTagName('td');
    for (j = 0; j < td.length; j += 1) {
      if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
        found = true;
      }
    }
    if (found) {
      tr[i].style.display = '';
      found = false;
    } else {
      tr[i].style.display = 'none';
    }
  }
}

function sortTable(n) {
  let table; let rows; let switching; let i; let x; let y; let shouldSwitch; let dir; let
    switchcount = 0;
  table = document.getElementById('js-main-table') || document.getElementById('js-deals-table');
  switching = true;
  // Set the sorting direction to ascending:
  dir = 'asc';
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName('tr');
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i += 1) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName('td')[n];
      y = rows[i + 1].getElementsByTagName('td')[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}

function sortTableDollar(n) {
  let table; let rows; let switching; let i; let x; let y; let shouldSwitch; let dir; let
    switchcount = 0;
  table = document.getElementById('js-deals-table') || document.getElementById('js-main-table');
  switching = true;
  // Set the sorting direction to ascending:
  dir = 'asc';
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName('tr');
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i += 1) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName('td')[n];
      y = rows[i + 1].getElementsByTagName('td')[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */

      if (dir == 'asc') {
        // console.log(Number(x.innerHTML.slice(1).replace(',', '.').split('&nbsp;').join('')));
        if (Number(x.innerHTML.slice(1).replace(',', '.').split('&nbsp;').join('')) > Number(y.innerHTML.slice(1).replace(',', '.').split('&nbsp;').join(''))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (Number(x.innerHTML.slice(1).replace(',', '.').split('&nbsp;').join('')) < Number(y.innerHTML.slice(1).replace(',', '.').split('&nbsp;').join(''))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}

function sortTableCurrency(n) {
  let table; let rows; let switching; let i; let x; let y; let shouldSwitch; let dir; let
    switchcount = 0;
  table = document.getElementById('js-deals-table') || document.getElementById('js-main-table');
  switching = true;
  // Set the sorting direction to ascending:
  dir = 'asc';
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName('tr');
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i += 1) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName('td')[n];
      y = rows[i + 1].getElementsByTagName('td')[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */

      if (dir == 'asc') {
        // console.log(Number(x.innerHTML.slice(0, -3).replace(',', '.').split('&nbsp;').join('')));
        if (Number(x.innerHTML.slice(0, -3).replace(',', '.').split('&nbsp;').join('')) > Number(y.innerHTML.slice(0, -3).replace(',', '.').split('&nbsp;').join(''))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (Number(x.innerHTML.slice(0, -3).replace(',', '.').split('&nbsp;').join('')) < Number(y.innerHTML.slice(0, -3).replace(',', '.').split('&nbsp;').join(''))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}

function sortTableNum(n) {
  let table; let rows; let switching; let i; let x; let y; let shouldSwitch; let dir; let
    switchcount = 0;
  table = document.getElementById('js-deals-table') || document.getElementById('js-main-table');
  switching = true;
  // Set the sorting direction to ascending:
  dir = 'asc';
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName('tr');
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i += 1) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName('td')[n];
      y = rows[i + 1].getElementsByTagName('td')[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */

      if (dir == 'asc') {
        // console.log(Number(x.innerHTML.slice(0, -3).replace(',', '.').split('&nbsp;').join('')));
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}

function sortTablePercent(n) {
  let table; let rows; let switching; let i; let x; let y; let shouldSwitch; let dir; let
    switchcount = 0;
  table = document.getElementById('js-deals-table') || document.getElementById('js-main-table');
  switching = true;
  // Set the sorting direction to ascending:
  dir = 'asc';
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName('tr');
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i += 1) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName('td')[n];
      y = rows[i + 1].getElementsByTagName('td')[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */

      if (dir == 'asc') {
        // console.log(Number(x.innerHTML.slice(0, -3).replace(',', '.').split('&nbsp;').join('')));
        if (Number(x.innerHTML.slice(0, -1)) > Number(y.innerHTML.slice(0, -1))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (Number(x.innerHTML.slice(0, -1)) < Number(y.innerHTML.slice(0, -1))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}
