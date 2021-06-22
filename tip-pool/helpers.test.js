describe('sumPaymentTotal helper function tests', function() {

    beforeEach(function() {
        allPayments = {
            payment1: {
                tipAmt: '5',
                billAmt:'20',
                tipPercent:25,
            },
            payment2: {
                tipAmt: '5',
                billAmt:'20',
                tipPercent:25,
            },
        }
    });

    it('should sum total of from allPayments', function() {
        expect(sumPaymentTotal('billAmt')).toBe(40);
        expect(sumPaymentTotal('tipAmt')).toBe(10);
        expect(sumPaymentTotal('tipPercent')).toBe(50);
    });

    afterEach(function() {
        allPayments = {};
    });

});

describe('appendTd helper function test', function() {

    it('should append newly created td element ', function() {
        const tempRow = document.createElement('tr');
        const value = 'lorem ipsum';
        appendTd(tempRow, value);
        expect(tempRow.lastChild.innerText).toEqual(value);
        tempRow.remove();
    });

});

describe('calculateTipPercent helper function tests', function() {
    
    it('should return percent tips', function() {
        expect(calculateTipPercent(20, 10)).toBe(50);
    });

    it('should return 0 percent if no tips were given', function() {
        expect(calculateTipPercent(20, 0)).toBe(0);
    });
});

describe('appendDeleteBtn helper function test', function() {

    it('should add a td element', function() {
        const tempRow = document.createElement('tr');
        appendDeleteBtn(tempRow);
        expect(tempRow.firstChild.classList).toContain('delete');
        expect(tempRow.firstChild.innerText).toEqual('X');
    });
});