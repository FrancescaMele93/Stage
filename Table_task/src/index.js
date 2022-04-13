import "core-js/stable";
import "regenerator-runtime/runtime";

$(document).on('ready', function() {
    let newId = 1;

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
                    return '<button class="btn-edit">Modifica</button>';
                },
                targets: 11
            },
            {
                render: function() {
                    return '<button class="btn-delete">Elimina</button>';
                },
                targets: 12
            }
        ]
    });

    $('#myTable_length').append('<button class="btn-new">Nuovo contatto</button>');

    $('.btn-new').on('click', function() {
        $('#myTable_wrapper').addClass('my-table-wrapper');

        // Open form for new entry
        let newContactForm = `
            <div class="edit-div">
                <form class="edit-form row">
                    <div class="col-6">
                        <p>
                            <label>Ragione sociale:</label>
                            <br>
                            <input class="edit-inputs ragione-sociale-inp">
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
                            <label>Codice ficale:</label>
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
                    <div class="save-btn-div new-form-btns">
                        <button class="btn-cancel">Annulla</button>
                        <input type="submit" class="btn-add" value="Aggiungi">
                    </div>
                </form>
            </div>
        `;

        $('.btn-new').after(newContactForm);

        $('.btn-add').on('click', function(e) {
            e.preventDefault();
            
            let newEntry = `
                <tr>
                    <td class="sorting_1">${newId}</td>
                    <td class="edit-inputs ragioneSociale">${$('.ragione-sociale-inp').val()}
                    </td>
                    <td class="indirizzo">${$('.indirizzo-inp').val()}
                    </td>
                    <td class="edit-inputs city">${$('.citta-inp').val()}
                    </td>
                    <td class="edit-inputs prov">${$('.prov-inp').val()}
                    </td>
                    <td class="edit-inputs cap">${$('.cap-inp').val()}
                    </td>
                    <td class="edit-inputs piva">${$('.piva-inp').val()}
                    </td>
                    <td class="edit-inputs cf">${$('.cf-inp').val()}
                    </td>
                    <td class="edit-inputs phone">${$('.phone-inp').val()}
                    </td>
                    <td class="edit-inputs fax">${$('.fax-inp').val()}
                    </td>
                    <td class="email">${$('.email-inp').val()}
                    </td>
                    <td>
                        <button class="btn-edit">Modifica</button>
                    </td>
                    <td>
                        <button class="btn-delete">Elimina</button>
                    </td>
                </tr>
            `

            // Create new entry and give tr an odd/even class
            let firstRow = $('tbody').find('tr:eq(0)');

            if (firstRow.hasClass("odd")) {
                firstRow.before(newEntry);
                $('tbody').find('tr:eq(0)').addClass('even');
            } else {
                firstRow.before(newEntry);
                $('tbody').find('tr:eq(0)').addClass('odd');
            }

            // Increase ID number by 1 at each new entry
            newId = parseInt($('.sorting_1').html(), 10) + 1;
            
            $(this).closest('.edit-div').remove();
            $('#myTable_wrapper').removeClass('my-table-wrapper');
        })
    });
});

$('#myTable').on('click', '.btn-delete', function() {
    let currentRow = $(this).closest('tr');

    currentRow.next('.edit-form').remove();
    currentRow.remove();
});


$('#myTable').on('click', '.btn-edit', function() {
    let thisPos = $(this);
    let fillInput = function(position) {
        return thisPos.closest('tr').find(position).html();
    };

    $('#myTable_wrapper').addClass('my-table-wrapper');
    // $(this).closest('.btn-edit').hide();
    $(this).parent().parent().addClass('selectedRow');
    $(this).closest('tr').after(`
        <div class="edit-div">
            <form class="edit-form row">
                <div class="col-6">
                    <p>
                        <label>Ragione sociale:</label>
                        <br>
                        <input class="edit-inputs ragione-sociale-inp" value="${fillInput('td:eq(1)')}">
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
                        <label>Codice ficale:</label>
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
                <div class="save-btn-div new-form-btns">
                    <button class="btn-cancel">Annulla</button>
                    <input type="submit" class="btn-save" value="Salva">
                </div>
            </form>
        </div>
    `);
});

$('body').on('click', '.btn-cancel', function(e) {
    e.preventDefault();

    $(this).closest('.edit-div').remove();
    $('#myTable_wrapper').removeClass('my-table-wrapper');    
});

$('#myTable').on('click', '.btn-save', function() {
    let selectedRow = $('.selectedRow');

    function newValues(tdClass, inputClass) {
        selectedRow.find(tdClass).text($(inputClass).val());
        selectedRow.removeClass('selectedRow');
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
    $('#myTable_wrapper').removeClass('my-table-wrapper');
});