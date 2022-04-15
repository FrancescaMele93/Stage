import "core-js/stable";
import "regenerator-runtime/runtime";

let submitClass;
let submitValue;
let thisPos = $(this);

// Fills the edit form's inputs with the values from the table
function fillInput(position) {
    return thisPos.closest('tr').find(position).html();
};

// Changes the form's button's value and class, for saving or editing
function fillSubmitClass() {
    if (fillInput('td:eq(0)')) {
        submitClass = 'btn-save';
        submitValue = 'Salva';
    } else {
        submitClass = 'btn-add';
        submitValue = 'Aggiungi';
    }
};

$(document).on('ready', function() {
    // Initialise id counter
    let newId = 1;

    // Initialise DataTable
    $('#myTable').DataTable( {
        ajax: {
            url: 'http://localhost:3000/anagrafica',
            dataSrc: ''
        },
        columns: [ 
            { data: "id"},
            { data: "RagioneSociale", className:'ragioneSociale' },
            { data: "Indirizzo", className:'indirizzo' },
            { data: "Citta", className:'city' },
            { data: "Prov", className:'prov' },
            { data: "CAP", className:'cap' },
            { data: "PIVA", className:'piva' },
            { data: "CF", className:'cod-fisc' },
            { data: "Telefono", className:'phone' },
            { data: "Fax", className:'fax' },
            { data: "Email", className:'email' }
        ],
        columnDefs: [ 
            {
                render: function() {
                    return '<button class="btn-edit btn btn-outline-secondary">Modifica</button>';
                },
                targets: 11
            },
            {
                render: function() {
                    return '<button class="btn-delete btn btn-outline-secondary">Elimina</button>';
                },
                targets: 12
            }
        ]
    });

    // Create New Contact button
    $('#myTable_length').append('<button class="btn-new btn btn-outline-secondary">Nuovo contatto</button>');

    // Manage New Contact button
    $('.btn-new').on('click', function() {
        $('#navbar').hide();
        $('footer').hide();
        $('#myTable_wrapper').addClass('my-table-wrapper');

        // Reinitialise "this" and call function for submit input
        thisPos = $(this);
        fillSubmitClass();

        // Open form for new entry
        let inputValue;
        // Add: value="${inputValue}"
        let newContactForm = `
            <div class="edit-div">
                <form class="edit-form row">
                    <div class="col-6">
                        <p>
                            <label>Ragione sociale:</label>
                            <br>
                            <input class="edit-inputs ragione-sociale-inp" autofocus>
                        </p>
                        <p>
                            <label>Indirizzo:</label>
                            <br>
                            <input class="edit-inputs indirizzo-inp">
                        </p>
                        <p>
                            <label>Città:</label>
                            <br>
                            <input class="edit-inputs citta-inp">
                        </p>
                        <p>     
                            <label>Provincia:</label>
                            <br>
                            <input class="edit-inputs prov-inp">
                        </p>
                        <p>
                            <label>CAP:</label>
                            <br>
                            <input class="edit-inputs cap-inp">
                        </p>
                    </div>
                    <div class="col-6">
                        <p>
                            <label>Partita iva:</label>
                            <br>
                            <input class="edit-inputs piva-inp">
                        </p>
                        <p>
                            <label>Codice fiscale:</label>
                            <br>
                            <input class="edit-inputs cf-inp">
                        </p>
                        <p>
                            <label>Telefono:</label>
                            <br>
                            <input class="edit-inputs phone-inp">
                        </p>
                        <p>
                            <label>Fax:</label>
                            <br>
                            <input class="edit-inputs fax-inp">
                        </p>
                        <p>
                            <label>Email:</label>
                            <br>
                            <input class="edit-inputs email-inp">
                        </p>
                    </div>
                    <div class="save-btn-div">
                        <input type="submit" class="${submitClass} btn btn-outline-secondary" value="${submitValue}">
                        <button class="btn-cancel btn btn-outline-secondary">Annulla</button>
                    </div>
                </form>
            </div>
        `;
        $('.btn-new').after(newContactForm);

        // Attempt to make single form for new/edit
        function fillNewForm() {
            if (!inputValue) {
                console.log('!good');
                inputValue = 8;
                console.log(inputValue)
                $('.btn-new').after(newContactForm);
            } else {
                console.log('else')
                inputValue = fillInput('td:eq(1)');
                $('.btn-new').after(newContactForm);
            }
        }
        // fillNewForm();

        // Manage Add button
        $('.btn-add').on('click', function(e) {
            e.preventDefault();
            
            // Create new entry, append it to last tr, and give its tr an odd/even class
            let firstRow = $('tbody').find('tr:eq(0)');
            let newEntry = `
                <tr>
                    <td class="sorting_1">${newId}</td>
                    <td class="edit-inputs ragioneSociale">${$('.ragione-sociale-inp').val()}</td>
                    <td class="indirizzo">${$('.indirizzo-inp').val()}</td>
                    <td class="edit-inputs city">${$('.citta-inp').val()}</td>
                    <td class="edit-inputs prov">${$('.prov-inp').val()}</td>
                    <td class="edit-inputs cap">${$('.cap-inp').val()}</td>
                    <td class="edit-inputs piva">${$('.piva-inp').val()}</td>
                    <td class="edit-inputs cf">${$('.cf-inp').val()}</td>
                    <td class="edit-inputs phone">${$('.phone-inp').val()}</td>
                    <td class="edit-inputs fax">${$('.fax-inp').val()}</td>
                    <td class="email">${$('.email-inp').val()}</td>
                    <td>
                        <button class="btn-edit btn btn-outline-secondary">Modifica</button>
                    </td>
                    <td>
                        <button class="btn-delete btn btn-outline-secondary">Elimina</button>
                    </td>
                </tr>
            `

            if (firstRow.hasClass("odd")) {
                firstRow.before(newEntry);
                $('tbody').find('tr:eq(0)').addClass('even');
            } else {
                firstRow.before(newEntry);
                $('tbody').find('tr:eq(0)').addClass('odd');
            }

            // Increase ID number by 1 at each new entry
            newId = parseInt($('.sorting_1').html(), 10) + 1;
            
            // Remove form and wrapper's bg class
            $(this).closest('.edit-div').remove();
            $('#myTable_wrapper').removeClass('my-table-wrapper');
            $('#navbar').show();
            $('footer').show();
        })
    });
});

$('#myTable').on('click', '.btn-delete', function() {
    $('#myTable_wrapper').addClass('my-table-wrapper');
    $('#navbar').hide();
    $('footer').hide();
    // Alert for confirmation
    // let thisPos = $(this);
    // function confirmCancel() {
    //     if (confirm("Vuoi eliminare l'elemento?")) {
    //         thisPos.closest('tr').remove();
    //     } else {
    //         return;
    //     }
    // }
    // // confirmCancel();

    thisPos = $(this);

    // Confirmation message
    $('#myTable').after(`
        <div class="confirm-container">
            <div class="edit-form confirm">
                <p>Cancellare l'elemento?</p>
                <div class="confirm-btns">
                    <button class="btn btn-secondary btn-del-confirm">Sì</button>
                    <button class="btn btn-secondary btn-no-del">No</button>
                </div>
            </div>
        </div>
    `);

    $('.btn-del-confirm').on('click', function() {
        $('.confirm-container').remove();
        thisPos.closest('tr').remove();
    });

    $('.btn-no-del').on('click', function() {
        $('.confirm-container').remove();
        $('#myTable_wrapper').removeClass('my-table-wrapper');
        $('#navbar').show();
        $('footer').show();
    });
});


$('#myTable').on('click', '.btn-edit', function() {
    $('#myTable_wrapper').addClass('my-table-wrapper');
    $('#navbar').hide();
    $('footer').hide();
    $(this).parent().parent().addClass('selectedRow');
    
    // Reinitialise "this" and call function for submit input
    thisPos = $(this);
    fillSubmitClass();

    // Initialise and create form
    let form = `
        <div class="edit-div">
            <form class="edit-form row">
                <div class="col-6">
                    <p>
                        <label>Ragione sociale:</label>
                        <br>
                        <input class="edit-inputs ragione-sociale-inp" value="${fillInput('td:eq(1)')}" autofocus>
                    </p>
                    <p>
                        <label>Indirizzo:</label>
                        <br>
                        <input class="edit-inputs indirizzo-inp" value="${fillInput('td:eq(2)')}">
                    </p>
                    <p>
                        <label>Città:</label>
                        <br>
                        <input class="edit-inputs citta-inp" value="${fillInput('td:eq(3)')}">
                    </p>
                    <p>     
                        <label>Provincia:</label>
                        <br>
                        <input class="edit-inputs prov-inp" value="${fillInput('td:eq(4)')}">
                    </p>
                    <p>
                        <label>CAP:</label>
                        <br>
                        <input class="edit-inputs cap-inp" value="${fillInput('td:eq(5)')}">
                    </p>
                </div>
                <div class="col-6">
                    <p>
                        <label>Partita iva:</label>
                        <br>
                        <input class="edit-inputs piva-inp" value="${fillInput('td:eq(6)')}">
                    </p>
                    <p>
                        <label>Codice fiscale:</label>
                        <br>
                        <input class="edit-inputs cf-inp" value="${fillInput('td:eq(7)')}">
                    </p>
                    <p>
                        <label>Telefono:</label>
                        <br>
                        <input class="edit-inputs phone-inp" value="${fillInput('td:eq(8)')}">
                    </p>
                    <p>
                        <label>Fax:</label>
                        <br>
                        <input class="edit-inputs fax-inp" value="${fillInput('td:eq(9)')}">
                    </p>
                    <p>
                        <label>Email:</label>
                        <br>
                        <input class="edit-inputs email-inp" value="${fillInput('td:eq(10)')}">
                    </p>
                </div>
                <div class="save-btn-div">
                    <input type="submit" class="${submitClass} btn btn-outline-secondary" value="${submitValue}">
                    <button class="btn-cancel btn btn-outline-secondary">Annulla</button>
                </div>
            </form>
        </div>
    `;
    // $('.ragione-sociale-inp').trigger();
    $(this).closest('tr').after(form);

    // Add ID line
    $('.edit-form').prepend(`
        <div class="col-12 ahoo">
            <p>
                <strong><label>ID: ${fillInput('td:eq(0)')}</label></strong>
            </p>
        </div>
    `)
});

$('body').on('click', '.btn-cancel', function() {
    // Alert for confirmation
    let thisPos = $(this);
    function confirmCancel() {
        if (confirm("Vuoi tornare indietro?")) {
          thisPos.closest('.edit-div').remove();
          $('#myTable_wrapper').removeClass('my-table-wrapper');
          $('#navbar').show();
          $('footer').show();
        } else {
          return;
        }
    }
    // confirmCancel();

    // Confirmation message
    $('#myTable').after(`
        <div class="confirm-container">
            <div class="edit-form confirm">
                <p>Annullare l'inserimento?</p>
                <div class="confirm-btns">
                    <button class="btn btn-secondary btn-back-confirm">Sì</button>
                    <button class="btn btn-secondary btn-no-back">No</button>
                </div>
            </div>
        </div>
    `);

    $('.btn-back-confirm').on('click', function() {
        thisPos.closest('.edit-div').remove();
        $('#myTable_wrapper').removeClass('my-table-wrapper');
        $('#navbar').show();
        $('footer').show();
        $('.confirm-container').remove();
    });

    $('.btn-no-back').on('click', function() {
        $('.confirm-container').remove();
    });
});

$('#myTable').on('click', '.btn-save', function() {
    let selectedRow = $('.selectedRow');

    function newValues(tdClass, inputClass) {
        selectedRow.find(tdClass).text($(inputClass).val());
    }

    newValues('.ragioneSociale', '.ragione-sociale-inp');
    newValues('.indirizzo', '.indirizzo-inp');
    newValues('.city', '.citta-inp');
    newValues('.prov', '.prov-inp');
    newValues('.cap', '.cap-inp');
    newValues('.piva', '.piva-inp');
    newValues('.cod-fisc', '.cf-inp');
    newValues('.phone', '.phone-inp');
    newValues('.fax', '.fax-inp');
    newValues('.email', '.email-inp');
    
    $(this).closest('.edit-div').remove();
    selectedRow.removeClass('selectedRow');
    $('#myTable_wrapper').removeClass('my-table-wrapper');
    $('#navbar').show();
    $('footer').show();
});