$.fn.todolist = function ($todoList, $input) {
  this.on('click', function (e) {
    e.preventDefault();
    let todoItem = $input.val();
    addTodoItem(todoItem, $todoList);
  });

  $todoList.on('click', '.todo-item-delete', function (e) {
    let item = this;
    deleteTodoItem(e, item);
  });

  $(document).on('click', '.todo-item-done', completeTodoItem);
};

function getList() {
  if (!localStorage.getItem('list')) {
    return [];
  }
  return JSON.parse(localStorage.getItem('list'));
}

function setList(list) {
  localStorage.setItem('list', JSON.stringify(list));
}

function addTodoItem(todoItem, $todoList) {
  $todoList.append(
    `<li>
      <input type='checkbox'
      name='todo-item-done'
      class='todo-item-done'
      value='${todoItem}' /> 
      <span class="text">${todoItem}</span>
      <button class='todo-item-delete'>
        Delete
      </button>
    </li>`
  );
  setList([...getList(), todoItem]);
  $('#new-todo-item').val('');
}

function deleteTodoItem(e, item) {
  e.preventDefault();
  $(item)
    .parent()
    .fadeOut('slow', function () {
      $(item).parent().remove();
    });
}

function completeTodoItem() {
  $(this).next().toggleClass('strike');
}

$(function () {
  $('#add-todo-item').todolist($('#todo-list'), $('#new-todo-item'));
});

$('#search').on('click', function (e) {
  e.preventDefault();
  let searchtext = $('#searchbox').val();
  alert(getList().filter((t) => t.includes(searchtext)));
});
