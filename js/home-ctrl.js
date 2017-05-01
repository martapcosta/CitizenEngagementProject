/**
 * Homepage controller
 */
 angular.module('app').controller('HomePageController', function(DataService) {

    var homePageCtrl = this;

    DataService.getIssues().then(function(issues) {
        homePageCtrl.issues = issues;
    });

});


angular.module('app').factory('DataService', function($q) {

    var service = {};

    service.getIssues = function() {
        return $q.when([
        {
            title: 'Head 1',
            text: 'Problem 1 blabla',
            time: moment().hour(12).minute(40).toDate(),
            ncomments: 2
        },
        {
            title: 'Head 2',
            text: 'Problem 2 blablaHey\nWhat\'s up?',
            time: moment().hour(12).minute(50).toDate(),
            ncomments: 23
        },
        {
            title: 'Headsss 3',
            text: 'Problem 3 Same old, same old.\nWanna come\'n play some SFV?!',
            time: moment().year(2017).day(25).month(4).hour(14).minute(50).toDate(),
            ncomments: 44
        },
        {
            title: 'Headsss 4',
            text: 'Problem 4 Same old, same old.\nWanna come\'n play some SFV?!',
            time: moment().year(2017).day(25).month(4).hour(14).minute(50).toDate(),
            ncomments: 44
        },
        {
            title: 'Headsss 5',
            text: 'Problem 5 Same old, same old.\nWanna come\'n play some SFV?!',
            time: moment().year(2017).day(25).month(4).hour(14).minute(50).toDate(),
            ncomments: 44
        },
        {
            title: 'Headsss 6',
            text: 'Problem 6 Same old, same old.\nWanna come\'n play some SFV?!',
            time: moment().year(2017).day(25).month(4).hour(14).minute(50).toDate(),
            ncomments: 44
        },
        {
            title: 'Headsss 7',
            text: 'Problem 7 Same old, same old.\nWanna come\'n play some SFV?!',
            time: moment().year(2017).day(25).month(4).hour(14).minute(50).toDate(),
            ncomments: 44
        },
        {
            title: 'Headsss 8',
            text: 'Problem 8 Same old, same old.\nWanna come\'n play some SFV?!',
            time: moment().year(2017).day(25).month(4).hour(14).minute(50).toDate(),
            ncomments: 44
        },
        {
            title: 'Headsss 9',
            text: 'Problem 9 Same old, same old.\nWanna come\'n play some SFV?!',
            time: moment().year(2017).day(25).month(4).hour(14).minute(50).toDate(),
            ncomments: 44
        },
        {
            title: 'Headsss 10',
            text: 'Problem 10 Same old, same old.\nWanna come\'n play some SFV?!',
            time: moment().year(2017).day(25).month(4).hour(14).minute(50).toDate(),
            ncomments: 44
        },
        {
            title: 'Headsss 11',
            text: 'Problem 11 Same old, same old.\nWanna come\'n play some SFV?!',
            time: moment().year(2017).day(25).month(4).hour(14).minute(50).toDate(),
            ncomments: 44
        },
        {
            title: 'Headsss 12',
            text: 'Problem 12 Same old, same old.\nWanna come\'n play some SFV?!',
            time: moment().year(2017).day(25).month(4).hour(14).minute(50).toDate(),
            ncomments: 44
        },
        {
            title: 'Headsss 13',
            text: 'Problem 13 Same old, same old.\nWanna come\'n play some SFV?!',
            time: moment().year(2017).day(25).month(4).hour(14).minute(50).toDate(),
            ncomments: 44
        },
        {
            title: 'Headsss 14',
            text: 'Problem 14 Same old, same old.\nWanna come\'n play some SFV?!',
            time: moment().year(2017).day(25).month(4).hour(14).minute(50).toDate(),
            ncomments: 44
        },
        {
            title: 'Headsss 15',
            text: 'Problem 15 Same old, same old.\nWanna come\'n play some SFV?!',
            time: moment().year(2017).day(25).month(4).hour(14).minute(50).toDate(),
            ncomments: 44
        }
        ]);
    };

    return service;
});
