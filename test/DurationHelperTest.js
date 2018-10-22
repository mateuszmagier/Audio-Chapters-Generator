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
});

///*
//    ===========================================
//    CALCULATEHOURS TESTS
//    ===========================================
//*/
//
//QUnit.test("CalculateHoursTest_DurationIsCorrect_HoursNumberIsCorrect", assert => {
//    var object = new DurationHelper({}); // default options
//
//    assert.equal(object.calculateHours(0), 0, "calculateHours returns 0 hours for duration 0s.");
//    assert.equal(object.calculateHours(50), 0, "calculateHours returns 0 hours for duration shorter than 1min.");
//    assert.equal(object.calculateHours(70), 0, "calculateHours returns 0 hours for duration longer than 1min.");
//    assert.equal(object.calculateHours(3599), 0, "calculateHours returns 0 hours for duration 3599s.");
//    assert.equal(object.calculateHours(3600), 1, "calculateHours returns 1 hours for duration 1hr.");
//    assert.equal(object.calculateHours(3605.36743), 1, "calculateHours returns correct hours number for float duration.");
//    assert.equal(object.calculateHours(11342.11243), 3, "calculateHours returns 3 hours for duration 3hrs 9mins 2s.");
//});
//
//
///*
//    ===========================================
//    CALCULATEMINUTES TESTS
//    ===========================================
//*/
//
//QUnit.test("CalculateMinutesTest_DurationIsCorrect_MinutesNumberIsCorrect", assert => {
//    var object = new DurationHelper({}); // default options
//
//    assert.equal(object.calculateMinutes(0), 0, "calculateMinutes returns 0 minutes for duration 0s.");
//    assert.equal(object.calculateMinutes(1), 0, "calculateMinutes returns 0 minutes for duration 1s.");
//    assert.equal(object.calculateMinutes(59), 0, "calculateMinutes returns 0 minutes for duration 59s.");
//    assert.equal(object.calculateMinutes(60), 1, "calculateMinutes returns 1 minutes for duration 60s.");
//    assert.equal(object.calculateMinutes(65.36298), 1, "calculateMinutes returns correct minutes number for float duration.");
//    assert.equal(object.calculateMinutes(469.23453), 7, "calculateHours returns 7 minutes for duration 7mins 49s.");
//});