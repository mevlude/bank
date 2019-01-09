var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "19-should display form for Adding Customer|Adding A Customer|Add Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\000d0015-0030-00e2-0025-00f300e90055.png",
        "timestamp": 1539574648273,
        "duration": 434
    },
    {
        "description": "20-should list all the labels|Adding A Customer|Add Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ff004a-0074-001c-008d-001f006e0013.png",
        "timestamp": 1539574649373,
        "duration": 214
    },
    {
        "description": "24- should require First Name|Adding A Customer|Add Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00f10083-00e5-0039-0022-009a000d008a.png",
        "timestamp": 1539574650017,
        "duration": 56
    },
    {
        "description": "25-should require Last Name|Adding A Customer|Add Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\008700c4-0012-00c1-0071-00b800d9006c.png",
        "timestamp": 1539574650606,
        "duration": 39
    },
    {
        "description": "26-should require Post Code|Adding A Customer|Add Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0041009d-00b6-00a7-0094-004b001a00e2.png",
        "timestamp": 1539574651045,
        "duration": 37
    },
    {
        "description": "27-should add Customer|Adding A Customer|Add Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00300035-0046-0083-002c-00cb00110012.png",
        "timestamp": 1539574651520,
        "duration": 2020
    },
    {
        "description": "should display new customer first name that was created|Adding A Customer|Add Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00d000e3-004a-001d-001e-00df00700085.png",
        "timestamp": 1539574654030,
        "duration": 221
    },
    {
        "description": "should display new customer last name that was created|Adding A Customer|Add Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\006f0054-0010-008f-000b-007900a20014.png",
        "timestamp": 1539574654708,
        "duration": 93
    },
    {
        "description": "should display new customer post code that was created|Adding A Customer|Add Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00440058-0007-0055-0031-0056002d0030.png",
        "timestamp": 1539574655298,
        "duration": 97
    },
    {
        "description": "should have no account number for the user that was created|Adding A Customer|Add Customer",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00cd00c8-00f5-00a0-008e-005900a0003c.png",
        "timestamp": 1539574655863,
        "duration": 77
    },
    {
        "description": "should have correct page title|Login|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00c200f7-0088-0089-0059-002300fa00a2.png",
        "timestamp": 1539574656359,
        "duration": 1145
    },
    {
        "description": "should display home button|Login|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00bc00d8-00a6-00f9-005d-0043009500eb.png",
        "timestamp": 1539574657890,
        "duration": 1102
    },
    {
        "description": "should display page header|Login|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005b005d-004c-001b-0002-004c00370032.png",
        "timestamp": 1539574659343,
        "duration": 861
    },
    {
        "description": "should display login option for Bank Manager|Login|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0060005d-00e9-0015-0054-006f00ad0083.png",
        "timestamp": 1539574660666,
        "duration": 1024
    },
    {
        "description": "should stay at the homepage when Home Button is clicked|Login|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\000f009b-008d-00ac-002a-006b004100df.png",
        "timestamp": 1539574662138,
        "duration": 1009
    },
    {
        "description": "should display options for manager|Login|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00530046-00a8-008d-00ad-00c400d800b2.png",
        "timestamp": 1539574663749,
        "duration": 1255
    },
    {
        "description": "should go back to home page from Bank Manager Login page|Login|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\007100bc-00c9-000f-00e1-002700df00af.png",
        "timestamp": 1539574665412,
        "duration": 1008
    },
    {
        "description": "should check if element is displayed|Demonstrating Jasmine spec reporter",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18088,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\009d0034-00cb-0012-00a5-008d00060073.png",
        "timestamp": 1539574666771,
        "duration": 3204
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
