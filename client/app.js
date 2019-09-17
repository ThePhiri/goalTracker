function getGoals(){
    $.get('http://localhost:3000/goals', function(data){
        viewModel.goals(data);
    })
}

function ViewModel(){
    var self = this;
    self.goals = ko.observableArray();
    self.goalInputName = ko.observable();
    self.goalInputType = ko.observable();
    self.goalInputDeadline = ko.observable();
    self.selectedGoals = ko.observableArray();
    self.canEdit = ko.computed(function(){
        return self.selectedGoals().length > 0;
    });

    self.addGoal = function(){
        var name = $('#name').val();
        var type = $('#type').val();
        var deadline = $('#deadline').val();

        self.goals.push({
            name: name,
            type: type,
            deadline: deadline
        });

        $.ajax(
            {
                url: "http://localhost:3000/goals",
                data: JSON.stringify({
                    "name": name,
                    "type": type,
                    "deadline": deadline
                }),
                type: "POST",
                contentType: "application/json",
                success: function(data){
                    console.log('Goal Added...');
                },
                error: function(xhr, status, err){
                    console.log(err);
                }
            });
    }
    self.deleteSelected = function(){
        $.each(self.selectedGoals(), function(index, value){
            var id = self.selectedGoals()[index]._id;
            $.ajax({
                url: "http://localhost:3000/goals/"+id,
                type: "DELETE",
                async: true,
                timeout: 300000,
                success: function(data){
                    console.log('Goals Removed...');
                },
                error: function(xhr, status, err){
                    console.log(err);
                }
            });
        });
        self.goals.removeAll(self.selectedGoals());
        self.selectedGoals.removeAll()
    }

    self.types = ko.observableArray(['Health & Fitness', 'Professional', 'Relationships', 'Monetary'])
}

var viewModel = new ViewModel();
ko.applyBindings(viewModel);