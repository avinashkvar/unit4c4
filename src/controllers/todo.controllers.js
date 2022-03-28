const express = require('express');

const router = express.Router();

const Todo = require('../models/todo.model');

const authenticate = require('../middleware/authenticate');

router.get('', async (req, res) => {
	try {
		const todo = await Todo.find().lean().exec();

		return res.status(200).send(todo);
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

router.post('', async (req, res) => {
	try {
		const todo = await Todo.create(req.body);

		return res.status(200).send(todo);
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

router.get('/:id', authenticate, async (req, res) => {
	try {
		req.body.userId = req.user._id;
		const todo = await Todo.find({ userId: req.params.id }).lean().exec();

		return res.status(200).send(todo);
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

router.patch('/:id', authenticate, async (req, res) => {
	try {
		req.body.userId = req.user._id;

		let todo = await Todo.findByIdAndUpdate({ userId: req.params.id }).lean().exec();

		return res.status(200).send(todo);
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

router.delete('/:id', authenticate, async (req, res) => {
	try {
		req.body.userId = req.user._id;

		let todo = await Todo.findByIdAndDelete({ userId: req.params.id }).lean().exec();

		return res.status(200).send(todo);
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

module.exports = router;
