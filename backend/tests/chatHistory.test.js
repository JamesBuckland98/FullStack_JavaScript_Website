const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)

describe('test for chat functionality',() => { 

	it('gets the chat history endpoint', async (done) => {
		const response = await request.get('/chatHistory')
		expect(response.status).toBe(200)
		expect(typeof response.body).toBe("object")
		done();
	})

	it('posts a message to chat history endpoint', async (done) => {
		const response = await request.post('/chatHistory').send({
			Username : 'James',
			ChatMessage: 'Hello',
			Species: 'Frog',
			Abundance: 2,
			ChatTimeStamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
			Longitude : 0.0,
			Latitude : 0.0,
			Weather: 12.1,})
		expect(response.status).toBe(200)
		expect(typeof response.body).toBe('object')
		done();
	})
})

