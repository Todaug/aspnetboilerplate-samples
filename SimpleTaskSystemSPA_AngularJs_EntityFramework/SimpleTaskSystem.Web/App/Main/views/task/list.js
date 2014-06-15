﻿(function () {
    var controllerId = 'sts.controllers.views.task.list';
    var app = angular.module('app');

    app.controller(controllerId, ['$scope', 'abp.services.tasksystem.task', function ($scope, taskService) {
        var vm = this;

        vm.tasks = [];

        vm.localize = abp.localization.getSource('SimpleTaskSystem');

        $scope.selectedTaskState = 0;

        $scope.$watch('selectedTaskState', function (value) {
            vm.refreshTasks();
        });

        vm.refreshTasks = function () {
            taskService.getTasks({
                state: $scope.selectedTaskState > 0 ? $scope.selectedTaskState : null
            }).success(function (data) {
                vm.tasks = data.tasks;
            });
        };

        vm.changeTaskState = function (task) {
            var newState;
            if (task.state == 1) {
                newState = 2;
            } else {
                newState = 1;
            }

            taskService.updateTask({
                taskId: task.id,
                state: newState
            }).success(function () {
                task.state = newState;
                abp.notify.info(vm.localize('TaskUpdatedMessage'));
            });
        };

        vm.getTaskCountText = function () {
            return abp.utils.formatString(vm.localize('Xtasks'), vm.tasks.length);
        };
    }]);
})();