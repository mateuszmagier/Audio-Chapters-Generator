var defaultOptions = {
    zeroPrefix: true,
    includeHours: true
};

/*
    ===========================================
    CONSTRUCTOR TESTS
    ===========================================
*/

/*
    object is created with empty options object;
    test verifies if created object is not null
*/
QUnit.test("ConstructorTest_EmptyOptionsObject_NotNullObject", assert => {
    var object = new DurationHelper({});
    assert.notEqual(object, null, "Object created with empty options object is not null.");
});

/*
    object is created with empty options object;
    test verifies if object's options object doesn't equal empty object
*/
QUnit.test("ConstructorTest_EmptyOptionsObject_NotEmptyOptionsObject", assert => {
    var object = new DurationHelper({});
    assert.notEqual(object.options, {}, "Options (of object created with empty options object) is not empty object.");
});

/*
    object is created with empty options object;
    test verifies if object's options object equals default options object
*/
QUnit.test("ConstructorTest_EmptyOptionsObject_DefaultOptionsObject", assert => {
    var object = new DurationHelper({});
    assert.deepEqual(object.options, defaultOptions, "Options (of object created with empty options object) is are equal to default options.");
});

/*
    object is created with not empty options object;
    tests verify if object's particular options was set correct
*/
QUnit.test("ConstructorTest_NotEmptyOptionsObject_OptionsSetCorrect", assert => {
    var customOptions = {
        prefixZero: false,
        includeHours: false
    };
    var object = new DurationHelper(customOptions);
    assert.equal(object.options.prefixZero, false, "prefixZero option was set correct.");
    assert.equal(object.options.includeHours, false, "includeHours option was set correct.");
});

/*
    ===========================================
    PREFIXZERO TESTS
    ===========================================
*/

/*
    object is created with empty options object (prefixZero options is set to TRUE);
    tests verify if prefixZero method works correct for different arguments
*/
QUnit.test("PrefixZeroTest_PrefixZeroOptionIsTrue_ZeroIsAddedOnlyToNumbersLessThanTen", assert => {
    var object = new DurationHelper({}); // default options
    
    assert.equal(object.prefixZero(0), "00", "prefixZero added 0 for argument 0.");
    assert.equal(object.prefixZero(9), "09", "prefixZero added 0 for argument 9.");
    assert.equal(object.prefixZero(10), "10", "prefixZero didn't add 0 for argument 10.");
    assert.equal(object.prefixZero(99), "99", "prefixZero didn't add 0 for argument 10.");
});