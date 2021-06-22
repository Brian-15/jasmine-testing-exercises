
describe('calculateMonthlyPayment tests', function () {
  it('should calculate the monthly rate correctly', function () {
    // default input
    expect(calculateMonthlyPayment({
      amount: '50000',
      years:  '10',
      rate:   '1.2'
    })).toEqual('8137.27');
  });
  
  it("should return a result with 2 decimal places", function() {
    // check with all 1's
    expect(calculateMonthlyPayment({
      amount: '1',
      years:  '1',
      rate:   '1'
    })).toEqual('1.08');
  });
  
  it('should reject invalid input', function () {
    // check with whole words and sentences
    expect(() => calculateMonthlyPayment({
      amount: 'five',
      years:  'ten',
      rate:   'one point two'
    })).toThrowError();
  
    // check with one valid input
    expect(() => calculateMonthlyPayment({
      amount: '100000',
      years:  'ten',
      rate:   'one point two'
    })).toThrowError();
  });
  
  
})