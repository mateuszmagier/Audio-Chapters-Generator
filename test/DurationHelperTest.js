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
        zeroPrefix: false,
        includeHours: false
    };
    var object = new DurationHelper(customOptions);
    assert.equal(object.options.zeroPrefix, false, "zeroPrefix option was set correct.");
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
    assert.throws(
        function () {
            object.prefixZero(-1);
        },
        function (err) {
            return err.message === "Number must be not less than 0.";
        },
        "prefixZero throws error when number is less than 0.");
    assert.throws(
        function () {
            object.prefixZero(100);
        },
        function (err) {
            return err.message === "Number must be less than 100.";
        },
        "prefixZero throws error when number is greater than or equal to 100.");
});

/*
    object is created with custom options object (prefixZero options is set to FALSE);
    tests verify if prefixZero method works correct for different arguments
*/
QUnit.test("PrefixZeroTest_PrefixZeroOptionIsFalse_ZeroIsntAdded", assert => {
    var object = new DurationHelper({zeroPrefix: false}); // custom options - prefixZero mode is disabled

    assert.equal(object.prefixZero(0), "0", "prefixZero didn't add 0 for argument 0.");
    assert.equal(object.prefixZero(9), "9", "prefixZero didn't add 0 for argument 9.");
    assert.equal(object.prefixZero(10), "10", "prefixZero didn't add 0 for argument 10.");
    assert.equal(object.prefixZero(99), "99", "prefixZero didn't add 0 for argument 10.");
});

/*
    ===========================================
    CALCULATETIMESTAMP TESTS
    ===========================================
*/

QUnit.test("CalculateTimestampTest_DurationIsCorrect_TimestampElementsAreCorrect", assert => {
    var object = new DurationHelper({}); // default options

    assert.deepEqual(object.calculateTimestamp(0), [0,0,0], "calculateTimestamp returns 0hrs 0mins 0secs for duration 0s.");
    assert.deepEqual(object.calculateTimestamp(1), [0,0,1], "calculateTimestamp returns 0hrs 0mins 1secs for duration 1s.");
    assert.deepEqual(object.calculateTimestamp(60), [0,1,0], "calculateTimestamp returns 0hrs 1mins 0secs for duration 60s.");
    assert.deepEqual(object.calculateTimestamp(3600), [1,0,0], "calculateTimestamp returns 1hrs 0mins 0secs for duration 3600s.");
    assert.deepEqual(object.calculateTimestamp(3629), [1,0,29], "calculateTimestamp returns 1hrs 0mins 29secs for duration 3629s.");
    assert.deepEqual(object.calculateTimestamp(3600.7854), [1,0,0], "calculateTimestamp returns correct values for float duration.");
    assert.deepEqual(object.calculateTimestamp(8397.1234), [2,19,57], "calculateTimestamp returns 2hrs 19mins 57secs for duration 8397.1234s.");
});

/*
    ===========================================
    GETTIMESTAMP TESTS
    ===========================================
*/

QUnit.test("GetTimestampTest_DurationIsCorrect_TimestampElementsAreCorrect", assert => {
    var object = new DurationHelper({}); // default options

    assert.equal(object.getTimestamp(0), "00:00:00", "getTimestamp returns 00:00:00 for duration 0s.");
    assert.equal(object.getTimestamp(1), "00:00:01", "getTimestamp returns 00:00:01 for duration 1s.");
    assert.equal(object.getTimestamp(60), "00:01:00", "getTimestamp returns 00:01:00 for duration 60s.");
    assert.equal(object.getTimestamp(3600), "01:00:00", "getTimestamp returns 01:00:00 for duration 3600s.");
    assert.equal(object.getTimestamp(3629), "01:00:29", "getTimestamp returns 01:00:29 for duration 3629s.");
    assert.equal(object.getTimestamp(3600.7854), "01:00:00", "getTimestamp returns correct values for float duration.");
    assert.equal(object.getTimestamp(8397.1234), "02:19:57", "getTimestamp returns 02:19:57 for duration 8397.1234s.");
});

