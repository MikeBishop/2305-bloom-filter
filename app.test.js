const { BloomFilter } = require('./app');

test('added element is present', () => {
    var filter = new BloomFilter(3, 16);
    filter.addElement("apple");
    filter.addElement("banana");
    filter.addElement("cereal");

    expect(filter.isPresent("apple")).toBeTruthy();
});

test('absent element is not present', () => {
    var filter = new BloomFilter(3, 16);
    filter.addElement("apple");
    filter.addElement("banana");
    filter.addElement("cereal");

    expect(filter.isPresent("dog")).toBeFalsy();
});
