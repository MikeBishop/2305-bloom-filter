const { addElement, isPresent } = require('./app');

test('added element is present', () => {
    var array = Array(16).fill(false);
    addElement("apple", array);
    addElement("banana", array);
    addElement("cereal", array);

    expect(isPresent("apple", array)).toBeTruthy();
});

test('absent element is not present', () => {
    var array = Array(16).fill(false);
    addElement("apple", array);
    addElement("banana", array);
    addElement("cereal", array);

    expect(isPresent("dog", array)).toBeFalsy();
});
