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

    self.types = ko.observableArray(['Health & Fitness', 'Professional', 'Relationships', 'Monetary'])
}

var viewModel = new ViewModel();
ko.applyBindings(viewModel);