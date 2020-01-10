'use strict';

var lib_type= 	[
		"Luigi Pirandello",
		"Ciascuno a suo modo",
		"...",
		"http://www.liberliber.it/mediateca/libri/p/pirandello/ciascuno_a_suo_modo/pdf/pirandello_ciascuno_a_suo_modo.pdf"
	];



if (!('indexedDB' in window)) {
  window.indexedDB = window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
}

var elibri = {};
elibri.hasToPopulate = false;

elibri.onerror = function(e) {
  console.log("Database error: ", e.target.errorCode);
}

elibri.createDatabase = function() {
  var req = indexedDB.open("elibri", 1);

  req.onsuccess = function(e) {
    elibri.db = e.target.result;
    if(elibri.hasToPopulate)
      elibri.populateDatabase();
    else
      elibri.readBooks();
  };

  req.onupgradeneeded = function(e) {
    elibri.db = e.target.result;

    if (elibri.db.objectStoreNames.contains("elibri")) {
      elibri.db.deleteObjectStore("elibri");
    }
    elibri.db.createObjectStore("elibri");

    elibri.hasToPopulate = true;
  };

  req.onerror = elibri.onerror;
}

elibri.populateDatabase = function() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', 'http://abral.altervista.org/apps/libri/elibri.json.php', true);
  xmlhttp.onreadystatechange=function() {
    if(xmlhttp.readyState==4) {
      var data = eval( '(' + xmlhttp.responseText + ')' );
      for(var i=0; i<data.length; i++)
        elibri.addBook(data[i]);
    }
  }
  xmlhttp.send(null)
}

elibri.addBook = function(book) {
  var elem = {
               book: book,
               pdf_file: null
             }

  // The key is the link of the book.
  var req = elibri.db.transaction("elibri", "readwrite").objectStore("elibri").put(elem, book[3]);

  req.onsuccess = function(e) {
    elibri.dataTable.fnAddData(book, true);
  };

  req.onerror = elibri.onerror;
};

elibri.readBooks = function() {
  var req = elibri.db.transaction("elibri").objectStore("elibri").getAll();

  req.onsuccess = function(e) {
    var result = e.target.result;
    var data = [];
    for (var i=0; i<result.length; i++) {
      data[i] = result[i].book;
    }
    elibri.dataTable.fnAddData(data, true);
  };

  req.onerror = elibri.onerror;
};

function drawTable() {
  $('#tableDiv').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="example"></table>' );
  elibri.dataTable = $('#example').dataTable( {
    "bProcessing": true,
    "sPaginationType": "full_numbers",
    "bJQueryUI": true,
    "aoColumns": [
      { "sTitle": "Author", "sWidth": "25%", "sClass": "center",
        "fnRender": function(obj) {
                      var sReturn = obj.aData[ obj.iDataColumn ];
                      return "<b>"+sReturn+"</b>";
                    }
      },
      { "sTitle": "Title", "sWidth": "25%", "sClass": "center" },
      { "sTitle": "Notes", "sWidth": "50%" },
      { "sTitle": "Link" }
    ]
  } );
  elibri.dataTable.fnSetColumnVis(3, false);

  $("#example tbody").live("click", function(event) {
    $(elibri.dataTable.fnSettings().aoData).each(function () {
      $(this.nTr).removeClass('row_selected');
    });
    $(event.target.parentNode).addClass('row_selected');

    var aData = elibri.dataTable.fnGetData( event.target.parentNode );

    $("#cont").html("<h1>Clicca due volte per leggere il libro selezionato.</h1>");
  });

  $("#example tbody td").live("dblclick", function(event) {
    var aData = elibri.dataTable.fnGetData( event.target.parentNode );
    newWin = window.open("viewer/viewer.html?file=" + encodeURIComponent("http://abral.altervista.org/apps/libri/pdf.php?file=" + aData[3]), "_blank");
    newWin.focus();
  });
}

function login() {
  alert("Not yet implemented!");
  /*$("#loginButton").css('opacity', '0.5');
  if(navigator.onLine)
    navigator.id.getVerifiedEmail(function(assertion) {
      if (assertion) {
        $.ajax({
          type: 'POST',
          url: '',
          data: { assertion: assertion, audience: 'abral.altervista.org' },
          success: function(res, status, xhr) {
            if (res === null) {
              $("#loginButton").css('opacity', '0.0');
            }
            else {
              $("#loginButton").css('opacity', '1.0');
              console.log(res);
            }
          },
          error: function(res, status, xhr) {
            alert("Login failure: " + res);
          }
        });
      } else {
        alert("Something went wrong.");
      }
    });*/
}

$(document).ready(function() {
  drawTable();
  elibri.createDatabase();

  if(!navigator.onLine)
    $("#loginButton").hide();
});
