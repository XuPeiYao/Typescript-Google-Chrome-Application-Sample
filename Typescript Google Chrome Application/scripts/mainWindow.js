var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var application = angular.module('application', ['ngMaterial']);
application.factory('$appWindow', () => chrome.app.window.current());
application.filter('keyboardShortcut', function ($window) {
    return function (str) {
        if (!str)
            return;
        var keys = str.split('-');
        var isOSX = /Mac OS X/.test($window.navigator.userAgent);
        var seperator = (!isOSX || keys.length > 2) ? '+' : '';
        var abbreviations = {
            M: isOSX ? '⌘' : 'Ctrl',
            A: isOSX ? 'Option' : 'Alt',
            S: 'Shift'
        };
        return keys.map(function (key, index) {
            var last = index == keys.length - 1;
            return last ? key : abbreviations[key];
        }).join(seperator);
    };
});
application.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue')
        .accentPalette('blue');
});
application.controller('mainWindow', ($scope, $mdDialog, $appWindow) => __awaiter(this, void 0, void 0, function* () {
    $scope.isMaximize = false;
    $scope.close = $appWindow.close;
    $scope.maximize = $appWindow.maximize;
    $scope.minimize = $appWindow.minimize;
    $scope.restore = $appWindow.restore;
    $appWindow.onMaximized.addListener(() => {
        $scope.$apply(() => {
            $scope.isMaximize = true;
        });
    });
    $appWindow.onRestored.addListener(() => {
        $scope.$apply(() => {
            $scope.isMaximize = false;
        });
    });
    $scope.title = "Typescript Google Chrome Application";
}));
//# sourceMappingURL=mainWindow.js.map