const todoRouter = require('express').Router();
const { Todo } = require('../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken')

todoRouter.get('/', async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

// todoRouter.post('/', async (req, res) => {
//   const { todo } = req.body;
//   const newTodo = await Todo.create({ todo });
//   res.json(newTodo);
// });

todoRouter.post('/', verifyAccessToken, async (req, res) => {
  const { todo } = req.body;
  try {
    const newTodo = await Todo.create({ todo });
    res.json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

todoRouter.put('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;

  try {
    if (req.body.updatedTodo) {
      // Если в теле запроса есть поле updatedTodo, то обновляем текст todo
      await Todo.update({ todo: req.body.updatedTodo }, { where: { id } });
    } else {
      // Иначе изменяем статус todo
      const todo = await Todo.findByPk(id);
      todo.isDone = !todo.isDone;
      await todo.save();
    }

    // Возвращаем обновленный todo в любом случае
    const updatedTodo = await Todo.findByPk(id);
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

todoRouter.delete('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByPk(id);
  await todo.destroy();
  res.sendStatus(204);
});

module.exports = todoRouter;
