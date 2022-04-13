    // let rowData = $('#myTable').DataTable().row(this.closest('tr')).data();
    
    // $('td.ragioneSociale').text('blbl?');
    // Add class to row
    // $('.selectedRow').find('.ragioneSociale').text('blbl!');
    
    // $(this).parent().parent().prev().find('.ragioneSociale').text($('.ragione-sociale').val());
    // console.log($(this).parent().parent().prev().find('.ragioneSociale').text($('input.ragioneSociale').val()));
    // console.log($(this).parent('.ragioneSociale').html());
    
    // $('.selectedRow').find('.ragioneSociale').text($('.ragione-sociale').val());
    // $('.selectedRow').find('.indirizzo').text($('.indirizzoInp').val());
    // let boh = $(this).closest('.ragione-sociale').val();
    // console.log(boh);

    
    // let rowData = $('#myTable').DataTable().row(this.closest('tr')).data();
    // let rowData = $(this).parent().closest('tr').find('td:eq(1)').text();
    // console.log(rowData);


    import "core-js/stable";
    import "regenerator-runtime/runtime";
    
    $(document).ready(function() {
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
                { data: "Email", className:'email' },
                {},
                {},
            ],
            columnDefs: [ 
                {
                    render: function() {
                        return '<button class="btn-edit">Modifica</button>';
                    },
                    targets: -2
                },
                {
                    render: function() {
                        return '<button class="btn-delete">Elimina</button>';
                    },
                    targets: -1
                }
            ]
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
        }
    
        $(this).closest('.btn-edit').hide();
        $(this).parent().parent().addClass('selectedRow');
        $(this).closest('tr').after(`
            <tr class="edit-form">
                <td></td>
                <td>
                    <input class="edit-inputs ragione-sociale" placeholder="Ragione sociale" value="${fillInput('td:eq(1)')}">
                </td>
                <td>
                    <input class="edit-inputs indirizzo-inp" placeholder="Indirizzo" value="${fillInput('td:eq(2)')}">
                </td>
                <td>
                    <input class="edit-inputs citta-inp" placeholder="Città" value="${fillInput('td:eq(3)')}">
                </td>
                <td>
                    <input class="edit-inputs prov-inp" placeholder="Provincia" value="${fillInput('td:eq(4)')}">
                </td>
                <td>
                    <input class="edit-inputs cap-inp" placeholder="CAP" value="${fillInput('td:eq(5)')}">
                </td>
                <td>
                    <input class="edit-inputs piva-inp" placeholder="P. IVA" value="${fillInput('td:eq(6)')}">
                </td>
                <td>
                    <input class="edit-inputs cf-inp" placeholder="Codice fiscale" value="${fillInput('td:eq(7)')}">
                </td>
                <td>
                    <input class="edit-inputs phone-inp" placeholder="Telefono" value="${fillInput('td:eq(8)')}">
                </td>
                <td>
                    <input class="edit-inputs fax-inp" placeholder="Fax" value="${fillInput('td:eq(9)')}">
                </td>
                <td>
                    <input class="edit-inputs email-inp" placeholder="Email" value="${fillInput('td:eq(10)')}">
                </td>
                <td>
                Aho?
                </td>
                <td>
                    <button class="btn-save">Salva</button>
                </td>
            </tr>
        `);
    });
    
    $('#myTable').on('click', '.btn-save', function() {
        $('.btn-edit').show();
    
        let selectedRow = $('.selectedRow');
        function newValues (tdClass, inputClass) {
            selectedRow.find(tdClass).text($(inputClass).val());
            selectedRow.removeClass('selectedRow');
        }
    
        newValues('.ragioneSociale', '.ragione-sociale');
        newValues('.indirizzo', '.indirizzo-inp');
        newValues('.city', '.citta-inp');
        newValues('.prov', '.prov-inp');
        newValues('.cap', '.cap-inp');
        newValues('.piva', '.piva-inp');
        newValues('.cod-fisc', '.cf-inp');
        newValues('.phone', '.phone-inp');
        newValues('.fax', '.fax-inp');
        newValues('.email', '.email-inp');
        
        $(this).closest('.edit-form').remove();
    });

    /** 
    <div class="bg"></div>
    <div class="edit-div">
        <form class="edit-form row">
            <div class="col-6">
                <p>
                    <label>Ragione sociale:</label>
                    <br>
                    <input class="edit-inputs ragione-sociale" placeholder="Ragione sociale" value="${fillInput('td:eq(1)')}">
                </p>
                <p>
                    <input class="edit-inputs indirizzo-inp" placeholder="Indirizzo" value="${fillInput('td:eq(2)')}">
                </p>
                <p>
                    <input class="edit-inputs citta-inp" placeholder="Città" value="${fillInput('td:eq(3)')}">
                </p>
                <p>
                    <input class="edit-inputs prov-inp" placeholder="Provincia" value="${fillInput('td:eq(4)')}">
                </p>
                <p>
                    <input class="edit-inputs cap-inp" placeholder="CAP" value="${fillInput('td:eq(5)')}">
                </p>
            </div>
            <div class="col-6">
                <p>
                    <input class="edit-inputs piva-inp" placeholder="P. IVA" value="${fillInput('td:eq(6)')}">
                </p>
                <p>
                    <input class="edit-inputs cf-inp" placeholder="Codice fiscale" value="${fillInput('td:eq(7)')}">
                </p>
                <p>
                    <input class="edit-inputs phone-inp" placeholder="Telefono" value="${fillInput('td:eq(8)')}">
                </p>
                <p>
                    <input class="edit-inputs fax-inp" placeholder="Fax" value="${fillInput('td:eq(9)')}">
                </p>
                <p>
                    <input class="edit-inputs email-inp" placeholder="Email" value="${fillInput('td:eq(10)')}">
                </p>
            </div>
            <div class="save-btn-div">
                <p>
                    <button class="btn-save">Salva</button>
                </p>
            </div>
        </form>
    </div>  
    */
    