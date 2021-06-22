describe('Test createCurPayment', function() {

    beforeEach(function() {
        billAmtInput.value = '';
        tipAmtInput.value = '';
    });

    it('should return undefined with negative bill amount', function() {
        billAmtInput.value = -3;
        tipAmtInput.value = 5;
        expect(createCurPayment()).toEqual(undefined);
    });

    it('should return undefined with negative tip amount', function() {
        billAmtInput.value = 40;
        tipAmtInput.value = -6;
        expect(createCurPayment()).toEqual(undefined);
    });

    it('should return undefined with all negative inputs', function() {
        billAmtInput.value = -3;
        tipAmtInput.value = -5;
        expect(createCurPayment()).toEqual(undefined);
    });

    it('should return undefined with empty bill input', function() {
        tipAmtInput.value = 5;
        expect(createCurPayment()).toEqual(undefined);
    });

    it('should return undefined with empty tip input', function() {
        billAmtInput.value = 5;
        expect(createCurPayment()).toEqual(undefined);
    });

    it('should return undefined with empty inputs', function() {
        expect(createCurPayment()).toEqual(undefined);
    });

    it('should accept tip value as 0', function() {
        tipAmtInput.value = 0;
        billAmtInput.value = 5;
        expect(createCurPayment()).not.toEqual(undefined);
    });

    it('should not accept bill value as 0', function() {
        billAmtInput.value = 0;
        tipAmtInput.value = 0;
        expect(createCurPayment()).toEqual(undefined);
    });

    it('should return an object with bill amount, tip amount, and tip percent', function() {
        billAmtInput.value = 20;
        tipAmtInput.value = 5;
        expect(createCurPayment()).toEqual({
            billAmt: '20',
            tipAmt: '5',
            tipPercent: 25,
        });
    });

    afterAll(function() {
        billAmtInput.value = '';
        tipAmtInput.value = '';
    });

});

describe('Test submitPaymentInfo', function() {

    beforeEach(function() {
        const firstPayment = document.getElementById('payment1');
        if (firstPayment) firstPayment.remove();

        allPayments = {};
        paymentId = 0;
        billAmtInput.value = 5;
        tipAmtInput.value = 4;
        submitPaymentInfo();
    });

    it('should add a curPayment object to allPayments', function() {
        expect(Object.keys(allPayments).length).toBe(1);
        expect(allPayments['payment1']).not.toEqual(undefined);
    });

    it('should update HTML', function() {
        expect(document.getElementsByClassName('payment1')).not.toBe(null);
    });

    it('should reset input values', function() {
        expect(billAmtInput.value).toBe('');
        expect(tipAmtInput.value).toBe('');
    });

    afterAll(function() {
        allPayments = {};
        paymentId = 0;
        billAmtInput.value = '';
        tipAmtInput.value = '';
        document.getElementById('payment1').remove();
    });

});

describe('Test appendPaymentTable', function() {

    beforeEach(function() {
        billAmtInput.value  = '50';
        tipAmtInput.value   = '10';
        appendPaymentTable(createCurPayment());
    });

    it('should create a table row element and pass to appendTd', function() {
        
        const data = paymentTbody.lastChild.childNodes;

        // expect 4 data columns in new row
        expect(data.length).toBe(4);
        
        // expect data correctly entered
        expect(data[0].innerText).toEqual('$50');
        expect(data[1].innerText).toEqual('$10');
        expect(data[2].innerText).toEqual('20%');

        // expect ids to be entered correctly
        expect(paymentTbody.lastChild.id).toEqual('payment' + paymentId);
    });

    afterEach(function() {
        paymentTbody.lastChild.remove();
        billAmtInput.value = '';
        tipAmtInput.value = '';
    });
});

describe('updateSummary test', function() {

    beforeAll(function() {
        allPayments = {};
        allPayments['payment1'] = {
            billAmt: '50',
            tipAmt: '10',
            tipPercent: 20,
        };
        allPayments['payment2'] = {
            billAmt: '20',
            tipAmt: '5',
            tipPercent: 20,
        };
        allPayments['payment3'] = {
            billAmt: '15',
            tipAmt: '3',
            tipPercent: 20,
        };

        updateSummary();
    });

    it('should update summaryTds table', function() {
        expect(summaryTds[0].innerHTML).toEqual('$85');
        expect(summaryTds[1].innerHTML).toEqual('$18');
        expect(summaryTds[2].innerHTML).toEqual('20%');
    });

    afterAll(function() {
        allPayments = {};
    });
});