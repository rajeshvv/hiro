"use strict";

var exports = {};

exports.testSuccessfulAsserts = function (test) {
	var asserts = new Asserts();

	asserts.assertTrue(true);
	asserts.assertFalse(false);
	asserts.assertEqual("Hiro", "Hiro");
	asserts.assertException(function () { throw new Error(); }, Error);
	asserts.assertUndefined(undefined);
	asserts.assertNull(null);
	asserts.assertOwnProperty({ "name": "Neal" }, "name");
	asserts.assertIndexOf([ "Hiro", "Y.T.", "Raven" ], "Y.T.");

	test.equal(asserts.executed[0].name, "assertTrue");
	test.strictEqual(asserts.executed[0].expected, asserts.executed[0].actual);

	test.equal(asserts.executed[1].name, "assertFalse");
	test.strictEqual(asserts.executed[1].expected, asserts.executed[1].actual);

	test.equal(asserts.executed[2].name, "assertEqual");
	test.strictEqual(asserts.executed[2].expected, asserts.executed[2].actual);

	test.equal(asserts.executed[3].name, "assertException");
	test.equal(asserts.executed[3].actual.toString(), (new Error()).toString());

	test.equal(asserts.executed[4].name, "assertUndefined");
	test.equal(asserts.executed[4].actual, asserts.executed[4].expected);

	test.equal(asserts.executed[5].name, "assertNull");
	test.equal(asserts.executed[5].actual, asserts.executed[5].expected);

	test.equal(asserts.executed[6].name, "assertOwnProperty");
	test.equal(asserts.executed[6].actual, true);

	test.equal(asserts.executed[7].name, "assertIndexOf");
	test.equal(asserts.executed[7].actual, 1);

	test.done();
};

exports.testFailedAsserts = function (test) {
	var report = null;
	var asserts = new Asserts(function (rep) {
		report = rep;
	});

	test.expect(3);

	asserts.assertEqual("Hiro", "Protagonist");
	test.equal(report.name, "assertEqual");
	test.equal(report.expected, "Hiro");
	test.equal(report.actual, "Protagonist");
	test.done();
};

window.asserts = exports;
