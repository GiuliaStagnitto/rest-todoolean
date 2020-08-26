function addTaskListener(){
  var target = $('#invia');
  target.click(insertTask);
}
function insertTask(){
  var target = $('#add-task');
  var text = target.val();
  target.val('');

  $.ajax({
    url:'http://157.230.17.132:3030/todos',
    method: 'POST',
    data: {
      text : text
    },
    success: function(data){
      console.log(data);
      getTasks();
    },
    error: function(err){
      console.log('err', err);
    }
  });

}

function deleteListener(){

  $(document).on('click', '.delete', deleteTask)
}

function deleteTask(){
  var x = $(this);
  var id = x.data('id');

  $.ajax({
    url:`http://157.230.17.132:3030/todos/${id}`,
    method: 'DELETE',
    success: function(data){
      console.log(data);
      getTasks();
    },
    error: function(err){
      console.log('err', err);
    }
  });
}

function getTasks(){

  $.ajax({
    url:'http://157.230.17.132:3030/todos',
    method: 'GET',
    success: function(data){
      printTasks(data);
    },
    error: function(err){
      console.log('err', err);
    }
  })
}

function printTasks(tasks){

  var target = $('#tasks');
  target.text('');

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    target.append(`<li>${task.text} - <span data-id="${task.id}" class="delete"><b>x</b></span></li>`);
  }
}

function init(){
  getTasks();
  addTaskListener();
  deleteListener();
}

$(document).ready(init);
