
var bodyParser = require('body-parser');

var urlencodeParser = bodyParser.urlencoded({ extended: true });

var mongoose = require('mongoose');

require('dotenv').config();
process.env.TODOS;

mongoose.connect(process.env.TODOS, { useNewUrlParser: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(error));

var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({ item: 'buy 23 flowers'}).save(function (err) {
//     if (err) throw err;
//     console.log('item saved');
// });
//
// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];

module.exports = function(app){

  app.get('/todo', function (req, res) {
        Todo.find({}, function (err, data) {
            if (err) throw err
            res.render('todo', { todos: data })
        })
    })

    app.post('/todo', urlencodeParser, function (req, res) {
        var itemOne = Todo(req.body).save(function (err, data) {
            if (err) throw err
            res.json(data)
        })
    })

    app.delete('/todo/:item', function (req, res) {
        // data = data.filter(function (todo) { // 返回为true的内容
        //    return todo.item.replace(/ /g, "-") !== req.params.item
        // })
        Todo.find({item: req.params.item.replace(/ /g, '-')}).deleteOne(function (err, data) {
            if (err) throw err
            res.json(data)
        })
    })
}
